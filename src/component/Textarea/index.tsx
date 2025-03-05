"use client";
import React, { TextareaHTMLAttributes } from "react";
import styles from "./styles.module.scss";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, ...otherProps }: Props, ref) => {
    return (
      <textarea
        ref={ref}
        {...otherProps}
        className={`${styles.textarea} ${className || ""}`}
      />
    );
  }
);

export default Textarea;
