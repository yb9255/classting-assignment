import type { BarsProps } from './types';

function Bars({ data, height, scaleX, scaleY }: BarsProps) {
  return (
    <>
      {data.map(({ value, label }) => (
        <rect
          key={`bar-${label}`}
          role={`${label}`}
          x={scaleX(label)}
          y={scaleY(value)}
          width={scaleX.bandwidth()}
          height={height - scaleY(value)}
          fill={label === '정답' ? 'blue' : 'red'}
        />
      ))}
    </>
  );
}

export default Bars;
