const projects = [
  {
    _id: "66e567537b06e36f0e7196ed",
    projectName: "project1",
    team: {
      _id: "66e567407b06e36f0e7196ea",
      teamName: "team1",
    },
    tasks: [
      "66e6bd594f3d6f1b1f8aff37",
      "66e6befdb8b6ccb71c105398",
      "66e6ca59d0dd98922a8663e9",
    ],
    completePercent: 90,
    startDate: "2024-09-14T10:13:10.493Z",
    dueDate: "2024-09-20T10:23:10.124Z",
    files: [],
    createdAt: "2024-09-14T10:37:07.017Z",
    updatedAt: "2024-09-15T12:03:59.047Z",
    __v: 3,
    status: "inProgress",
  },
  {
    _id: "66e6d95ee526811f0db2b4bb",
    projectName: "project3",
    team: {
      _id: "66e567407b06e36f0e7196ea",
      teamName: "team1",
    },
    tasks: [],
    completePercent: 0,
    startDate: "2024-09-14T10:13:10.493Z",
    dueDate: "2024-10-14T10:23:10.124Z",
    status: "onHold",
    files: [],
    createdAt: "2024-09-15T12:55:58.334Z",
    updatedAt: "2024-09-15T12:55:58.334Z",
    __v: 0,
  },
];

const notifications = [
  {
    _id: "66e8446c8da013728e5e0710",
    title: "deadline of project1",
    message: "deadline of project1 after 3 days",
    projectId: "66e567537b06e36f0e7196ed",
    team: {
      _id: "66e567407b06e36f0e7196ea",
      teamName: "team1",
    },
    isRead: true,
    __v: 0,
  },
  {
    _id: "66e8446c8da013528e5e0710",
    title: "deadline of project2",
    message: "deadline of project1 after 2 days",
    projectId: "66e567537b06536f0e7196ed",
    team: {
      _id: "66e567407b06e36f0e7196ea",
      teamName: "team2",
    },
    isRead: false,
    __v: 0,
  },
];

const users = [
  {
    _id: "66e034e7169c1c9fb6bb798",
    userName: "Ahmed Tarek",
    email: "at@gmail.com",
    phoneNumber: "01056861935",
    profilePic: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      public_id: null,
    },
    role: "admin",
    createdAt: "2024-09-10T12:00:39.810Z",
    updatedAt: "2024-09-10T12:00:39.810Z",
    __v: 0,
  },
  {
    _id: "66e1c4f7c2431907efdf93",
    userName: "houda",
    email: "houda@gmail.com",
    phoneNumber: "01828387",
    profilePic: {
      url: "https://res.cloudinary.com/dyyjz2ymv/image/upload/v1726061775/w8eud7bxj1jouoxhspbt.jpg",
      public_id: "w8eud7bxj1jouoxhspbt",
    },
    role: "teamLeader",
    createdAt: "2024-09-11T13:36:04.855Z",
    updatedAt: "2024-09-11T13:36:04.855Z",
    __v: 0,
  },
  {
    _id: "662cbe62cb0b80ddd2b1b44",
    userName: "ali",
    email: "ali@gmail.com",
    phoneNumber: "01828387",
    profilePic: {
      url: "https://res.cloudinary.com/dyyjz2ymv/image/upload/v1726139378/hjgzngusfw13u3ufweqq.jpg",
      public_id: "hjgzngusfw13u3ufweqq",
    },
    role: "teamLeader",
    createdAt: "2024-09-12T11:09:26.931Z",
    updatedAt: "2024-09-12T11:09:26.931Z",
    __v: 0,
  },
  {
    _id: "66e2ccab8f35860c93c2da",
    userName: "mohamed",
    email: "mo@gmail.com",
    phoneNumber: "01828387",
    profilePic: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      public_id: null,
    },
    role: "user",
    createdAt: "2024-09-12T11:13:37.644Z",
    updatedAt: "2024-09-12T11:13:37.644Z",
    __v: 0,
  },
  {
    _id: "66e2ccec35860c93c2dd",
    userName: "mona",
    email: "mona@gmail.com",
    phoneNumber: "01828387",
    profilePic: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      public_id: null,
    },
    role: "user",
    createdAt: "2024-09-12T11:13:48.085Z",
    updatedAt: "2024-09-12T11:13:48.085Z",
    __v: 0,
  },
  {
    _id: "66e2ccf35860c93c2e0",
    userName: "huda",
    email: "hu@gmail.com",
    phoneNumber: "01828387",
    profilePic: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      public_id: null,
    },
    role: "user",
    createdAt: "2024-09-12T11:13:56.947Z",
    updatedAt: "2024-09-12T11:13:56.947Z",
    __v: 0,
  },
  {
    _id: "66e97e55b11a3ebb1001",
    userName: "medo",
    email: "medo@gmail.com",
    phoneNumber: "01828387",
    profilePic: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      public_id: null,
    },
    role: "teamLeader",
    createdAt: "2024-09-17T13:04:21.414Z",
    updatedAt: "2024-09-17T13:04:21.414Z",
    __v: 0,
  },
  {
    _id: "66e98954ef90ce59e3ff",
    userName: "abdo",
    email: "abdo@gmail.com",
    phoneNumber: "01828387",
    profilePic: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      public_id: null,
    },
    role: "user",
    createdAt: "2024-09-17T13:53:58.892Z",
    updatedAt: "2024-09-17T13:53:58.892Z",
    __v: 0,
  },
];

const teams = [
  {
    _id: "66e2cc092cb0b80ddd2b1b49",
    teamName: "team2",
    teamPic: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvaTgHfZIBI8GMu9L47Tigh43ZNmxyQqPZoA&s",
      public_id: null,
    },
    teamLeader: {
      _id: "66e2cbe62cb0b80ddd2b1b44",
      userName: "ali",
      email: "ali@gmail.com",
      profilePic: {
        url: "https://res.cloudinary.com/dyyjz2ymv/image/upload/v1726139378/hjgzngusfw13u3ufweqq.jpg",
        public_id: "hjgzngusfw13u3ufweqq",
      },
      role: "teamLeader",
      __v: 0,
    },
    members: [
      {
        _id: "66e2ccecab8f35860c93c2dd",
        userName: "mona",
        email: "mona@gmail.com",
        profilePic: {
          url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
          public_id: null,
        },
        role: "user",
        __v: 0,
      },
      {
        _id: "66e2cce1ab8f35860c93c2da",
        userName: "mohamed",
        email: "mo@gmail.com",
        profilePic: {
          url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
          public_id: null,
        },
        role: "user",
        __v: 0,
      },
    ],
    projects: ["66e566c3a58a21f61efc546c"],
    createdAt: "2024-09-12T11:10:01.155Z",
    updatedAt: "2024-09-17T13:22:38.689Z",
    __v: 1,
  },
  {
    _id: "66e567407b06e36f0e7196ea",
    teamName: "team1",
    teamPic: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY927mC5JQA7SUzMEtYdFww8YA5R76DVI7yGRHntYERMG1qdFMRkM_6lTTqMeTUUh7UOU&usqp=CAU",
      public_id: null,
    },
    teamLeader: {
      _id: "66e19cc4f7c2431907efdf93",
      userName: "houda",
      email: "houda@gmail.com",
      profilePic: {
        url: "https://res.cloudinary.com/dyyjz2ymv/image/upload/v1726061775/w8eud7bxj1jouoxhspbt.jpg",
        public_id: "w8eud7bxj1jouoxhspbt",
      },
      role: "teamLeader",
      __v: 0,
    },
    members: [
      {
        _id: "66e2ccf4ab8f35860c93c2e0",
        userName: "huda",
        email: "hu@gmail.com",
        profilePic: {
          url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
          public_id: null,
        },
        role: "user",
        __v: 0,
      },
    ],
    projects: [
      "66e567537b06e36f0e7196ed",
      "66e6d4228c5d90056cabe9c5",
      "66e6d58771075a8b82fcd667",
      "66e6d95ee526811f0db2b4bb",
    ],
    createdAt: "2024-09-14T10:36:48.314Z",
    updatedAt: "2024-09-15T12:55:58.340Z",
    __v: 4,
  },
  {
    _id: "66e567407b06e3f0e7196ea",
    teamName: "team1",
    teamPic: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPqdjuOyDlgsFu-BKJHPHdxy0SMMro6zNzEw&s",
      public_id: null,
    },
    teamLeader: {
      _id: "66e19cc4f7c2431907efdf93",
      userName: "houda",
      email: "houda@gmail.com",
      profilePic: {
        url: "https://res.cloudinary.com/dyyjz2ymv/image/upload/v1726061775/w8eud7bxj1jouoxhspbt.jpg",
        public_id: "w8eud7bxj1jouoxhspbt",
      },
      role: "teamLeader",
      __v: 0,
    },
    members: [
      {
        _id: "66e2ccf4ab8f35860c93c2e0",
        userName: "huda",
        email: "hu@gmail.com",
        profilePic: {
          url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
          public_id: null,
        },
        role: "user",
        __v: 0,
      },
    ],
    projects: [
      "66e567537b06e36f0e7196ed",
      "66e6d4228c5d90056cabe9c5",
      "66e6d58771075a8b82fcd667",
      "66e6d95ee526811f0db2b4bb",
    ],
    createdAt: "2024-09-14T10:36:48.314Z",
    updatedAt: "2024-09-15T12:55:58.340Z",
    __v: 4,
  },
  {
    _id: "66e567407b045e3f0e7196ea",
    teamName: "team1",
    teamPic: {
      url: "https://cdn.iveybusinessjournal.com/wp-content/uploads/2016/01/iStock_000076498599_crop.jpg",
      public_id: null,
    },
    teamLeader: {
      _id: "66e19cc4f7c2431907efdf93",
      userName: "houda",
      email: "houda@gmail.com",
      profilePic: {
        url: "https://res.cloudinary.com/dyyjz2ymv/image/upload/v1726061775/w8eud7bxj1jouoxhspbt.jpg",
        public_id: "w8eud7bxj1jouoxhspbt",
      },
      role: "teamLeader",
      __v: 0,
    },
    members: [
      {
        _id: "66e2ccf4ab8f35860c93c2e0",
        userName: "huda",
        email: "hu@gmail.com",
        profilePic: {
          url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
          public_id: null,
        },
        role: "user",
        __v: 0,
      },
    ],
    projects: [
      "66e567537b06e36f0e7196ed",
      "66e6d4228c5d90056cabe9c5",
      "66e6d58771075a8b82fcd667",
      "66e6d95ee526811f0db2b4bb",
    ],
    createdAt: "2024-09-14T10:36:48.314Z",
    updatedAt: "2024-09-15T12:55:58.340Z",
    __v: 4,
  },
];

export { projects, notifications, users, teams };
