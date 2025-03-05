import React from "react";
import SubNavBar from "~/component/SubNavBar";
import { RoutePath } from "~/constant/route";
import commonStyles from "~/styles/common.module.scss";

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={commonStyles.pageContainer}>
      <SubNavBar routerTemplate={RoutePath.SETTINGS} />
      {children}
    </div>
  );
}
