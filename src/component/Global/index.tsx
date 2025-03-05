"use client";
import React from "react";
import { Notification, notificationRef } from "../Notification";
import styles from "./styles.module.scss";

const Global: React.FC = () => {
  return (
    <>
      <div className={styles.globalTop}></div>
      <div className={styles.globalBottom}>
        <Notification ref={notificationRef} />
      </div>
    </>
  );
};

export default Global;
