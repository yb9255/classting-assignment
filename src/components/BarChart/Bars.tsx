import { AxisBottomProps } from './AxisBottom';
import { AxisLeftProps } from './AxisLeft';
import { BarChartProps } from './BarChart';

type BarsProps = {
  data: BarChartProps['data'];
  height: number;
  scaleX: AxisBottomProps['scale'];
  scaleY: AxisLeftProps['scale'];
};

function Bars({ data, height, scaleX, scaleY }: BarsProps) {
  return (
    <>
      {data.map(({ value, label }) => (
        <rect
          key={`bar-${label}`}
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
