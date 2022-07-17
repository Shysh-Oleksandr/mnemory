import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import config from "../../config/config";
import { actionCreactors, State } from "../../state";
import { setError, setLoading, setSuccess } from "../../state/Action-creators";
import { getAllSets } from "../../state/Async-actions";
import { getCurrentSet, validateTerms } from "./../../Helpers/functions";

type Props = {
  buttonText: string;
  isCreatePage: boolean;
  btnClassname?: string;
};

const SaveBtn = ({ buttonText, isCreatePage, btnClassname }: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const { user } = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  const { saveCurrentSet } = bindActionCreators(actionCreactors, dispatch);
  const currentSet = getCurrentSet(mnemoryState).editingSet;
  const currentSavedSet = getCurrentSet(mnemoryState).savedSet;

  const saveSet = async (method: string, url: string, isCreating: boolean) => {
    if (currentSet.name.trim() === "") {
      dispatch(setError("Please enter set's name."));
      dispatch(setSuccess(""));
      return null;
    }
    dispatch(setLoading(true, true));

    try {
      const response = await axios({
        method: method,
        url: url,
        data: {
          name: currentSet.name,
          description: currentSet.description,
          createdDate: currentSet.createdDate,
          lastVisitedDate: currentSet.lastVisitedDate,
          isCategorySet: currentSet.isCategorySet,
          terms: validateTerms(currentSet.terms),
          setId: currentSet.setId,
          author: user._id,
        },
      });

      if (response.status === 201) {
        saveCurrentSet();

        dispatch(getAllSets(user._id));
        dispatch(setSuccess(`Set ${isCreating ? "added" : "updated"}.`));
      } else {
        dispatch(setError("Unable to save set."));
      }
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      setTimeout(() => {
        dispatch(setLoading(false, true));
      }, 500);
    }
  };

  const createSet = async () =>
    await saveSet("POST", `${config.server.url}/sets/create`, true);
  const editSet = async () =>
    await saveSet(
      "PATCH",
      `${config.server.url}/sets/update/${currentSavedSet._id}`,
      false
    );

  return (
    <button
      type="submit"
      form={`set-form-${mnemoryState.currentSetId + 1}`}
      onClick={() => (isCreatePage ? createSet() : editSet())}
      className={`btn ml-auto block ${btnClassname}`}
    >
      {buttonText}
    </button>
  );
};

export default SaveBtn;
