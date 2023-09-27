import { render, screen, waitFor } from '../utils/test/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import MainPage from './Main';
import QuestionsPage from './Questions';
import { decodeHtmlString } from '../utils';
import WrongAnsweredQuestionsPage from './WrongAnsweredQuestions';

describe('MainPage', () => {
  it('shows main title', () => {
    const { getMainPageTitleHeading } = renderMainPage();

    const mainPageTitleHeading = getMainPageTitleHeading();
    expect(mainPageTitleHeading).toBeInTheDocument();
  });

  it('shows quiz start button', () => {
    const { getMainPageStartLink } = renderMainPage();

    const mainPageStartLink = getMainPageStartLink();
    expect(mainPageStartLink).toBeInTheDocument();
  });

  it("shows first question when user clicks '퀴즈 풀기' link", async () => {
    const { getMainPageStartLink, waitForUserClick } = renderMainPage({
      otherRoutes: [
        <Route
          path="/questions"
          key="/questions"
          element={<QuestionsPage />}
        />,
      ],
    });

    const mainPageStartLink = getMainPageStartLink();

    await waitForUserClick(mainPageStartLink);

    const firstQuestionTitleHeading = await screen.findByText(
      decodeHtmlString(
        'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
      ),
      {
        exact: false,
      }
    );

    expect(firstQuestionTitleHeading).toBeInTheDocument();
  });

  it('shows link to WrongAnsweredQuestions page, and move to that page when user clicks it', async () => {
    const { getWrongAnsweredQuestionsPageLink, waitForUserClick } =
      renderMainPage({
        otherRoutes: [
          <Route
            path="/wrong-answered-questions"
            key="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />,
        ],
      });

    const wrongAnsweredQuestionsPageLink = getWrongAnsweredQuestionsPageLink();
    expect(wrongAnsweredQuestionsPageLink).toBeInTheDocument();

    await waitForUserClick(wrongAnsweredQuestionsPageLink);

    const wrongAnsweredQuestionsPageHeading = await screen.findByRole(
      'heading',
      { name: '오답 노트' }
    );

    expect(wrongAnsweredQuestionsPageHeading).toBeInTheDocument();
  });
});

type Props = {
  initialEntries?: string[];
  otherRoutes?: ReactElement[];
};

function renderMainPage({ initialEntries = ['/'], otherRoutes }: Props = {}) {
  const user = userEvent.setup();

  render(
    <>
      <div id="overlay-root" />
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {otherRoutes && otherRoutes.map((route) => route)}
        </Routes>
      </MemoryRouter>
    </>
  );

  const getMainPageTitleHeading = () =>
    screen.getByRole('heading', { name: '영화 퀴즈' });

  const getMainPageStartLink = () =>
    screen.getByRole('link', { name: '퀴즈 풀기' });

  const getWrongAnsweredQuestionsPageLink = () =>
    screen.getByRole('link', { name: '오답 노트' });

  const waitForUserClick = async (targetElement: Element) => {
    await waitFor(async () => {
      await user.click(targetElement);
    });
  };

  return {
    getMainPageTitleHeading,
    getMainPageStartLink,
    getWrongAnsweredQuestionsPageLink,
    waitForUserClick,
  };
}
