import { ISetStatus } from "../interfaces/set";

export const initialSetsId = [0, 1, 2, 3, 4];
export const DEFAULT_SET_ID = 111110;

export const initialSets: ISetStatus[] = [
  {
    savedSet: {
      name: "All terms",
      terms: [],
      setId: initialSetsId[0],
      createdDate: null,
      lastVisitedDate: null,
      _id: initialSetsId[0].toString(),
    },
    editingSet: {
      name: "All terms",
      terms: [],
      setId: initialSetsId[0],
      createdDate: null,
      lastVisitedDate: null,
      _id: initialSetsId[0].toString(),
    },
    isCategorySet: false,
  },
  // {
  //   savedSet: {
  //     name: "Learned",
  //     terms: [],
  //     setId: initialSetsId[2],
  //     createdDate: null,
  //     lastVisitedDate: null,
  //     _id: initialSetsId[2].toString(),
  //   },

  //   editingSet: {
  //     name: "Learned",
  //     terms: [],
  //     setId: initialSetsId[2],
  //     createdDate: null,
  //     lastVisitedDate: null,
  //     _id: initialSetsId[2].toString(),
  //   },
  //   isCategorySet: true,
  // },
  // {
  //   savedSet: {
  //     name: "Starred",
  //     terms: [],
  //     setId: initialSetsId[3],
  //     createdDate: null,
  //     lastVisitedDate: null,
  //     _id: initialSetsId[3].toString(),
  //   },

  //   editingSet: {
  //     name: "Starred",
  //     terms: [],
  //     setId: initialSetsId[3],
  //     createdDate: null,
  //     lastVisitedDate: null,
  //     _id: initialSetsId[3].toString(),
  //   },
  //   isCategorySet: true,
  // },
  // {
  //   savedSet: {
  //     name: "Difficult",
  //     terms: [],
  //     setId: initialSetsId[4],
  //     createdDate: null,
  //     lastVisitedDate: null,
  //     _id: initialSetsId[4].toString(),
  //   },

  //   editingSet: {
  //     name: "Difficult",
  //     terms: [],
  //     setId: initialSetsId[4],
  //     createdDate: null,
  //     lastVisitedDate: null,
  //     _id: initialSetsId[4].toString(),
  //   },
  //   isCategorySet: true,
  // },
];
