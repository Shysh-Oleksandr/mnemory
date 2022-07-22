import IUser from './user';

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

export interface ITerm {
    id: number;
    term: string;
    definition: string;
    descriptionKeywords: Keyword[];
    placeholderId?: number;
    // categories?: ISetStatus[];
    // parentSet?: ISetStatus;
}

export type Keyword = {
    keyword: string;
    descriptionText?: string;
    image?: string;
    imageChecked: boolean;
    id: number;
};
