import { ActionType } from "../Action-types";
import { ITerm } from "../../components/termCard/Term";
import { ISetStatus } from "../Reducers/MnemoryReducer";

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

interface AddSetAction {
  type: ActionType.ADDING_SET;
  payload: ISetStatus;
}

interface DeleteSetAction {
  type: ActionType.DELETING_SET;
  payload: number;
}

interface SetTermInfoAction {
  type: ActionType.SET_TERM_INFO;
  payload: { termName: string; definition: string; termId: number };
}

interface SetSetInfoAction {
  type: ActionType.SET_SET_INFO;
  payload: { setName: string; description: string };
}

interface SetKeywordInfoAction {
  type: ActionType.SET_KEYWORD_INFO;
  payload: {
    keywordName: string;
    description: string;
    termId: number;
    keywordId: number;
  };
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
  | AddSetAction
  | SetTermInfoAction
  | SetSetInfoAction
  | SetKeywordInfoAction
  | DeleteSetAction
  | DeletingKeywordAction;
