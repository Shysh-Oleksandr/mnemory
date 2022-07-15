import { ITerm } from "./term";
import IUser from "./user";

export interface ISet {
  name: string;
  author?: string | IUser;
  description?: string;
  terms: ITerm[];
  setId: number;
  createdDate: number | null;
  lastVisitedDate: number | null;
  isCategorySet?: boolean;
}

export interface ISetStatus {
  savedSet: ISet;
  editingSet: ISet;
  isCategorySet: boolean;
}
