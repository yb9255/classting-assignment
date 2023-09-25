import { screen } from '@testing-library/react';
import { renderMainPage } from './helpers';
import { decodeHtmlString } from '../../helpers';
import { Route } from 'react-router-dom';
import QuestionsPage from '../QuestionsPage';

describe('MainPage', () => {
  it('shows main title', () => {
    const { getMainPageTitleHeading } = renderMainPage();

    const mainPageTitleHeading = getMainPageTitleHeading();
    expect(mainPageTitleHeading).toBeInTheDocument();
  });

  it('shows main button', () => {
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
});
