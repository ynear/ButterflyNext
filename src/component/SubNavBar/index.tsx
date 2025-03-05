"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import styles from "./styles.module.scss";

type Props = {
  routerTemplate: {
    path: string;
    childs: readonly {
      title: string;
      path: string;
    }[];
  };
};

const SubNavBar: React.FC<Props> = ({ routerTemplate }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={styles.toolList}>
      {routerTemplate.childs.map((item) => {
        const itemPath = `${routerTemplate.path}/${item.path}`;
        const active = pathname === itemPath;
        return (
          <div
            key={item.path}
            className={`${styles.toolItem} ${active ? styles.active : ""}`}
            onClick={() => router.push(itemPath)}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default SubNavBar;
