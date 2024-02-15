/**
 * Array of hex color values used for contacts and task-categories
 */
// const hexColors = [
//   '#0038FF',
//   '#00BEE8',
//   '#1FD7C1',
//   '#6E52FF',
//   '#9747FF',
//   '#C3FF2B',
//   '#FC71FF',
//   '#FF4646',
//   '#FF5EB3',
//   '#FF745E',
//   '#FF7A00',
//   '#FFA35E',
//   '#FFBB2B',
//   '#FFC701',
//   '#FFE62B',
// ];

startData = [
  {
    isRegistered: false,
    isLoggedIn: false,
    timeStamp: 1618672694533,
 // userdata selbst in den array pushen und wenn das gepushte dan der lenght entspricht wird eine neue json erstelltz
    userData: {
      name: "Mike Skinner",
      phone: "(758) 519-1073",
      email: "m.skinner89@gmail.com",
      password: "pw1234",
    },

    color: "#659c2b",

    tasks: [
      {
        id: 1,
        // status 1 = To Do
        status: 1,

        // category 1 = User Story
        category: 1,

        title: "Daily Kochwelt Recipe",
        description: "Build start page with recipe recommendation...",
        assignedTo: ["Gene Ward", "Kjelt Becker"],

        // priority 2 = medium
        priority: 2,

        subtasks: [
          { name: "re-design Mockup", done: false },
          { name: "update incredient calculator", done: false },
        ],
        dueDate: "20.02.2024",
      },
      {
        id: 2,
        status: 3,

        category: 1,

        title: "HTML Base Template Creation",
        description: "Create reusable HTML base templates...",
        subtasks: [
          { name: "set up basic html structure", done: true },
          { name: "usage of standard cssclasses", done: true },
        ],
        assignedTo: ["Gene Ward", "Kjelt Becker", "Hasan Demir"],
        priority: 1,
        status: 3,
        duedate: "14.02.2024",
      },
    ],
  },

  {
    isRegistered: true,
    isLoggedIn: false,
    userData: {
      name: "Kamilla Morgentau",
      phone: "(741) 762-6527",
      email: "k.morgentau@gmail.com",
      password: "pw1234",
    },
    color: "#0038FF",
    tasks: [
      {
        id: 3,
        status: 2,
        category: 3,
        title: "Responsive Design Optimization",
        description:
          "Optimize website layout for various screen sizes and devices.",
        assignedTo: ["Name1", "Name2", "Name3"],
        priority: 1,
        subtasks: [
          { name: "Implement media queries", done: false },
          { name: "Test layout on different devices", done: false },
          { name: "Adjust CSS for responsiveness", done: false },
        ],
        duedate: "28.02.2024",
      },
      {
        id: 4,
        status: 4,
        category: 2,
        title: "Front-End Framework Integration",
        description:
          "Integrate front-end framework to enhance user interface and development workflow.",
        assignedTo: ["Name4"],
        priority: 3,
        subtasks: [
          { name: "Research suitable frameworks", done: true },
          { name: "Set up project with selected framework", done: false },
        ],
        duedate: "22.02.2024",
      },
      {
        id: 5,
        status: 1,
        category: 4,
        title: "Code Review and Optimization",
        description:
          "Review existing codebase and optimize for performance and maintainability.",
        assignedTo: ["Name2", "Name3"],
        priority: 2,
        subtasks: [
          { name: "Identify performance bottlenecks", done: false },
          { name: "Refactor code for readability", done: false },
          { name: "Implement best practices", done: false },
        ],
        duedate: "25.02.2024",
      },
    ],
  },
  {
    isRegistered: true,
    isLoggedIn: false,
    userData: {
      name: "Gerd Förster",
      phone: "(606) 200-4805",
      email: "g.foerster86@gmail.com",
      password: "pw1234",
    },
    color: "#00BEE8",
    tasks: [
      {
        id: 6,
        status: 2,
        category: 3,
        title: "Cross-Browser Compatibility Testing",
        description:
          "Test website functionality and layout across different web browsers.",
        assignedTo: ["Name1", "Name2", "Name3"],
        priority: 1,
        subtasks: [
          { name: "Test on Chrome", done: false },
          { name: "Test on Firefox", done: false },
          { name: "Test on Safari", done: false },
        ],
        duedate: "28.02.2024",
      },
      {
        id: 7,
        status: 4,
        category: 2,
        title: "Front-End Performance Optimization",
        description:
          "Optimize website performance for faster loading and better user experience.",
        assignedTo: ["Name4"],
        priority: 3,
        subtasks: [
          { name: "Minify CSS and JavaScript files", done: true },
          { name: "Image optimization", done: false },
        ],
        duedate: "22.02.2024",
      },
      {
        id: 8,
        status: 1,
        category: 4,
        title: "Accessibility Audit",
        description:
          "Conduct accessibility audit to ensure website is accessible to all users.",
        assignedTo: ["Name2", "Name3"],
        priority: 2,
        subtasks: [
          { name: "Check for ARIA compliance", done: false },
          { name: "Test with screen readers", done: false },
          { name: "Ensure keyboard navigation", done: false },
        ],
        duedate: "25.02.2024",
      },
    ],
  },
  {
    isRegistered: true,
    isLoggedIn: false,
    userData: {
      name: "Bernd Steinemann",
      phone: "(606) 659-4325",
      email: "steinemann83@mail.com",
    },
    color: "#1FD7C1",
    tasks: [
      {
        id: 9,
        status: 2,
        category: 3,
        title: "Responsive Design Implementation",
        description:
          "Implement responsive design for better usability on mobile devices.",
        assignedTo: ["Name1", "Name2", "Name3"],
        priority: 1,
        subtasks: [
          { name: "Create mobile-friendly layouts", done: false },
          { name: "Optimize images for mobile", done: false },
          { name: "Test on various devices", done: false },
        ],
        duedate: "28.02.2024",
      },
      {
        id: 10,
        status: 4,
        category: 2,
        title: "Front-End Bug Fixing",
        description: "Identify and fix bugs in the front-end codebase.",
        assignedTo: ["Name4"],
        priority: 3,
        subtasks: [
          { name: "Debug JavaScript errors", done: true },
          { name: "Fix CSS layout issues", done: false },
        ],
        duedate: "22.02.2024",
      },
      {
        id: 11,
        status: 1,
        category: 4,
        title: "Code Refactoring",
        description:
          "Refactor front-end codebase for improved readability and maintainability.",
        assignedTo: ["Name2", "Name3"],
        priority: 2,
        subtasks: [
          { name: "Identify code duplication", done: false },
          { name: "Rewrite complex functions", done: false },
          { name: "Document code changes", done: false },
        ],
        duedate: "25.02.2024",
      },
    ],
  },
  {
    isRegistered: true,
    isLoggedIn: false,
    userData: {
      name: "Sophia Kostas",
      phone: "(264) 911-2395",
      email: "s.kostas84@mail.com",
    },
    color: "#6E52FF",
    tasks: [
      {
        id: 12,
        status: 2,
        category: 3,
        title: "CSS Animation Implementation",
        description:
          "Implement CSS animations to enhance user interface interactions.",
        assignedTo: ["Name1", "Name2", "Name3"],
        priority: 1,
        subtasks: [
          { name: "Identify elements for animation", done: false },
          { name: "Write CSS animation rules", done: false },
          { name: "Test animations across browsers", done: false },
        ],
        duedate: "28.02.2024",
      },
      {
        id: 13,
        status: 4,
        category: 2,
        title: "Front-End Performance Monitoring",
        description:
          "Monitor front-end performance metrics and identify areas for improvement.",
        assignedTo: ["Name4"],
        priority: 3,
        subtasks: [
          { name: "Set up performance monitoring tools", done: true },
          { name: "Analyze page load times", done: false },
        ],
        duedate: "22.02.2024",
      },
      {
        id: 14,
        status: 1,
        category: 4,
        title: "User Interface Enhancement",
        description:
          "Enhance user interface design to improve user experience.",
        assignedTo: ["Name2", "Name3"],
        priority: 2,
        subtasks: [
          { name: "Design new UI components", done: false },
          { name: "Implement responsive layout", done: false },
          { name: "Conduct user feedback sessions", done: false },
        ],
        duedate: "25.02.2024",
      },
    ],
  },
  {
    isRegistered: false,
    isLoggedIn: false,
    userData: {
      name: "Ahmed Al-Farsi",
      phone: "(353) 365-9874",
      email: "a.alfarsi89@mail.com",
    },
    color: "#9747FF",
  },
  {
    isRegistered: false,
    isLoggedIn: false,
    userData: {
      name: "Lindsay Orn",
      phone: "(079) 862-6516",
      email: "lorn99@mail.com",
    },
    color: "#687fc4",
  },
  {
    isRegistered: false,
    isLoggedIn: false,
    userData: {
      name: "Annetta Grant",
      phone: "(778) 560-8034",
      email: "a.grant@mail.com",
    },
    color: "#FC71FF",
  },
  {
    isRegistered: false,
    isLoggedIn: false,
    userData: {
      name: "Henna Yilmaz",
      phone: "(494) 694-8019",
      email: "h.yilmaz79@gmail.com",
    },
    color: "#FF4646",
  },
  {
    isRegistered: false,
    isLoggedIn: false,
    userData: {
      name: "Joey Kub",
      phone: "(227) 955-4546",
      email: "jokub74@mail.com",
    },
    color: "#FF5EB3",
  },
  {
    isRegistered: false,
    isLoggedIn: false,
    userData: {
      name: "Pascale Feeney",
      phone: "(830) 099-6852",
      email: "pas.feeney@mail.com",
    },
    color: "#FF745E",
  },
  {
    isRegistered: false,
    isLoggedIn: false,
    userData: {
      name: "Lea Stamm",
      phone: "(004) 386-7068",
      email: "lea.stamm98@gmail.com",
    },
    color: "#FF7A00",
  },
  {
    isRegistered: false,
    isLoggedIn: false,
    userData: {
      name: "Tess Moore",
      phone: "(549) 753-7594",
      email: "t.moore99@gmail.com",
    },
    color: "#FFA35E",
  },
  {
    isRegistered: false,
    isLoggedIn: false,
    userData: {
      name: "Jazmyn Tremblay",
      phone: "(866) 844-0133",
      email: "j.tremblay92@mail.com",
    },
    color: "#FFBB2B",
  },
  {
    isRegistered: false,
    isLoggedIn: false,
    userData: {
      name: "George Kozey",
      phone: "(176) 842-2961",
      email: "ge-ko@mail.com",
    },
    color: "#FFC701",
  },
  {
    isRegistered: false,
    isLoggedIn: false,
    userData: {
      name: "Hasan Demir",
      phone: "(733) 649-6102",
      email: "hasan.demir81@mail.com",
    },
    color: "#9c8900",
  },
  {
    isRegistered: false,
    isLoggedIn: false,
    userData: {
      name: "Kjelt Becker",
      phone: "(484) 742-4202",
      email: "k.becker@gmail.com",
    },
    color: "#61c39d",
  },
  {
    isRegistered: false,
    isLoggedIn: false,
    userData: {
      name: "Gene Ward",
      phone: "(876) 110-8650",
      email: "g.ward@gmail.com",
    },
    color: "#1dab93",
  },
  {
    isRegistered: false,
    isLoggedIn: false,
    userData: {
      name: "Howard Stern",
      phone: "(516) 1256-8652",
      email: "stern.h@gmail.com",
    },
    color: "#FFC300",
  },
];

/**
 * Stores the start data in local storage.
 */
function storeStartData() {
  setItem("startData", JSON.stringify(startData));
}
