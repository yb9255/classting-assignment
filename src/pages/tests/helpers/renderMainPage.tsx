import { render, screen, waitFor } from '../../../utils/test/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import MainPage from '../../MainPage';

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

export default renderMainPage;
