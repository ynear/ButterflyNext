"use client";
import React, { InputHTMLAttributes, useRef, useState } from "react";
import styles from "./styles.module.scss";

type Props = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | "value"
  | "onChange"
  | "disabled"
  | "type"
  | "min"
  | "max"
  | "placeholder"
  | "readOnly"
> & {
  title?: string;
  error?: boolean;
  className?: string;
};

const Input: React.FC<Props> = ({
  title,
  error = false,
  className = "",
  ...otherProps
}: Props) => {
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`${styles.input} ${
        error ? styles.error : active ? styles.active : ""
      } ${className}`}
      onClick={() => {
        inputRef?.current?.focus();
        setActive(true);
      }}
      onBlur={() => {
        setActive(false);
      }}
      tabIndex={1}
    >
      <input ref={inputRef} {...otherProps} />
      {title ? <div className="layout-placeholder">{title}</div> : null}
      {title ? <div className="title">{title}</div> : null}
    </div>
  );
};

export default Input;
