import { Dispatch } from "redux";
import { ISetStatus } from "../../interfaces/set";
import { ITerm } from "../../interfaces/term";
import { ActionType } from "../Action-types";
import { Action } from "../Actions";
import { IUserState } from "../Reducers/UserReducer";

export const addTerm = (term: ITerm, indexToAdd: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADDING_TERM,
      payload: { term: term, indexToAdd: indexToAdd },
    });
  };
};

export const deleteTerm = (term: ITerm) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DELETING_TERM,
      payload: term,
    });
  };
};

export const reorderTerms = (terms: ITerm[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REORDER_TERMS,
      payload: terms,
    });
  };
};

export const addTermKeyword = (termId: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADDING_KEYWORD,
      payload: termId,
    });
  };
};

export const deleteTermKeyword = (termId: number, keywordId: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DELETING_KEYWORD,
      payload: { termId: termId, keywordId: keywordId },
    });
  };
};

export const deleteTermKeywordImage = (termId: number, keywordId: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DELETING_KEYWORD_IMAGE,
      payload: { termId: termId, keywordId: keywordId },
    });
  };
};

export const toggleTermKeywordImage = (termId: number, keywordId?: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.TOGGLE_KEYWORD_IMAGE,
      payload: { termId: termId, keywordId: keywordId },
    });
  };
};

export const setTermKeywordImage = (
  termId: number,
  keywordId: number,
  url: string
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_KEYWORD_IMAGE,
      payload: { termId: termId, keywordId: keywordId, url: url },
    });
  };
};

export const setSearchedImages = (searchedImages: string[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_SEARCHED_IMAGES,
      payload: searchedImages,
    });
  };
};

export const setAreImagesLoading = (areImagesLoading: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_ARE_IMAGES_LOADING,
      payload: areImagesLoading,
    });
  };
};

export const setLoading = (loading: boolean, isLocal: boolean = false) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_LOADING,
      payload: { loading: loading, isLocal: isLocal },
    });
  };
};

export const setShowConfirmModal = (
  showConfrimModal: boolean,
  onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined = undefined,
  to: string
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_SHOW_CONFIRM_MODAL,
      payload: { toShow: showConfrimModal, onClick: onClick, to: to },
    });
  };
};

export const setCurrentSetId = (setId: number, visited: boolean = true) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_CURRENT_SET_ID,
      payload: { id: setId, visited: visited },
    });
  };
};

export const addSet = (set: ISetStatus) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADDING_SET,
      payload: set,
    });
  };
};

export const deleteSet = (setId: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DELETING_SET,
      payload: setId,
    });
  };
};

export const setTermInfo = (
  name: string,
  description: string,
  termId: number
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_TERM_INFO,
      payload: { termName: name, definition: description, termId: termId },
    });
  };
};

export const setSetInfo = (name: string, description: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_SET_INFO,
      payload: { setName: name, description: description },
    });
  };
};

export const saveCurrentSet = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SAVE_CURRENT_SET,
    });
  };
};

export const copySavedSet = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.COPY_SAVED_SET,
    });
  };
};

export const setSortedSets = (sortedSets: ISetStatus[], sortMethod: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_SORTED_SETS,
      payload: { sortedSets: sortedSets, sortMethod: sortMethod },
    });
  };
};

export const setShowDefinition = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_SHOW_DEFINITION,
    });
  };
};

export const setIsStartSideFront = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_IS_START_SIDE_FRONT,
    });
  };
};

export const toggleTermCategory = (
  termId: number,
  categorySet: ISetStatus,
  changeSaved: boolean = false
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.TOGGLE_TERM_CATEGORY,
      payload: {
        termId: termId,
        categorySet: categorySet,
        changeSaved: changeSaved,
      },
    });
  };
};

export const login = (userState: IUserState) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGIN,
      payload: userState,
    });
  };
};

export const logout = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGOUT,
    });
  };
};

export const setError = (error: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_ERROR,
      payload: error,
    });
  };
};

export const setSuccess = (success: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_SUCCESS,
      payload: success,
    });
  };
};

export const setKeywordInfo = (
  name: string,
  description: string,
  termId: number,
  keywordId: number
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_KEYWORD_INFO,
      payload: {
        keywordName: name,
        description: description,
        termId: termId,
        keywordId: keywordId,
      },
    });
  };
};
