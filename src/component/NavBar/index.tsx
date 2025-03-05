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
    routePath === RoutePath.HOME.path
      ? pathname === RoutePath.HOME.path
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
      <NavBarItem routePath={RoutePath.HOME.path} icon="Home" title="主页" />
      <NavBarItem
        routePath={RoutePath.INTRUDER.path}
        icon="Intruder"
        title="入侵"
      />
      <NavBarItem
        routePath={RoutePath.DICTIONARY.path}
        icon="Dictionary"
        title="字典"
      />
      <NavBarItem
        routePath={RoutePath.DECODER.path}
        icon="Decoder"
        title="加解密"
      />
      <NavBarItem
        routePath={RoutePath.OTHERTOOLS.path}
        icon="Tool"
        title="其他工具"
      />
      <div style={{ width: "100%", height: "100%", flex: 1 }}></div>
      <NavBarItem
        routePath={RoutePath.SETTINGS.path}
        icon="Settings"
        title="设置"
      />
    </div>
  );
};

export default NavBar;
