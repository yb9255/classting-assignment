import type { ScaleBand, ScaleLinear } from 'd3';

export type Data = {
  label: string;
  value: number;
};

export type AxisLeftProps = {
  scale: ScaleLinear<number, number, never>;
  tickCount: number;
};

export type BarChartProps = {
  data: Data[];
};

export type AxisBottomProps = {
  scale: ScaleBand<string>;
  transform: string;
};

export type BarsProps = {
  data: BarChartProps['data'];
  height: number;
  scaleX: AxisBottomProps['scale'];
  scaleY: AxisLeftProps['scale'];
};
