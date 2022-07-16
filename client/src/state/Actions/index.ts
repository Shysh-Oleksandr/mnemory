import { ISet, ISetStatus } from "../../interfaces/set";
import { ITerm } from "../../interfaces/term";
import { ActionType } from "../Action-types";
import { IUserState } from "../Reducers/UserReducer";

interface AddingAction {
  type: ActionType.ADDING_TERM;
  payload: { term: ITerm; indexToAdd: number };
}

interface DeletingAction {
  type: ActionType.DELETING_TERM;
  payload: ITerm;
}

interface ReorderTermsAction {
  type: ActionType.REORDER_TERMS;
  payload: ITerm[];
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

interface SaveSetAction {
  type: ActionType.SAVE_CURRENT_SET;
}

interface CopySavedSetAction {
  type: ActionType.COPY_SAVED_SET;
}

interface SetAreImagesLoadingAction {
  type: ActionType.SET_ARE_IMAGES_LOADING;
  payload: boolean;
}

interface SetLoadingAction {
  type: ActionType.SET_LOADING;
  payload: boolean;
}

interface SetShowConfirmModalAction {
  type: ActionType.SET_SHOW_CONFIRM_MODAL;
  payload: {
    toShow: boolean;
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
    to: string;
  };
}

interface SetIsStartSideFront {
  type: ActionType.SET_IS_START_SIDE_FRONT;
}

interface SetShowDefinition {
  type: ActionType.SET_SHOW_DEFINITION;
}

interface SetSortedSets {
  type: ActionType.SET_SORTED_SETS;
  payload: { sortedSets: ISetStatus[]; sortMethod: string };
}

interface ToggleTermCategory {
  type: ActionType.TOGGLE_TERM_CATEGORY;
  payload: { termId: number; categorySet: ISetStatus; changeSaved: boolean };
}

interface Login {
  type: ActionType.LOGIN;
  payload: IUserState;
}

interface Logout {
  type: ActionType.LOGOUT;
}

interface SetError {
  type: ActionType.SET_ERROR;
  payload: string;
}

interface SetSuccess {
  type: ActionType.SET_SUCCESS;
  payload: string;
}

interface GetAllSetsAction {
  type: ActionType.GET_ALL_SETS;
  payload: ISet[];
}

export type Action =
  | AddingAction
  | DeletingAction
  | ReorderTermsAction
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
  | SaveSetAction
  | CopySavedSetAction
  | SetAreImagesLoadingAction
  | SetShowConfirmModalAction
  | SetShowDefinition
  | SetIsStartSideFront
  | SetSortedSets
  | ToggleTermCategory
  | Login
  | Logout
  | SetError
  | SetSuccess
  | SetLoadingAction
  | GetAllSetsAction
  | DeletingKeywordAction;
