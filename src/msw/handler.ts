import { rest } from 'msw';
import { DB_API_URL } from '../constants';

export const handlers = [
  rest.get(DB_API_URL, (_, response, context) => {
    return response(
      context.json({
        response_code: 0,
        results: [
          {
            category: 'Entertainment: Video Games',
            type: 'multiple',
            difficulty: 'hard',
            question:
              'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?',
            correct_answer: 'The Lead Programmer&#039;s birthday',
            incorrect_answers: [
              'The first release date of &quot;Sonic the Hedgehog&quot;',
              'The date Sonic Team was founded',
              'The first release date of &quot;Sonic the Hedgehog 2&quot;',
            ],
          },
          {
            category: 'Entertainment: Music',
            type: 'multiple',
            difficulty: 'medium',
            question:
              'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.',
            correct_answer: 'Hurt',
            incorrect_answers: ['Closer', 'A Warm Place', 'Big Man with a Gun'],
          },
        ],
      })
    );
  }),
];
