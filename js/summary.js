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

async function initSummary() {
  await loadUserData();
  updateSummary();
}

function updateSummary() {
  updateToDoCounter();
  updateDoneCounter();
  updateHighPrioCounter();
  updateDueDate();
  updateTaskCounter();
  updateInProgressCounter();
  updateAwaitFeedBackCounter();
}

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

function updateDueDate() {
  const dates = findAllDueDates();
  const closestDueDate = findClosestDueDate(dates);
  const formattedDueDate = formatDate(closestDueDate);
  const dueDate = document.getElementById('due-date');
  dueDate.innerHTML = /*html*/ `
    ${formattedDueDate}
  `;
}

function findAllDueDates() {
  const tasksWithDueDate = localUserData
    .flatMap((user) => (user.tasks || []).filter((task) => task.dueDate))
    .map((task) => new Date(task.dueDate));
  return tasksWithDueDate;
}

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

function formatDate(date) {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const monthName = monthNames[monthIndex];
  return `${monthName} ${day}, ${year}`;
}

const fbCounter = document.getElementById('fb-counter');

function updateTaskCounter() {
  const taskCounter = document.getElementById('task-counter');
  const allTasks = localUserData.flatMap((user) => user.tasks || []);
  const totalTasks = allTasks.length;

  taskCounter.innerHTML = /*html*/ `
    ${totalTasks}
  `;
}

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
