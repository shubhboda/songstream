import React from 'react';

const FluteIcon = ({ size = 24, color = 'currentColor', className = '', strokeWidth = 2, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M3 15l12-12a2 2 0 0 1 2.828 0l3.172 3.172a2 2 0 0 1 0 2.828L9 21H3v-6z" />
    <circle cx="14" cy="6" r="1" />
    <circle cx="11" cy="9" r="1" />
    <circle cx="8" cy="12" r="1" />
    <circle cx="5" cy="15" r="1" />
  </svg>
);

export default FluteIcon;


