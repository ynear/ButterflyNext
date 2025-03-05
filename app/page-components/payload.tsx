import React from "react";
import { IntruderOptions } from "~/constant/intruder";
import styles from "../page.module.scss";

type Props = {
  intruderOptions: IntruderOptions;
};

const Payload: React.FC<Props> = ({}: Props) => {
  return <div className={styles.content}>Payload</div>;
};

export default Payload;
