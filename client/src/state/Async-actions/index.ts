import axios from "axios";
import { Dispatch } from "react";
import config from "../../config/config";
import { ISet } from "../../interfaces/set";
import { ActionType } from "../Action-types";
import { Action } from "../Actions";

export function getAllSets(userId: string) {
  return async function getAllNotesThunk(dispatch: Dispatch<Action>) {
    const response = await axios({
      method: "GET",
      url: `${config.server.url}/sets/${userId}`,
    });

    if (response.status === 200 || response.status === 304) {
      let sets = response.data.sets as ISet[];
      dispatch({ type: ActionType.GET_ALL_SETS, payload: sets });
    } else {
      dispatch({ type: ActionType.GET_ALL_SETS, payload: [] });
    }
  };
}
