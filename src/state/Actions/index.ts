import { ActionType } from "../Action-types";
import { ITerm } from "../../components/termCard/Term";

interface AddingAction {
  type: ActionType.ADDING_TERM;
  payload: { term: ITerm; indexToAdd: number };
}

interface DeletingAction {
  type: ActionType.DELETING_TERM;
  payload: ITerm;
}

interface AddingKeywordAction {
  type: ActionType.ADDING_KEYWORD;
  payload: number;
}

interface DeletingKeywordAction {
  type: ActionType.DELETING_KEYWORD;
  payload: { termId: number; keywordId: number };
}

interface DeletingKeywordImageAction {
  type: ActionType.DELETING_KEYWORD_IMAGE;
  payload: { termId: number; keywordId: number };
}

interface ToggleKeywordImageAction {
  type: ActionType.TOGGLE_KEYWORD_IMAGE;
  payload: { termId: number; keywordId?: number };
}

interface SetKeywordImageAction {
  type: ActionType.SET_KEYWORD_IMAGE;
  payload: { termId: number; keywordId: number; url: string };
}

interface SetSearchedImagesAction {
  type: ActionType.SET_SEARCHED_IMAGES;
  payload: string[];
}

interface SetCurrentSetIdAction {
  type: ActionType.SET_CURRENT_SET_ID;
  payload: number;
}

export type Action =
  | AddingAction
  | DeletingAction
  | AddingKeywordAction
  | DeletingKeywordImageAction
  | ToggleKeywordImageAction
  | SetKeywordImageAction
  | SetSearchedImagesAction
  | SetCurrentSetIdAction
  | DeletingKeywordAction;
