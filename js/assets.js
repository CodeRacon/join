/**tasks: [
 * Array of hex color values used for contacts and task-categories
 */
let hexColors = [
  "#0038FF",
  "#00BEE8",
  "#1FD7C1",
  "#6E52FF",
  "#9747FF",
  "#A6C063",
  "#FC71FF",
  "#FF4646",
  "#FF5EB3",
  "#FF745E",
  "#FF7A00",
  "#FFA35E",
  "#FFBB2B",
  "#FFC701",
  "#FFE62B",
  "#00FF9D",
  "#00B155",
  "#85FF00",
  "#FFD100",
  "#FFC300",
  "#FF00E1",
  "#FF0091",
  "#0077FF",
  "#00A6FF",
  "#FF6A00",
  "#FF8A00",
  "#FF0038",
  "#FF005E",
  "#006AFF",
  "#00B8AB",
];

startData = [
  {
    

    color: "#659c2b",

    tasks: [
      {
        id: 1,
        // status 1 = To Do
        status: "toDo",

        // category 1 = User Story
        category: 1,

        title: "Daily Kochwelt Recipe",
        description: "Build start page with recipe recommendation...",
        assignedTo: ["Gene Ward", "Kjelt Becker", "Mike Skinner"],

        // priority 2 = medium
        priority: 2,

        subtasks: [
          { name: "re-design Mockup", done: false },
          { name: "update incredient calculator", done: false },
        ],
        dueDate: "2024-04-22",
      },
      {
        id: 2,
        status: "awaitFeedback",

        category: 1,

        title: "HTML Base Template Creation",
        description: "Create reusable HTML base templates...",
        subtasks: [
          { name: "set up basic html structure", done: true },
          { name: "usage of standard cssclasses", done: true },
        ],
        assignedTo: ["Gene Ward", "Kjelt Becker", "Mike Skinner"],
        priority: 1,
        dueDate: "2024-02-22",
      },
    ],
  },

  {
   
    color: "#0038FF",
    tasks: [
      {
        id: 3,
        status: "inProgress",
        category: 3,
        title: "Responsive Design Optimization",
        description:
          "Optimize website layout for various screen sizes and devices.",
        assignedTo: ["Mike Skinner", "Kamilla Morgentau"],
        priority: 1,
        subtasks: [
          { name: "Implement media queries", done: false },
          { name: "Test layout on different devices", done: false },
          { name: "Adjust CSS for responsiveness", done: false },
        ],
        dueDate: "2024-02-27",
      },
      {
        id: 4,
        status: "done",
        category: 2,
        title: "Front-End Framework Integration",
        description:
          "Integrate front-end framework to enhance user interface and development workflow.",
        assignedTo: ["Kamilla Morgentau"],
        priority: 3,
        subtasks: [
          { name: "Research suitable frameworks", done: true },
          { name: "Set up project with selected framework", done: false },
        ],
        dueDate: "2024-03-01",
      },
      {
        id: 5,
        status: "toDo",
        category: 4,
        title: "Code Review and Optimization",
        description:
          "Review existing codebase and optimize for performance and maintainability.",
        assignedTo: ["Kamilla Morgentau", "Gerd Förster"],
        priority: 2,
        subtasks: [
          { name: "Identify performance bottlenecks", done: false },
          { name: "Refactor code for readability", done: false },
          { name: "Implement best practices", done: false },
        ],
        dueDate: "2024-02-26",
      },
    ],
  },
  {
    
    color: "#00BEE8",
    tasks: [
      {
        id: 6,
        status: "inProgress",
        category: 3,
        title: "Cross-Browser Compatibility Testing",
        description:
          "Test website functionality and layout across different web browsers.",
        assignedTo: ["Mike Sinner", "Kamilla Morgentau", "Gerd Förster"],
        priority: 1,
        subtasks: [
          { name: "Test on Chrome", done: false },
          { name: "Test on Firefox", done: false },
          { name: "Test on Safari", done: false },
        ],
        dueDate: "2024-02-22",
      },
      {
        id: 7,
        status: "done",
        category: 2,
        title: "Front-End Performance Optimization",
        description:
          "Optimize website performance for faster loading and better user experience.",
        assignedTo: ["Mike Skinner"],
        priority: 3,
        subtasks: [
          { name: "Minify CSS and JavaScript files", done: true },
          { name: "Image optimization", done: false },
        ],
        dueDate: "2024-02-15",
      },
      {
        id: 8,
        status: "toDo",
        category: 4,
        title: "Accessibility Audit",
        description:
          "Conduct accessibility audit to ensure website is accessible to all users.",
        assignedTo: ["Kamilla Morgentau", "Mike Sinner", "Bernd Steinemann"],
        priority: 2,
        subtasks: [
          { name: "Check for ARIA compliance", done: false },
          { name: "Test with screen readers", done: false },
          { name: "Ensure keyboard navigation", done: false },
        ],
        dueDate: "2024-03-06",
      },
    ],
  },
  {
   
    color: "#1FD7C1",
    tasks: [
      {
        id: 9,
        status: "inProgress",
        category: 3,
        title: "Responsive Design Implementation",
        description:
          "Implement responsive design for better usability on mobile devices.",
        assignedTo: ["Bernd Steinemann", "Mike Skinner", "Bernd Steinemann"],
        priority: 1,
        subtasks: [
          { name: "Create mobile-friendly layouts", done: false },
          { name: "Optimize images for mobile", done: false },
          { name: "Test on various devices", done: false },
        ],
        dueDate: "2024-04-12",
      },
      {
        id: 10,
        status: "done",
        category: 2,
        title: "Front-End Bug Fixing",
        description: "Identify and fix bugs in the front-end codebase.",
        assignedTo: ["Kamilla Morgentau", "Bernd Steinemann"],
        priority: 3,
        subtasks: [
          { name: "Debug JavaScript errors", done: true },
          { name: "Fix CSS layout issues", done: false },
        ],
        dueDate: "2024-03-06",
      },
      {
        id: 11,
        status: "toDo",
        category: 4,
        title: "Code Refactoring",
        description:
          "Refactor front-end codebase for improved readability and maintainability.",
        assignedTo: ["Bernd Steinemann"],
        priority: 2,
        subtasks: [
          { name: "Identify code duplication", done: false },
          { name: "Rewrite complex functions", done: false },
          { name: "Document code changes", done: false },
        ],
        dueDate: "2024-02-26",
      },
    ],
  },
  {
    
    color: "#6E52FF",
    tasks: [
      {
        id: 12,
        status: "inProgress",
        category: 3,
        title: "CSS Animation Implementation",
        description:
          "Implement CSS animations to enhance user interface interactions.",
        assignedTo: ["Bernd Steinemann", "Sophia Kostas", "Mike Skinner"],
        priority: 1,
        subtasks: [
          { name: "Identify elements for animation", done: false },
          { name: "Write CSS animation rules", done: false },
          { name: "Test animations across browsers", done: false },
        ],
        dueDate: "2024-03-02",
      },
      {
        id: 13,
        status: "done",
        category: 2,
        title: "Front-End Performance Monitoring",
        description:
          "Monitor front-end performance metrics and identify areas for improvement.",
        assignedTo: ["Sophia Kostas"],
        priority: 3,
        subtasks: [
          { name: "Set up performance monitoring tools", done: true },
          { name: "Analyze page load times", done: false },
        ],
        dueDate: "2024-04-04",
      },
      {
        id: 14,
        status: "toDo",
        category: 4,
        title: "User Interface Enhancement",
        description:
          "Enhance user interface design to improve user experience.",
        assignedTo: ["Sophia Kostas", "Ahmed Al-Farsi"],
        priority: 2,
        subtasks: [
          { name: "Design new UI components", done: false },
          { name: "Implement responsive layout", done: false },
          { name: "Conduct user feedback sessions", done: false },
        ],
        dueDate: "2024-02-25",
      },
    ],
  },
  {
   
    color: "#9747FF",
  },
  {
    
    color: "#687fc4",
  },
  {
    
    color: "#FC71FF",
  },
  {
   
    color: "#FF4646",
  },
  {
   
    color: "#FF5EB3",
  },
  {
   
    color: "#FF745E",
  },
  {
   
    color: "#FF7A00",
  },
  {
   
    color: "#FFA35E",
  },
  {
   
    color: "#FFBB2B",
  },
  {
   
    color: "#FFC701",
  },
  {
 
    color: "#9c8900",
  },
  {
    
    color: "#61c39d",
  },
  {
    
    color: "#1dab93",
  },
];

// neues json mit neuen kontakten usw

/**
 * Stores the start data in local storage.
 */
async function storeStartData() {
  await setItem("startData", JSON.stringify(startData));
}
 async function getData(){
  await getItem('startData');
 }