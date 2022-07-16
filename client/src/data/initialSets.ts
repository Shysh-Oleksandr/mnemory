import { ISetStatus } from "../interfaces/set";

export const initialSets: ISetStatus[] = [
  {
    savedSet: {
      name: "All terms",
      terms: [],
      setId: 0,
      createdDate: null,
      lastVisitedDate: null,
      _id: "0",
    },
    editingSet: {
      name: "All terms",
      terms: [],
      setId: 0,
      createdDate: null,
      lastVisitedDate: null,
      _id: "0",
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
      _id: "2",
    },

    editingSet: {
      name: "Learned",
      terms: [],
      setId: 2,
      createdDate: null,
      lastVisitedDate: null,
      _id: "2",
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
      _id: "3",
    },

    editingSet: {
      name: "Starred",
      terms: [],
      setId: 3,
      createdDate: null,
      lastVisitedDate: null,
      _id: "3",
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
      _id: "4",
    },

    editingSet: {
      name: "Difficult",
      terms: [],
      setId: 4,
      createdDate: null,
      lastVisitedDate: null,
      _id: "4",
    },
    isCategorySet: true,
  },
];
