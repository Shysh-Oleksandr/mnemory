import { Dispatch } from "redux";
import { ActionType } from "../Action-types";
import { Action } from "../Actions";
import { ITerm } from "../../components/termCard/Term";

export const addTerm = (term: ITerm, indexToAdd: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADDING,
      payload: { term: term, indexToAdd: indexToAdd },
    });
  };
};

export const deleteTerm = (term: ITerm) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DELETING,
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
