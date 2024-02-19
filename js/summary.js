const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Initializes the summary-page by loading user data and updating the summary first
 * and then updating the dahboard-boxes with the latest user data.
 */
async function initSummary() {
  await loadUserData();
  updateSummary();
}

/**
 * Updates the summary by calling various functions to update the dahboard-boxes.
 * This function handles updating all the summary data after async
 * operations have loaded the latest user data.
 */
function updateSummary() {
  updateToDoCounter();
  updateDoneCounter();
  updateHighPrioCounter();
  updateDueDate();
  updateTaskCounter();
  updateInProgressCounter();
  updateAwaitFeedBackCounter();
}

/**
 * Updates the todo counter element with the total number of todo tasks.
 * Gets all user tasks by putting them into a flat array,
 * filters for todo status, counts them, and updates the todo counter element.
 */
function updateToDoCounter() {
  const toDoTasks = localUserData
    .flatMap((user) => user.tasks || [])
    .filter((task) => task && task.status === 'toDo');
  const totalToDoTasks = toDoTasks.length;
  const todoCounter = document.getElementById('todo-counter');
  todoCounter.innerHTML = /*html*/ `
  ${totalToDoTasks}
`;
}

/**
 * Updates the done counter element with the total number of done tasks.
 * Gets all user tasks by putting them into a flat array,
 * filters for done status, counts them, and updates the done counter element.
 */
function updateDoneCounter() {
  const doneTasks = localUserData
    .flatMap((user) => user.tasks || [])
    .filter((task) => task && task.status === 'done');
  const totalDoneTasks = doneTasks.length;
  const doneCounter = document.getElementById('done-counter');
  doneCounter.innerHTML = /*html*/ `
  ${totalDoneTasks}
`;
}

/**
 * Updates the high priority counter element with the total number
 * of high priority tasks.
 * Gets all user tasks, puts them into a flat array,
 * filters for priority 3, counts them,
 * and updates the high priority counter element.
 */
function updateHighPrioCounter() {
  const urgencyCounter = document.getElementById('urgency-counter');
  const highPrioTasks = localUserData
    .flatMap((user) => user.tasks || [])
    .filter((task) => task && task.priority === 3);
  const totalHighPrioTasks = highPrioTasks.length;
  urgencyCounter.innerHTML = /*html*/ `
    ${totalHighPrioTasks}
  `;
}

/**
 * Updates the due date element with the closest upcoming due date.
 * Gets all due dates, finds the closest one, formats it,
 * and updates the due date element.
 */
function updateDueDate() {
  const dates = findAllDueDates();
  const closestDueDate = findClosestDueDate(dates);
  const formattedDueDate = formatDate(closestDueDate);
  const dueDate = document.getElementById('due-date');
  dueDate.innerHTML = /*html*/ `
    ${formattedDueDate}
  `;
}

/**
 * Help-function to find all due dates across all user tasks.
 * Gets all user tasks, filters for those with a dueDate,
 * maps them to Date objects, and returns the array of dates.
 */
function findAllDueDates() {
  const tasksWithDueDate = localUserData
    .flatMap((user) => (user.tasks || []).filter((task) => task.dueDate))
    .map((task) => new Date(task.dueDate));
  return tasksWithDueDate;
}

/**
 * Help-function to find the closest due date from an array of dates.
 * Compares each date to today's date to calculate the difference,
 * sorts the dates by difference, and returns the first (closest) date.
 */
function findClosestDueDate(dates) {
  const today = new Date();
  const dateDiffs = dates.map((date) => {
    return {
      date: date,
      diff: Math.abs(today - date),
    };
  });
  const closestDate = dateDiffs
    .sort((a, b) => a.diff - b.diff)
    .map((d) => d.date)[0];
  return closestDate;
}

/**
 * Formats a Date object into a readable string with the
 * full month name, day, and year.
 *
 * @param {Date} date - The date to format
 * @returns {string} The formatted date string
 */
function formatDate(date) {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const monthName = monthNames[monthIndex];
  return `${monthName} ${day}, ${year}`;
}

/**
 * Updates the task counter DOM element with the total number of tasks across all users.
 * Gets all tasks from all users, puts them in a flat array,
 * counts them, and updates the DOM element.
 */
function updateTaskCounter() {
  const taskCounter = document.getElementById('task-counter');
  const allTasks = localUserData.flatMap((user) => user.tasks || []);
  const totalTasks = allTasks.length;

  taskCounter.innerHTML = /*html*/ `
    ${totalTasks}
  `;
}

/**
 * Updates the in-progress task counter DOM element with the total number of
 * in-progress tasks across all users.
 * Gets all tasks from all users, puts them in a flat array, filters for in-progress tasks,
 * counts them, and updates the DOM element.
 */
function updateInProgressCounter() {
  const progressCounter = document.getElementById('progress-counter');
  const tasksInProgress = localUserData
    .flatMap((user) => user.tasks || [])
    .filter((task) => task && task.status === 'inProgress');
  const totalTasksInProgress = tasksInProgress.length;
  progressCounter.innerHTML = /*html*/ `
    ${totalTasksInProgress}
  `;
}

/**
 * Updates the await feedback counter DOM element with the total number of
 * tasks that are awaiting feedback across all users.
 * Gets all tasks from all users, puts them in a flat array, filters for tasks
 * that are awaiting feedback, counts them, and updates the DOM element.
 */
function updateAwaitFeedBackCounter() {
  const fbCounter = document.getElementById('fb-counter');
  const awaitFbTasks = localUserData
    .flatMap((user) => user.tasks || [])
    .filter((task) => task && task.status === 'awaitFeedback');
  const totalAwaitFbTasks = awaitFbTasks.length;
  fbCounter.innerHTML = /*html*/ `
    ${totalAwaitFbTasks}
  `;
}
