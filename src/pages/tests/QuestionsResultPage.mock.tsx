import { decodeHtmlString } from '../../helpers';

export const MOCK_CORRECT_ANSWERED_QUESTION_LIST = [
  {
    category: 'Entertainment: Video Games',
    type: 'multiple',
    difficulty: 'hard',
    question: decodeHtmlString(
      'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
    ),
    correctAnswer: decodeHtmlString('The Lead Programmer&#039;s birthday'),
    answers: [
      decodeHtmlString(
        'The first release date of &quot;Sonic the Hedgehog&quot;'
      ),
      decodeHtmlString('The date Sonic Team was founded'),
      decodeHtmlString(
        'The first release date of &quot;Sonic the Hedgehog 2&quot;'
      ),
      decodeHtmlString('The Lead Programmer&#039;s birthday'),
    ],
  },
];

export const MOCK_WRONG_ANSWERED_QUESTION_LIST = [
  {
    category: 'Entertainment: Music',
    type: 'multiple',
    difficulty: 'medium',
    question: decodeHtmlString(
      'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
    ),
    correctAnswer: 'Hurt',
    answers: ['Closer', 'A Warm Place', 'Big Man with a Gun'],
  },
];
