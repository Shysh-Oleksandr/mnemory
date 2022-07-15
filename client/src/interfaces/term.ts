import { ISetStatus } from "./set";

export type Keyword = {
  keyword: string;
  descriptionText?: string;
  image?: string;
  imageChecked: boolean;
  id: number;
};

export interface ITerm {
  id: number;
  term: string;
  definition: string;
  descriptionKeywords: Keyword[];
  placeholderId?: number;
  // categories?: ISetStatus[];
  // parentSet?: ISetStatus;
}
