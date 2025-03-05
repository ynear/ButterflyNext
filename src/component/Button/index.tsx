import React, { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

const Button: React.FC<Props> = ({
  title,
  className,
  ...otherProps
}: Props) => {
  return (
    <button className={`${styles.button} ${className || ""}`} {...otherProps}>
      {title}
    </button>
  );
};

export default Button;
