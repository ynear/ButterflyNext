"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Button from "~/component/Button";
import Input from "~/component/Input";
import Notification from "~/component/Notification";
import List from "~/component/List";

export default function Home() {
  const [err, setErr] = useState(false);
  return (
    <div className={styles.page}>
      <div>Save and see your changes instantly.</div>
      <Button
        title="test"
        onClick={() => {
          Notification.show({ message: "复制成功!", error: true });
          setErr(!err);
        }}
      ></Button>
      <Input title="test" error={err} />
      <List data={["aaa", "bbb"]} />
    </div>
  );
}
