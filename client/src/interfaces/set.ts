import { ITerm } from "./term";

export interface ISet {
  name: string;
  description?: string;
  terms: ITerm[];
  setId: number;
  createdDate: Date | null;
  lastVisitedDate: Date | null;
}

export interface ISetStatus {
  savedSet: ISet;
  editingSet: ISet;
  isCategorySet: boolean;
}
