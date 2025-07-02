import { ReactNode } from 'react';
import useDimensions from 'react-use-dimensions';

interface DimensionsProviderProps {
  children: (dimensions: { containerWidth: number | undefined; containerHeight: number | undefined }) => ReactNode;
}

export const DimensionsProvider = (props: DimensionsProviderProps) => {
  const [ref, { width, height }] = useDimensions();
  return (
    <div ref={ref}>
      {props.children({
        containerWidth: width,
        containerHeight: height,
      })}
    </div>
  );
};
