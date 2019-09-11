import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  display: inline-block;
`;

export default function Logo({ size }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 38.8057C12 76.4163 137.597 123.063 128.532 141.259C119.467 159.455 49.1605 122.007 49.1605 84.3963C49.1605 46.7856 109.773 -14.5451 119.467 11.0792C131.727 43.4867 12 1.19501 12 38.8057Z"
        stroke="white"
        strokeWidth="12"
        strokeLinejoin="bevel"
      />
    </Svg>
  );
}
