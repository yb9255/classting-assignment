import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen, render } from '../../test-utils';
import MainPage from '../MainPage';

describe('MainPage', () => {
  it('shows main title', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </MemoryRouter>
    );

    const mainTitle = screen.getByRole('heading', { name: '영화 퀴즈' });
    expect(mainTitle).toBeInTheDocument();
  });

  it('shows main button', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </MemoryRouter>
    );

    const mainButton = screen.getByRole('link', { name: '시작하기' });
    expect(mainButton).toBeInTheDocument();
  });
});
