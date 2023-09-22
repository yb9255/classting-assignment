import { type ScaleLinear, axisLeft, select } from 'd3';
import { useEffect, useRef } from 'react';

export type AxisLeftProps = {
  scale: ScaleLinear<number, number, never>;
};

function AxisLeft({ scale }: AxisLeftProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale));
    }
  }, [scale]);

  return <g ref={ref} />;
}

export default AxisLeft;
