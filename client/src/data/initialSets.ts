import { ISetStatus } from "../interfaces/set";

export const initialSets: ISetStatus[] = [
  {
    savedSet: {
      name: "All terms",
      terms: [],
      setId: 1,
      createdDate: null,
      lastVisitedDate: null,
    },
    editingSet: {
      name: "All terms",
      terms: [],
      setId: 1,
      createdDate: null,
      lastVisitedDate: null,
    },
    isCategorySet: false,
  },
  {
    savedSet: {
      name: "Learned",
      terms: [],
      setId: 2,
      createdDate: null,
      lastVisitedDate: null,
    },

    editingSet: {
      name: "Learned",
      terms: [],
      setId: 2,
      createdDate: null,
      lastVisitedDate: null,
    },
    isCategorySet: true,
  },
  {
    savedSet: {
      name: "Starred",
      terms: [],
      setId: 3,
      createdDate: null,
      lastVisitedDate: null,
    },

    editingSet: {
      name: "Starred",
      terms: [],
      setId: 3,
      createdDate: null,
      lastVisitedDate: null,
    },
    isCategorySet: true,
  },
  {
    savedSet: {
      name: "Difficult",
      terms: [],
      setId: 4,
      createdDate: null,
      lastVisitedDate: null,
    },

    editingSet: {
      name: "Difficult",
      terms: [],
      setId: 4,
      createdDate: null,
      lastVisitedDate: null,
    },
    isCategorySet: true,
  },
];
