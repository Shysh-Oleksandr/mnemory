import React, { RefObject, useEffect, useRef } from "react";
import Input from "../UI/Input";
import { ITerm } from "./Term";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../../state";
import { clearInput } from "../../Helpers/functions";
import { getCurrentSet } from "./../../Helpers/functions";

type Props = { term: ITerm };

const TermInfo = ({ term }: Props) => {
  const dispatch = useDispatch();
  const mnemoryState = useSelector((state: State) => state.mnemory);

  const nameRef = useRef() as RefObject<HTMLInputElement>;
  const descriptionRef = useRef() as RefObject<HTMLInputElement>;

  const { setTermInfo } = bindActionCreators(actionCreactors, dispatch);

  useEffect(() => {
    clearInput(nameRef, descriptionRef);
  }, [mnemoryState.currentSetId]);

  useEffect(() => {
    // Don't focus initial inputs.
    if (getCurrentSet(mnemoryState).savedSet.terms.includes(term)) {
      return;
    }
    setTimeout(() => {
      nameRef.current?.focus();
    }, 0.1);
  }, []);

  return (
    <div className="term-info basis-1/4 shrink">
      <Input
        defaultValue={term.term}
        onChange={() =>
          setTermInfo(
            nameRef.current?.value!,
            descriptionRef.current?.value!,
            term.id
          )
        }
        placeholder="Coche"
        inputClassName="term-title"
        inputId={`term-${term.id}-title`}
        labelText="Term"
        reference={nameRef}
      />
      <Input
        defaultValue={term.definition || ""}
        onChange={() =>
          setTermInfo(
            nameRef.current?.value!,
            descriptionRef.current?.value!,
            term.id
          )
        }
        placeholder="Car"
        inputClassName="term-definition"
        inputId={`term-${term.id}-definition`}
        labelText="Definition"
        reference={descriptionRef}
      />
    </div>
  );
};

export default TermInfo;
