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
    name: 'Mike Skinner',
    phone: '(758) 519-1073',
    email: 'm.skinner89@gmail.com',
    password: 'pw1234',
    color: '#659c2b',
    isRegistered: true,
    isLoggedIn: true,
    userData: {
      name: 'Mike Skinner',
      email: 'm.skinner89@gmail.com',
      password: 'pw1234',
    },
    tasks: [
      {
        // status 1 = In Progress
        status: 1,

        // category 1 = User Story
        category: 1,

        title: 'Daily Kochwelt Recipe',
        description: 'Build start page with recipe recommendation...',
        assignedTo: ['Gene Ward', 'Kjelt Becker'],

        // priority 2 = medium
        priority: 2,

        subtasks: [
          { name: 're-design Mockup', done: false },
          { name: 'update incredient calculator', done: false },
        ],
        duedate: '20.02.2024',
      },
      {
        status: 3,

        title: 'HTML Base Template Creation',
        description: 'Create reusable HTML base templates...',
        subtasks: [
          { name: 'set up basic html structure', done: true },
          { name: 'usage of standard cssclasses', done: true },
        ],
        assignedTo: ['Gene Ward', 'Kjelt Becker', 'Hasan Demir'],
        priority: 1,
        status: 3,
        duedate: '14.02.2024',
      },
    ],
  },
  {
    name: 'Kamilla Morgentau',
    phone: '(741) 762-6527',
    email: 'k.morgentau@gmail.com',
    color: '#0038FF',
  },
  {
    name: 'Gerd Förster',
    phone: '(606) 200-4805',
    email: 'g.foerster86@gmail.com',
    color: '#00BEE8',
  },
  {
    name: 'Bernd Steinemann',
    phone: '(606) 659-4325',
    email: 'steinemann83@mail.com',
    color: '#1FD7C1',
  },
  {
    name: 'Sophia Kostas',
    phone: '(264) 911-2395',
    email: 's.kostas84@mail.com',
    color: '#6E52FF',
  },
  {
    name: 'Ahmed Al-Farsi',
    phone: '(353) 365-9874',
    email: 'a.alfarsi89@mail.com',
    color: '#9747FF',
  },
  {
    name: 'Lindsay Orn',
    phone: '(079) 862-6516',
    email: 'lorn99@mail.com',
    color: '#687fc4',
  },
  {
    name: 'Annetta Grant',
    phone: '(778) 560-8034',
    email: 'a.grant@mail.com',
    color: '#FC71FF',
  },
  {
    name: 'Henna Yilmaz',
    phone: '(494) 694-8019',
    email: 'h.yilmaz79@gmail.com',
    color: '#FF4646',
  },
  {
    name: 'Joey Kub',
    phone: '(227) 955-4546',
    email: 'jokub74@mail.com',
    color: '#FF5EB3',
  },
  {
    name: 'Pascale Feeney',
    phone: '(830) 099-6852',
    email: 'pas.feeney@mail.com',
    color: '#FF745E',
  },
  {
    name: 'Lea Stamm',
    phone: '(004) 386-7068',
    email: 'lea.stamm98@gmail.com',
    color: '#FF7A00',
  },
  {
    name: 'Tess Moore',
    phone: '(549) 753-7594',
    email: 't.moore99@gmail.com',
    color: '#FFA35E',
  },
  {
    name: 'Jazmyn Tremblay',
    phone: '(866) 844-0133',
    email: 'j.tremblay92@mail.com',
    color: '#FFBB2B',
  },
  {
    name: 'George Kozey',
    phone: '(176) 842-2961',
    email: 'ge-ko@mail.com',
    color: '#FFC701',
  },
  {
    name: 'Hasan Demir',
    phone: '(733) 649-6102',
    email: 'hasan.demir81@mail.com',
    color: '#9c8900',
  },
  {
    name: 'Kjelt Becker',
    phone: '(484) 742-4202',
    email: 'k.becker@gmail.com',
    color: '#61c39d',
  },
  {
    name: 'Gene Ward',
    phone: '(876) 110-8650',
    email: 'g.ward@gmail.com',
    color: '#1dab93',
  },
  {
    name: 'Howard Stern',
    phone: '(516) 1256-8652',
    email: 'stern.h@gmail.com',
    color: '#FFC300',
  },
];

/**
 * Stores the start data in local storage.
 */
function storeStartData() {
  setItem('startData', JSON.stringify(startData));
}
