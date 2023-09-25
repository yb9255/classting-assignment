import type { BarsProps } from './types';

function Bars({ data, scaleX, scaleY }: BarsProps) {
  return (
    <>
      {data.map(({ label }) => (
        <rect
          key={`bar-${label}`}
          role={`${label}`}
          x={scaleX(label)}
          width={scaleX.bandwidth()}
          fill={label === '정답' ? 'blue' : 'red'}
        />
      ))}
    </>
  );
}

export default Bars;
