import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import config from "../../config/config";
import { actionCreactors, State } from "../../state";
import { setError, setLoading, setSuccess } from "../../state/Action-creators";
import { getCurrentSet, validateTerms } from "./../../Helpers/functions";

type Props = {
  buttonText: string;
  isCreatePage: boolean;
};

const SaveBtn = ({ buttonText, isCreatePage }: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const { user } = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  const { saveCurrentSet } = bindActionCreators(actionCreactors, dispatch);
  const currentSet = getCurrentSet(mnemoryState).editingSet;

  const saveSet = async (method: string, url: string, isCreating: boolean) => {
    if (currentSet.name.trim() === "") {
      dispatch(setError("Please enter set's name."));
      dispatch(setSuccess(""));
      return null;
    }
    dispatch(setLoading(true, true));
    saveCurrentSet();

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
  const editSet = async (showMessage: boolean = true) =>
    await saveSet(
      "PATCH",
      `${config.server.url}/sets/update/${currentSet._id}`,
      false
    );

  return (
    <button
      type="submit"
      form={`set-form-${mnemoryState.currentSetId + 1}`}
      onClick={() => (isCreatePage ? createSet() : editSet())}
      className="btn ml-auto block mt-2 md:!px-24 !px-20 md:!py-4 !py-3"
    >
      {buttonText}
    </button>
  );
};

export default SaveBtn;
