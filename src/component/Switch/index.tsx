"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";

type Props = {
  enable: boolean;
  onChange: (value: boolean) => void;
};

const Switch: React.FC<Props> = ({ enable, onChange }: Props) => {
  const [value, setValue] = useState(enable);

  return (
    <div
      className={`${styles.switch} ${value ? styles.enable : ""}`}
      onClick={() => {
        const newValue = !value;
        setValue(newValue);
        onChange(newValue);
      }}
    >
      <div className="box">
        <div />
      </div>
    </div>
  );
};

export default Switch;
