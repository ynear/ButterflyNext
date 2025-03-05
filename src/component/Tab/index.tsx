"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

type Item = { id: string; name: string };
type Props = {
  data: Item[];
  size?: "small" | "large";
  onChange: (value: Item) => void;
};

const Tab: React.FC<Props> = ({ data, size = "small", onChange }: Props) => {
  const [active, setActive] = useState(0);
  const [activeBarWidth, setActiveBarWidth] = useState(0);
  const [activeTranslateX, setActiveTranslateX] = useState(0);
  const listBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listBoxRef.current;
    const firstItem = list?.children[0];
    const firstItemWidth = firstItem?.scrollWidth || 0;
    setActive(0);
    setActiveBarWidth(firstItemWidth);
    setActiveTranslateX(0);
  }, []);

  const onClick = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      item: Item,
      idx: number
    ) => {
      setActive(idx);
      onChange(item);
      const target = e.currentTarget;
      setActiveBarWidth(target.offsetWidth);
      setActiveTranslateX(target.offsetLeft);
    },
    []
  );
  return (
    <div className={styles.tabList} ref={listBoxRef}>
      {data.map((item, idx) => (
        <div
          key={idx}
          className={`${styles.tabItem} ${
            size === "small" ? styles.smallTabItem : ""
          } ${active === idx ? styles.activeTabItem : ""}  `}
          onClick={(e) => onClick(e, item, idx)}
        >
          <div className="text">{item.name}</div>
          <div
            className={`click-style ${
              active === idx ? styles.activeClickStyle : ""
            }`}
          />
        </div>
      ))}
      <div
        className={styles.activeBar}
        style={{
          width: activeBarWidth,
          transform: `translateX(${activeTranslateX}px)`,
        }}
      />
    </div>
  );
};

export default Tab;
