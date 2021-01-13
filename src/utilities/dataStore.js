export const qBank = [
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '0990996',
  },
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '093909',
  },
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '009039',
  },
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '090089',
  },
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '01010101',
  },
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '092299',
  },
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '986709999',
  },
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '222099EAS',
  },
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '2222099',
  },
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '09922099',
  },
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '222292099',
  },
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '0998999099',
  },
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '09909999343',
  },
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '09909999999999',
  },
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '0990999999943',
  },
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '09459099',
  },
  {
    question: 'how build the app ?',
    answers: ['vinayak', 'sarthak', 'somil', 'devesh'],
    correct: 'vinayak',
    questionId: '0912219099',
  },
];

// n = 5 to export 5 question
export const getQuestion = (n = 5) =>
  Promise.resolve(qBank.sort(() => 0.5 - Math.random()).slice(0, n));
//   Freezing objects
const users = [
  {
    _id: '5c8a1d5b0190b214360dc057',
    name: 'Jonas Schmedtmann',
    email: 'admin@natours.io',
    role: 'admin',
    password: '123456',
  },
  {
    _id: '5c8a1dfa2f8fb814b56fa181',
    name: 'Lourdes Browning',
    email: 'loulou@example.com',
    role: 'user',
    password: '123456',
  },
  {
    _id: '5c8a1e1a2f8fb814b56fa182',
    name: 'Sophie Louise Hart',
    email: 'sophie@example.com',
    role: 'user',
    password: '123456',
  },
];

export const UsersDB = Object.freeze(users)
