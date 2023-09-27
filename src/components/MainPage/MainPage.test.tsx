import { render, screen } from '../../utils/test/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    Link: ({ to, children }: { to: string; children: string }) => (
      <a href={to}>{children}</a>
    ),
  };
});

describe('MainPage', () => {
  it("사용자는 메인 페이지에서 타이틀 '영화 퀴즈'를 확인할 수 있다.", () => {
    const { MainPageTitleHeading } = renderMainPage();

    expect(MainPageTitleHeading()).toBeInTheDocument();
  });

  it("사용자는 메인 페이지에서 '퀴즈 풀기' 버튼 링크를 확인할 수 있다.", () => {
    const { MainPageStartLink } = renderMainPage();

    expect(MainPageStartLink()).toBeInTheDocument();
  });

  it("사용자는 메인 페이지에서 '오답 노트' 버튼 링크를 확인할 수 있다.", async () => {
    const { WrongAnsweredQuestionsPageLink } = renderMainPage();

    expect(WrongAnsweredQuestionsPageLink()).toBeInTheDocument();
  });

  it("'퀴즈 풀기' 버튼은 클릭 시 문제 풀이 페이지로 이어지는 링크를 가지고 있다.", async () => {
    const { MainPageStartLink } = renderMainPage();

    expect(MainPageStartLink()).toHaveAttribute('href', '/questions');
  });

  it("'오답 노트' 버튼은 클릭시 오답 노트 페이지로 이어지는 링크를 가지고 있다.", () => {
    const { WrongAnsweredQuestionsPageLink } = renderMainPage();

    expect(WrongAnsweredQuestionsPageLink()).toHaveAttribute(
      'href',
      '/wrong-answered-questions'
    );
  });
});

function renderMainPage() {
  render(
    <>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </MemoryRouter>
    </>
  );

  const MainPageTitleHeading = () =>
    screen.getByRole('heading', { name: '영화 퀴즈' });

  const MainPageStartLink = () =>
    screen.getByRole('link', { name: '퀴즈 풀기' });

  const WrongAnsweredQuestionsPageLink = () =>
    screen.getByRole('link', { name: '오답 노트' });

  return {
    MainPageTitleHeading,
    MainPageStartLink,
    WrongAnsweredQuestionsPageLink,
  };
}
