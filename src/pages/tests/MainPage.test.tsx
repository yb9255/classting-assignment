import { Route } from 'react-router-dom';
import { screen, render } from '../../test-utils';
import MainPage from '../MainPage';

describe('MainPage', () => {
  it('shows main title', () => {
    render(<Route path="/" element={<MainPage />} />);

    const mainTitle = screen.queryByRole('heading', { name: '영화 퀴즈' });
    expect(mainTitle).toBeInTheDocument();

    const mainButton = screen.queryByRole('button', { name: '시작' });
    expect(mainButton).toBeInTheDocument();
  });
});
