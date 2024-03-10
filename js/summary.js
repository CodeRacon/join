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
 * Initializes the summary section by loading user data, setting the greeting flag in localStorage, and updating the summary UI.
 */
async function initSummary() {
	// storeStartData();
	await loadUserData();
	setGreetingFlagLS();
	updateSummary();
}

/**
 * Sets a flag in localStorage indicating whether the user has been greeted.
 * If the flag does not exist, it is initialized to false.
 */
function setGreetingFlagLS() {
	if (!localStorage.getItem('isGreeted')) {
		localStorage.setItem('isGreeted', false);
	}
}

/**
 * Updates the summary by calling various functions to update the dahboard-boxes.
 * This function handles updating all the summary data after async
 * operations have loaded the latest user data.
 */
function updateSummary() {
	mobileWelcomeMessage();
	updateUserGreeting();
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
	const toDoTasks = localUserData.users
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
	const doneTasks = localUserData.users
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
	const highPrioTasks = localUserData.users
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
	const tasksWithDueDate = localUserData.users
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
	const allTasks = localUserData.users.flatMap((user) => user.tasks || []);
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
	const tasksInProgress = localUserData.users
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
	const awaitFbTasks = localUserData.users
		.flatMap((user) => user.tasks || [])
		.filter((task) => task && task.status === 'awaitFeedback');
	const totalAwaitFbTasks = awaitFbTasks.length;
	fbCounter.innerHTML = /*html*/ `
    ${totalAwaitFbTasks}
  `;
}

/**
 * Updates the user greeting DOM element with the current logged in user's name.
 * Gets the current logged in user from the user data, checks if they are a guest user,
 * and conditionally updates the greeting with their name or clears it if no user is logged in.
 * Also calls updateDayTime() to refresh the day/time display.
 */
function updateUserGreeting() {
	const userName = document.getElementById('sum-username');
	const loggedInUsers = getLoggedInUser();
	const currentUserName = loggedInUsers.userData.name;
	const firstName = currentUserName.split(' ')[0];
	if (isGuestUser === false) {
		userName.innerHTML = /*html*/ `
    ${firstName}
  `;
		updateDayTime();
	} else {
		userName.innerHTML = '';
		updateDayTime();
	}
}

/**
 * Gets the currently logged in user from the local user data.
 * Filters the users array to find the one where isLoggedIn is true.
 * Returns the first logged in user object, or undefined if none are logged in.
 */
function getLoggedInUser() {
	const loggedInUsers = localUserData.users.filter(
		(user) => user.isLoggedIn === true
	);
	return loggedInUsers[0];
}

/**
 * Updates the daytime greeting DOM element with the current hour and a greeting.
 * Gets the current Unix timestamp, saves to localStorage.
 * Retrieves the saved timestamp, converts to Date object to get hour.
 * Calls getGreeting() to get the greeting based on hour, updates DOM element.
 */
function updateDayTime() {
	const daytime = document.getElementById('daytime');
	const unixTimestamp = Date.now();
	localStorage.setItem('loginTimestamp', unixTimestamp.toString());
	const storedTimestamp = localStorage.getItem('loginTimestamp');
	const loginTimestamp = parseInt(storedTimestamp);
	const loginDate = new Date(loginTimestamp);
	const loginHour = loginDate.getHours();
	const greeting = getGreeting(loginHour);
	daytime.innerHTML = /*html*/ `
    ${greeting}
  `;
}

/**
 * Returns a greeting based on the provided hour.
 * If guest user, returns a greeting without a name.
 * If logged in user, returns a greeting with a comma to append the user's name.
 */
function getGreeting(hour) {
	if (isGuestUser) {
		if (hour < 12) return 'Good Morning!';
		if (hour < 14) return 'Good Day!';
		if (hour < 18) return 'Good Afternoon!';
		return 'Good Evening!';
	} else if (!isGuestUser) {
		if (hour < 12) return 'Good Morning,';
		if (hour < 14) return 'Good Day,';
		if (hour < 18) return 'Good Afternoon,';
		return 'Good Evening,';
	}
}

let isGreeted = localStorage.getItem('isGreeted');

/**
 * Checks if screen width is mobile, shows mobile welcome message if not already shown.
 * Gets screen width, checks if <= 428px (mobile).
 * Gets greeting element, adds mobile-welcome class if mobile + not greeted.
 * Sets timeout to add fade-out class after 1.5s.
 * Sets timeout to remove classes after 2.75s total.
 * Sets localStorage value to indicate message has been shown.
 */
function mobileWelcomeMessage() {
	const screenWidth = window.innerWidth;
	const greeting = document.getElementById('greeting');
	if (screenWidth <= 428 && isGreeted === 'false') {
		greeting.classList.add('mobile-welcome');
		setTimeout(() => {
			greeting.classList.add('fade-out');
		}, 1500);
		setTimeout(() => {
			greeting.classList.remove('mobile-welcome', 'fade-out');
		}, 2750);
		localStorage.setItem('isGreeted', 'true');
	}
}
