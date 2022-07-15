import { ISetStatus } from "./set";

export type Keyword = {
  keyword: string;
  descriptionText?: string;
  image?: string;
  imageChecked: boolean;
  id: number;
};

export interface ITerm {
  term: string;
  definition: string;
  descriptionKeywords: Keyword[];
  placeholderId: number;
  id: number;
  categories?: ISetStatus[];
  parentSet?: ISetStatus;
}
