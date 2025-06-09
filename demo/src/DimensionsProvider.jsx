import React from 'react';
import useDimensions from 'react-use-dimensions';

const DimensionsProvider = (props) => {
  const [ref, { width, height }] = useDimensions()
  return (
    <div ref={ref}>
      {props.children({
        containerWidth: width,
        containerHeight: height,
      })}
    </div>
  );
}

export default DimensionsProvider;