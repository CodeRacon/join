/**tasks: [
 * Array of hex color values used for contacts and task-categories
 */
let hexColors = [
	'#b83c3c',
	'#00BEE8',
	'#1FD7C1',
	'#6E52FF',
	'#9747FF',
	'#A6C063',
	'#FC71FF',
	'#FF4646',
	'#FF5EB3',
	'#FF745E',
	'#FF7A00',
	'#FFA35E',
	'#FFBB2B',
	'#FFC701',
	'#FFE62B',
	'#00FF9D',
	'#00B155',
	'#85FF00',
	'#FFD100',
	'#FFC300',
	'#FF00E1',
	'#FF0091',
	'#0077FF',
	'#00A6FF',
	'#FF6A00',
	'#FF8A00',
	'#FF0038',
	'#FF005E',
	'#006AFF',
	'#00B8AB',
];

startData = {
	users: [
		{
			isRegistered: true,
			isLoggedIn: false,
			userData: {
				name: 'Mike Skinner',
				phone: '(758) 519-1073',
				email: 'm.skinner89@gmail.com',
				password: 'pw1234',
			},

			color: '#659c2b',
			tasks: [
				{
					id: 1,
					status: 'toDo',
					category: 1,
					title: 'Daily Kochwelt Recipe',
					description: 'Build start page with recipe recommendation...',
					assignedTo: ['Gene Ward', 'Kjelt Becker', 'Mike Skinner'],
					priority: 2,
					subtasks: [
						{ name: 're-design Mockup', done: false },
						{ name: 'update incredient calculator', done: true },
					],
					dueDate: '2024-04-22',
				},
				{
					id: 2,
					status: 'awaitFeedback',
					category: 1,
					title: 'HTML Base Template Creation',
					description: 'Create reusable HTML base templates...',
					subtasks: [
						{ name: 'set up basic html structure', done: true },
						{ name: 'usage of standard css classes', done: true },
						{ name: 'responsive design', done: false },
					],
					assignedTo: ['Gene Ward', 'Kjelt Becker', 'Mike Skinner'],
					priority: 1,
					dueDate: '2024-02-22',
				},
			],
		},

		{
			isRegistered: true,
			isLoggedIn: true,
			userData: {
				name: 'Kamilla Morgentau',
				phone: '(741) 762-6527',
				email: 'k.morgentau@gmail.com',
				password: 'pw1234',
			},
			color: '#b83c3c',
			tasks: [
				{
					id: 3,
					status: 'inProgress',
					category: 3,
					title: 'Responsive Design Optimization',
					description:
						'Optimize website layout for various screen sizes and devices.',
					assignedTo: ['Mike Skinner', 'Kamilla Morgentau'],
					priority: 1,
					subtasks: [
						{ name: 'Implement media queries', done: true },
						{ name: 'Test layout on different devices', done: false },
						{ name: 'Adjust CSS for responsiveness', done: false },
					],
					dueDate: '2024-02-27',
				},
				{
					id: 4,
					status: 'done',
					category: 2,
					title: 'Front-End Framework Integration',
					description:
						'Integrate front-end framework to enhance user interface and development workflow.',
					assignedTo: ['Kamilla Morgentau'],
					priority: 3,
					subtasks: [
						{ name: 'Research suitable frameworks', done: true },
						{ name: 'Set up project with selected framework', done: false },
					],
					dueDate: '2024-03-01',
				},
				{
					id: 5,
					status: 'toDo',
					category: 4,
					title: 'Code Review and Optimization',
					description:
						'Review existing codebase and optimize for performance and maintainability.',
					assignedTo: ['Kamilla Morgentau', 'Gerd Förster'],
					priority: 2,
					subtasks: [
						{ name: 'Identify performance bottlenecks', done: false },
						{ name: 'Refactor code for readability', done: false },
						{ name: 'Implement best practices', done: false },
					],
					dueDate: '2024-02-26',
				},
			],
		},
		{
			isRegistered: true,
			isLoggedIn: false,
			userData: {
				name: 'Gerd Förster',
				phone: '(606) 200-4805',
				email: 'g.foerster86@gmail.com',
				password: 'pw1234',
			},
			color: '#00BEE8',
			tasks: [
				{
					id: 6,
					status: 'inProgress',
					category: 3,
					title: 'Cross-Browser Compatibility Testing',
					description:
						'Test website functionality and layout across different web browsers.',
					assignedTo: ['Mike Skinner', 'Kamilla Morgentau', 'Gerd Förster'],
					priority: 1,
					subtasks: [
						{ name: 'Test on Chrome', done: false },
						{ name: 'Test on Firefox', done: true },
						{ name: 'Test on Safari', done: false },
					],
					dueDate: '2024-02-22',
				},
				{
					id: 7,
					status: 'done',
					category: 2,
					title: 'Front-End Performance Optimization',
					description:
						'Optimize website performance for faster loading and better user experience.',
					assignedTo: ['Mike Skinner'],
					priority: 3,
					subtasks: [
						{ name: 'Minify CSS and JavaScript files', done: true },
						{ name: 'Image optimization', done: true },
					],
					dueDate: '2024-02-15',
				},
				{
					id: 8,
					status: 'toDo',
					category: 4,
					title: 'Accessibility Audit',
					description:
						'Conduct accessibility audit to ensure website is accessible to all users.',
					assignedTo: ['Kamilla Morgentau', 'Mike Skinner', 'Bernd Steinemann'],
					priority: 2,
					subtasks: [
						{ name: 'Check for ARIA compliance', done: false },
						{ name: 'Test with screen readers', done: false },
						{ name: 'Ensure keyboard navigation', done: false },
					],
					dueDate: '2024-03-06',
				},
			],
		},
		{
			isRegistered: true,
			isLoggedIn: false,
			userData: {
				name: 'Bernd Steinemann',
				phone: '(606) 659-4325',
				email: 'steinemann83@mail.com',
			},
			color: '#2dab6c',
			tasks: [
				{
					id: 9,
					status: 'inProgress',
					category: 3,
					title: 'Responsive Design Implementation',
					description:
						'Implement responsive design for better usability on mobile devices.',
					assignedTo: ['Bernd Steinemann', 'Mike Skinner', 'Bernd Steinemann'],
					priority: 1,
					subtasks: [
						{ name: 'Create mobile-friendly layouts', done: false },
						{ name: 'Optimize images for mobile', done: true },
						{ name: 'Test on various devices', done: false },
					],
					dueDate: '2024-04-12',
				},
				{
					id: 10,
					status: 'done',
					category: 2,
					title: 'Front-End Bug Fixing',
					description: 'Identify and fix bugs in the front-end codebase.',
					assignedTo: ['Kamilla Morgentau', 'Bernd Steinemann'],
					priority: 3,
					subtasks: [
						{ name: 'Debug JavaScript errors', done: true },
						{ name: 'Fix CSS layout issues', done: false },
					],
					dueDate: '2024-03-06',
				},
				{
					id: 11,
					status: 'toDo',
					category: 4,
					title: 'Code Refactoring',
					description:
						'Refactor front-end codebase for improved readability and maintainability.',
					assignedTo: ['Bernd Steinemann'],
					priority: 2,
					subtasks: [
						{ name: 'Identify code duplication', done: false },
						{ name: 'Rewrite complex functions', done: false },
						{ name: 'Document code changes', done: false },
					],
					dueDate: '2024-02-26',
				},
			],
		},
		{
			isRegistered: true,
			isLoggedIn: false,
			userData: {
				name: 'Sophia Kostas',
				phone: '(264) 911-2395',
				email: 's.kostas84@mail.com',
			},
			color: '#6E52FF',
			tasks: [
				{
					id: 12,
					status: 'inProgress',
					category: 3,
					title: 'CSS Animation Implementation',
					description:
						'Implement CSS animations to enhance user interface interactions.',
					assignedTo: ['Bernd Steinemann', 'Sophia Kostas', 'Mike Skinner'],
					priority: 1,
					subtasks: [
						{ name: 'Identify elements for animation', done: false },
						{ name: 'Write CSS animation rules', done: false },
						{ name: 'Test animations across browsers', done: false },
					],
					dueDate: '2024-03-02',
				},
				{
					id: 13,
					status: 'done',
					category: 2,
					title: 'Front-End Performance Monitoring',
					description:
						'Monitor front-end performance metrics and identify areas for improvement.',
					assignedTo: ['Sophia Kostas'],
					priority: 3,
					subtasks: [
						{ name: 'Set up performance monitoring tools', done: true },
						{ name: 'Analyze page load times', done: false },
					],
					dueDate: '2024-04-04',
				},
				{
					id: 14,
					status: 'toDo',
					category: 4,
					title: 'User Interface Enhancement',
					description:
						'Enhance user interface design to improve user experience.',
					assignedTo: ['Sophia Kostas', 'Ahmed Al-Farsi'],
					priority: 2,
					dueDate: '2024-02-25',
				},
			],
		},
	],

	contacts: [
		{
			userData: {
				name: 'Sophia Kostas',
				phone: '(264) 911-2395',
				email: 's.kostas84@mail.com',
			},
			color: '#6E52FF',
		},
		{
			userData: {
				name: 'Bernd Steinemann',
				phone: '(606) 659-4325',
				email: 'steinemann83@mail.com',
			},
			color: '#2dab6c',
		},
		{
			userData: {
				name: 'Gerd Förster',
				phone: '(606) 200-4805',
				email: 'g.foerster86@gmail.com',
				password: 'pw1234',
			},
			color: '#00BEE8',
		},
		{
			userData: {
				name: 'Kamilla Morgentau',
				phone: '(741) 762-6527',
				email: 'k.morgentau@gmail.com',
				password: 'pw1234',
			},
			color: '#b83c3c',
		},
		{
			userData: {
				name: 'Mike Skinner',
				phone: '(758) 519-1073',
				email: 'm.skinner89@gmail.com',
				password: 'pw1234',
			},

			color: '#659c2b',
		},
		{
			userData: {
				name: 'Ahmed Al-Farsi',
				phone: '(353) 365-9874',
				email: 'a.alfarsi89@mail.com',
			},
			color: '#9747FF',
		},
		{
			userData: {
				name: 'Lindsay Orn',
				phone: '(079) 862-6516',
				email: 'lorn99@mail.com',
			},
			color: '#687fc4',
		},
		{
			userData: {
				name: 'Annetta Grant',
				phone: '(778) 560-8034',
				email: 'a.grant@mail.com',
			},
			color: '#FC71FF',
		},
		{
			userData: {
				name: 'Henna Yilmaz',
				phone: '(494) 694-8019',
				email: 'h.yilmaz79@gmail.com',
			},
			color: '#FF4646',
		},
		{
			userData: {
				name: 'Joey Kub',
				phone: '(227) 955-4546',
				email: 'jokub74@mail.com',
			},
			color: '#FF5EB3',
		},
		{
			userData: {
				name: 'Pascale Feeney',
				phone: '(830) 099-6852',
				email: 'pas.feeney@mail.com',
			},
			color: '#FF745E',
		},
		{
			userData: {
				name: 'Lea Stamm',
				phone: '(004) 386-7068',
				email: 'lea.stamm98@gmail.com',
			},
			color: '#FF7A00',
		},
		{
			userData: {
				name: 'Tess Moore',
				phone: '(549) 753-7594',
				email: 't.moore99@gmail.com',
			},
			color: '#FFA35E',
		},
		{
			userData: {
				name: 'Jazmyn Tremblay',
				phone: '(866) 844-0133',
				email: 'j.tremblay92@mail.com',
			},
			color: '#FFBB2B',
		},
		{
			userData: {
				name: 'George Kozey',
				phone: '(176) 842-2961',
				email: 'ge-ko@mail.com',
			},
			color: '#FFC701',
		},
		{
			userData: {
				name: 'Hasan Demir',
				phone: '(733) 649-6102',
				email: 'hasan.demir81@mail.com',
			},
			color: '#9c8900',
		},
		{
			userData: {
				name: 'Kjelt Becker',
				phone: '(484) 742-4202',
				email: 'k.becker@gmail.com',
			},
			color: '#61c39d',
		},
		{
			userData: {
				name: 'Gene Ward',
				phone: '(876) 110-8650',
				email: 'g.ward@gmail.com',
			},
			color: '#1dab93',
		},
	],
};

let loginData = [];

async function storeLoginData() {
	await setItem('LogInData', JSON.stringify(loginData));
}
/**
 * Stores the start data in local storage.
 */
function storeStartData() {
	setItem('startData', JSON.stringify(startData));
}
async function getData() {
	await getItem('startData');
}
let spezLogInData = [];
async function storeSpezLogInData() {
	await setItem('LogInData', JSON.stringify(spezLogInData));
}
