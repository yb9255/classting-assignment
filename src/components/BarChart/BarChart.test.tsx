import { screen, render, waitFor } from '../../utils/test/test-utils';
import { BarChart } from '.';
import { Data } from './types';

const mockChartData: Data[] = [
  {
    label: '정답',
    value: 4,
  },
  {
    label: '오답',
    value: 6,
  },
];

describe('BarChart', () => {
  it('정답과 오답 개수가 다른 경우, 각 차트의 바 길이가 다릅니다.', async () => {
    render(<BarChart data={mockChartData} />);

    const correctAnswerBar = screen.getByRole('정답');
    const wrongAnswerBar = screen.getByRole('오답');

    expect(correctAnswerBar).toBeInstanceOf(SVGElement);
    expect(wrongAnswerBar).toBeInstanceOf(SVGElement);

    await waitFor(async () => {
      const correctAnswerBarHeight = Number(
        correctAnswerBar.getAttribute('height')
      );

      const wrongAnswerBarHeight = Number(
        wrongAnswerBar.getAttribute('height')
      );

      expect(correctAnswerBarHeight < wrongAnswerBarHeight).toBe(true);
    });
  });

  it('Y축의 값은 정/오답 개수의 최대 개수를 넘지 않습니다.', () => {
    render(<BarChart data={mockChartData} />);

    const maxAxisY = screen.getByText('6');
    const overMaxAxisY = screen.queryByText('7');

    expect(maxAxisY).toBeInTheDocument();
    expect(overMaxAxisY).not.toBeInTheDocument();
  });
});
