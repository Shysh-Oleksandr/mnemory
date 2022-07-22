import axios from "axios";
import { Dispatch } from "react";
import config from "../../config/config";
import { ISet } from "../../interfaces/set";
import { ActionType } from "../Action-types";
import { Action } from "../Actions";

export function getAllSets(userId: string) {
  return async function getAllNotesThunk(dispatch: Dispatch<Action>) {
    try {
      dispatch({
        type: ActionType.SET_LOADING,
        payload: { loading: true, isLocal: false },
      });

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
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        dispatch({
          type: ActionType.SET_LOADING,
          payload: { loading: false, isLocal: false },
        });
      }, 200);
    }
  };
}
