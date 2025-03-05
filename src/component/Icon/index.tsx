import Image from "next/image";
import React from "react";

const IconMap = {
  Close: "/svg/close.svg",
  Comparer: "/svg/comparer.svg",
  Decoder: "/svg/decoder.svg",
  Dictionary: "/svg/dict.svg",
  Home: "/svg/home.svg",
  Intruder: "/svg/intruder.svg",
  Note: "/note.svg",
  Output: "/svg/output.svg",
  Project: "/svg/project.svg",
  Settings: "/svg/settings.svg",
  Tool: "/svg/tool.svg",
} as const;

const SVGSizes = {
  xs: 20,
  sm: 24,
  md: 28,
  lg: 44,
  xl: 72,
} as const;

export type IconName = keyof typeof IconMap;
export type IconSize = keyof typeof SVGSizes;

type Props = {
  name: IconName;
  size: IconSize;
  color?: string;
};

const Icon: React.FC<Props> = ({ name, size, color = "#000" }: Props) => {
  const path = IconMap[name];
  const svgSize = SVGSizes[size];
  return (
    <div
      style={{
        width: svgSize,
        height: svgSize,
        overflow: "hidden",
        textIndent: -svgSize,
      }}
    >
      <Image
        src={path}
        alt={name}
        width={svgSize}
        height={svgSize}
        priority
        style={{ filter: `drop-shadow(${svgSize}px 0px ${color})` }}
      />
    </div>
  );
};

export default Icon;
