import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DEFAULT_SET_ID } from "../data/initialSets";
import { getCurrentSet } from "../Helpers/functions";
import { State } from "../state";
import { setCurrentSetId } from "../state/Action-creators";
import { getAllSets } from "../state/Async-actions";

export function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export function useOnClickOutside(ref: any, handler: any) {
  useEffect(
    () => {
      const listener = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because the passed-in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export function useCurrentSetState() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: State) => state.user);
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const [currentSet, setCurrentSet] = useState(getCurrentSet(mnemoryState));

  const params = useParams();
  const setID = params.setID;
  const isSetMissing =
    currentSet.savedSet.setId !== Number(setID) &&
    setID &&
    Number(setID) !== DEFAULT_SET_ID + 1;

  useEffect(() => {
    if (isSetMissing) {
      dispatch(getAllSets(user._id));
    }
  }, []);

  useEffect(() => {
    if (isSetMissing) {
      const missedSet = mnemoryState.sets.find(
        (set) => set.savedSet.setId + 1 === Number(setID)
      );

      if (missedSet) {
        setCurrentSet(missedSet);
        dispatch(setCurrentSetId(missedSet.savedSet.setId, false));
      }
    } else {
      setCurrentSet(getCurrentSet(mnemoryState));
    }
  }, [mnemoryState.sets]);

  return currentSet;
}
