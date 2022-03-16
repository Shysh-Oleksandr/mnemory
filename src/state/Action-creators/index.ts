import { Dispatch } from "redux";
import { ActionType } from "../Action-types";
import { Action } from "../Actions";
import { ITerm } from "../../components/termCard/Term";
import { ISetStatus } from "../Reducers/MnemoryReducer";

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

export const setCurrentSetId = (setId: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_CURRENT_SET_ID,
      payload: setId,
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
      type: ActionType.COPY_SAVED_SET,
    });
  };
};

export const copySavedSet = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SAVE_CURRENT_SET,
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
