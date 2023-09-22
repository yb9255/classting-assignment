import { screen, render } from '@testing-library/react';
import type { Data } from '../BarChart/types';
import { BarChart } from '../BarChart';

const DATA: Data[] = [
  { label: '정답', value: 5 },
  { label: '오답', value: 3 },
];

describe('BarChart', () => {
  it('shows different bar chart length', () => {
    render(<BarChart data={DATA} />);

    const correctAnswerBar = screen.getByRole('bar-정답');
    const wrongAnswerBar = screen.getByRole('bar-오답');

    expect(correctAnswerBar.getAttribute('height')).not.toBe(
      wrongAnswerBar.getAttribute('height')
    );
  });
});
