import React from "react";

type Props = { size: string; color: string; className?: string };

const Triangle: React.FC<Props> = ({ size, color, className = "" }: Props) => {
  return (
    <div
      style={{
        width: 0,
        height: 0,
        borderTop: `${size} solid ${color}`,
        borderRight: `${size} solid transparent`,
        borderLeft: `${size} solid transparent`,
        boxSizing: "border-box",
      }}
      className={className}
    />
  );
};

export default Triangle;
