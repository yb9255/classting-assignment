import { screen, render, waitFor } from '../../test-utils';
import { BarChart } from '../BarChart';
import { Data } from '../BarChart/types';

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
  it('shows different bar size if value is different', async () => {
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

  it("it's biggest axis Y value is biggest data value", () => {
    render(<BarChart data={mockChartData} />);

    const maxAxisY = screen.getByText('6');
    const overMaxAxisY = screen.queryByText('7');

    expect(maxAxisY).toBeInTheDocument();
    expect(overMaxAxisY).not.toBeInTheDocument();
  });
});
