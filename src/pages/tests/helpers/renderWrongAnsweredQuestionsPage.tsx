import { render, screen, waitFor } from '../../../test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { WrongAnsweredQuestionsPage } from '../../WrongAnsweredQuestionsPage';
import { decodeHtmlString } from '../../../helpers';

type Props = {
  initialEntries?: string[];
};

function renderWrongAnsweredQuestionsPage({
  initialEntries = ['/wrong-answered-questions'],
}: Props = {}) {
  const user = userEvent.setup();

  render(
    <>
      <div id="overlay-root" />
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    </>
  );

  const getWrongAnsweredQuestionHeading = () =>
    screen.getByRole('heading', { name: '오답 노트' });

  const getFirstQuestionTitleDiv = () =>
    screen.getByText(
      decodeHtmlString(
        'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
      ),
      { exact: false }
    );

  const getSecondQuestionTitleDiv = () =>
    screen.getByText(
      decodeHtmlString(
        'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
      ),
      { exact: false }
    );

  const getChosenAnswerDivList = () =>
    screen.getAllByText(`선택한 오답: `, {
      exact: false,
    });

  const getCorrectAnswerDivList = () =>
    screen.getAllByText('정답:', { exact: false });

  const getTotalAnswersList = () => screen.getAllByRole('listitem');

  const getNoWrongAnsweredQuestionHeading = () =>
    screen.getByRole('heading', {
      name: '오답 기록이 없습니다.',
    });

  const getWrongAnsweredQuestionTitleList = () =>
    screen.getAllByText('문제', {
      exact: false,
    });

  const getPrevButton = () => screen.getByRole('button', { name: '<' });
  const getNextButton = () => screen.getByRole('button', { name: '>' });

  const findWrongAnsweredQuestionTitleList = () =>
    screen.findAllByText('문제', {
      exact: false,
    });

  const waitForUserClick = async (targetElement: Element) => {
    await waitFor(async () => {
      await user.click(targetElement);
    });
  };

  return {
    getWrongAnsweredQuestionHeading,
    getFirstQuestionTitleDiv,
    getSecondQuestionTitleDiv,
    getChosenAnswerDivList,
    getCorrectAnswerDivList,
    getTotalAnswersList,
    getNoWrongAnsweredQuestionHeading,
    getWrongAnsweredQuestionTitleList,
    getPrevButton,
    getNextButton,
    findWrongAnsweredQuestionTitleList,
    waitForUserClick,
  };
}

export default renderWrongAnsweredQuestionsPage;
