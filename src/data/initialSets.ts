import { termsPlaceholder } from "./termsPlaceholders";
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
      name: "First set",
      description: "that is description",
      terms: [
        {
          term: "Lata",
          definition: "a can",
          placeholderId: Math.floor(Math.random() * termsPlaceholder.length),
          descriptionKeywords: [
            { keyword: "Latvia", id: 0, imageChecked: false },
            {
              keyword: "pianist",
              id: 1,
              imageChecked: false,
              descriptionText:
                "Movie scene when man eats from earth womans food can",
            },
            {
              keyword: "Chaos",
              id: 2,
              imageChecked: false,
            },
            { keyword: "Water", id: 3, imageChecked: false },
          ],
          id: 0,
        },
        {
          term: "Leche",
          definition: "milk",
          placeholderId: Math.floor(Math.random() * termsPlaceholder.length),
          descriptionKeywords: [
            {
              keyword: "cure",
              id: 0,
              imageChecked: false,
              image:
                "https://images.unsplash.com/photo-1562914344-e97da11dacd4?ixid=MnwzMDg5NzJ8MHwxfHNlYXJjaHwzfHxMYXR2aWF8ZW58MHx8fHwxNjQ3NDI0NzMx&ixlib=rb-1.2.1",
            },
            { keyword: "doctor", id: 1, imageChecked: false },
          ],
          id: 1,
        },
      ],
      setId: 2,
      createdDate: null,
      lastVisitedDate: null,
    },
    editingSet: {
      name: "First set",
      terms: [],
      setId: 2,
      createdDate: null,
      lastVisitedDate: null,
    },
    isCategorySet: false,
  },
  {
    savedSet: {
      name: "Second set",
      terms: [],
      setId: 1,
      createdDate: null,
      lastVisitedDate: null,
    },

    editingSet: {
      name: "Second set",
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
      setId: 3,
      createdDate: null,
      lastVisitedDate: null,
    },

    editingSet: {
      name: "Learned",
      terms: [],
      setId: 3,
      createdDate: null,
      lastVisitedDate: null,
    },
    isCategorySet: true,
  },
  {
    savedSet: {
      name: "Starred",
      terms: [],
      setId: 4,
      createdDate: null,
      lastVisitedDate: null,
    },

    editingSet: {
      name: "Starred",
      terms: [],
      setId: 4,
      createdDate: null,
      lastVisitedDate: null,
    },
    isCategorySet: true,
  },
  {
    savedSet: {
      name: "Difficult",
      terms: [],
      setId: 5,
      createdDate: null,
      lastVisitedDate: null,
    },

    editingSet: {
      name: "Difficult",
      terms: [],
      setId: 5,
      createdDate: null,
      lastVisitedDate: null,
    },
    isCategorySet: true,
  },
];
