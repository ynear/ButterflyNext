"use client";
import React from "react";
import styles from "./styles.module.scss";

type Props = {
  checked: boolean;
  title: string;
  onChange: (value: boolean) => void;
};

const Radio: React.FC<Props> = ({ checked, title, onChange }: Props) => {
  return (
    <div
      className={`${styles.radio} ${checked ? styles.active : ""}`}
      onClick={() => {
        onChange(!checked);
      }}
    >
      <div>
        <span></span>
      </div>
      {title}
    </div>
  );
};

export default Radio;
