import { rest } from 'msw';
import { DB_API_URL } from './constants';

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
          {
            category: 'Entertainment: Video Games',
            type: 'multiple',
            difficulty: 'medium',
            question:
              'When was Chapter 1 of the Source Engine mod &quot;Underhell&quot; released?',
            correct_answer: 'September 1st, 2013',
            incorrect_answers: [
              'March 3rd, 2011',
              'September 12th, 2013',
              'October 2nd, 2012',
            ],
          },
          {
            category: 'Entertainment: Music',
            type: 'multiple',
            difficulty: 'medium',
            question:
              'Which iconic album cover features the pulsar waves of CP 1919 placed in the center of the cover?',
            correct_answer: 'Unknown Pleasures',
            incorrect_answers: [
              'The Dark Side of the Moon',
              'London Calling',
              'The Velvet Underground &amp; Nico',
            ],
          },
          {
            category: 'Entertainment: Video Games',
            type: 'multiple',
            difficulty: 'medium',
            question:
              'What was the first game ever released that ran on the Source engine?',
            correct_answer: 'Counter-Strike: Source',
            incorrect_answers: [
              'Half-Life 2',
              'Garry&#039;s Mod',
              'Team Fortress 2',
            ],
          },
          {
            category: 'Entertainment: Japanese Anime & Manga',
            type: 'multiple',
            difficulty: 'easy',
            question:
              'What caused the titular mascot of Yo-Kai Watch, Jibanyan, to become a yokai?',
            correct_answer: 'Being run over by a truck',
            incorrect_answers: [
              'Ate one too many chocobars',
              'Through a magical ritual',
              'When he put on the harmaki',
            ],
          },
          {
            category: 'Entertainment: Film',
            type: 'multiple',
            difficulty: 'easy',
            question:
              'What was the first feature-length computer-animated movie?',
            correct_answer: 'Toy Story',
            incorrect_answers: ['Tron', 'Lion king', '101 Dalmatians'],
          },
          {
            category: 'Mythology',
            type: 'multiple',
            difficulty: 'medium',
            question: 'What is the name of the Greek god of peaceful deaths?',
            correct_answer: 'Thanatos',
            incorrect_answers: ['Tartarus', 'Hades', 'Moros'],
          },
          {
            category: 'Entertainment: Video Games',
            type: 'multiple',
            difficulty: 'hard',
            question: 'Which retro video game was released first?',
            correct_answer: 'Space Invaders',
            incorrect_answers: ['Galaga', 'Pac-Man', 'Asteroids'],
          },
          {
            category: 'Entertainment: Video Games',
            type: 'multiple',
            difficulty: 'easy',
            question:
              'In the survival horror game, &quot;Cry of Fear,&quot; what was the name of Simon&#039;s close friend/potential love interest?',
            correct_answer: 'Sophie',
            incorrect_answers: ['Olivia', 'Jessica', 'Alice'],
          },
        ],
      })
    );
  }),
];
