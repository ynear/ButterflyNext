"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Icon, { IconName } from "~/component/Icon";
import { RoutePath } from "~/constant/route";
import variables from "~/styles/variables.module.scss";
import styles from "./styles.module.scss";

type NavBarItemProps = {
  routePath: Values<typeof RoutePath>["path"];
  icon: IconName;
  title: string;
};

const NavBarItem: React.FC<NavBarItemProps> = ({
  routePath,
  icon,
  title,
}: NavBarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const active =
    routePath === RoutePath.INTRUDER.path
      ? pathname === RoutePath.INTRUDER.path
      : pathname.startsWith(routePath);
  const iconColor = active
    ? variables.colorBackground
    : variables.colorTextDark;

  return (
    <div
      className={`${styles.navBarItem} ${active ? styles.active : ""}`}
      onClick={() => router.push(routePath)}
    >
      <Icon name={icon} size={"md"} color={iconColor} />
      <div className="note">{title}</div>
    </div>
  );
};

const NavBar: React.FC = () => {
  return (
    <div className={styles.navBar}>
      <NavBarItem
        routePath={RoutePath.INTRUDER.path}
        icon="Intruder"
        title="Intruder"
      />
    </div>
  );
};

export default NavBar;
