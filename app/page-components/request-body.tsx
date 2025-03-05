import React from "react";
import { IntruderOptions } from "~/constant/intruder";
import styles from "../page.module.scss";

type Props = {
  intruderOptions: IntruderOptions;
};

const RequestBody: React.FC<Props> = ({}: Props) => {
  return <div className={styles.requestContent}></div>;
};

export default RequestBody;
