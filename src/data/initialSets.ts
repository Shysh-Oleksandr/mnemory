import { getRandomNumber } from "../Helpers/functions";
const randomIds = new Array(10).fill(0).map((el) => getRandomNumber());

export const initialSets = [
  {
    savedSet: {
      name: "All terms",
      terms: [],
      setId: 0,
      createdDate: null,
      lastVisitedDate: null,
    },
    editingSet: {
      name: "All terms",
      terms: [],
      setId: 0,
      createdDate: null,
      lastVisitedDate: null,
    },
    isCategorySet: false,
  },
  {
    savedSet: {
      name: "Learned",
      terms: [],
      setId: randomIds[1],
      createdDate: null,
      lastVisitedDate: null,
    },

    editingSet: {
      name: "Learned",
      terms: [],
      setId: randomIds[1],
      createdDate: null,
      lastVisitedDate: null,
    },
    isCategorySet: true,
  },
  {
    savedSet: {
      name: "Starred",
      terms: [],
      setId: randomIds[2],
      createdDate: null,
      lastVisitedDate: null,
    },

    editingSet: {
      name: "Starred",
      terms: [],
      setId: randomIds[2],
      createdDate: null,
      lastVisitedDate: null,
    },
    isCategorySet: true,
  },
  {
    savedSet: {
      name: "Difficult",
      terms: [],
      setId: randomIds[3],
      createdDate: null,
      lastVisitedDate: null,
    },

    editingSet: {
      name: "Difficult",
      terms: [],
      setId: randomIds[3],
      createdDate: null,
      lastVisitedDate: null,
    },
    isCategorySet: true,
  },
];
