"use client";
import { useCallback, useMemo, useState } from "react";
import Button from "~/component/Button";
import Tab from "~/component/Tab";
import {
  IntruderOptions,
  IntruderOptionsDefaultValue,
} from "~/constant/intruder";
import AttachType from "./page-components/attack-type";
import Payload from "./page-components/payload";
import Request from "./page-components/request";
import Settings from "./page-components/settings";
import styles from "./page.module.scss";

const TabTypes = {
  type: { id: "type", name: "攻击类型" },
  request: { id: "request", name: "请求" },
  payload: { id: "payload", name: "载荷" },
  options: { id: "options", name: "设置" },
} as const;

export default function Intruder() {
  const [options, setOptions] = useState<IntruderOptions>(
    IntruderOptionsDefaultValue
  );
  const [choose, setChoose] = useState<Values<typeof TabTypes>["id"]>(
    TabTypes.type.id
  );
  const tabs = useMemo(() => Object.values(TabTypes), []);

  const onUpdateAttackType = useCallback(
    (type: IntruderOptions["attackType"]) => {
      setOptions((prevState) => {
        return { ...prevState, attackType: type };
      });
    },
    []
  );

  const onUpdateRequest = useCallback(
    (requestParams: Omit<IntruderOptions, "attackType" | "settings">) => {
      setOptions((prevState) => {
        return {
          ...prevState,
          method: requestParams.method,
          headers: requestParams.headers,
          params: requestParams.params,
        };
      });
    },
    []
  );

  const onUpdateSetting = useCallback(
    (settings: IntruderOptions["settings"]) => {
      setOptions((prevState) => {
        return {
          ...prevState,
          settings,
        };
      });
    },
    []
  );

  return (
    <div className={styles.container}>
      <Button
        className={styles.startBtn}
        title={"开始"}
        onClick={() => console.log(options)}
      />
      <Tab
        size="large"
        data={tabs}
        onChange={(value) =>
          setChoose(value.id as Values<typeof TabTypes>["id"])
        }
      />
      <div className={styles.content}>
        {choose === TabTypes.type.id ? (
          <AttachType
            intruderOptions={options}
            onUpdateAttackType={onUpdateAttackType}
          />
        ) : null}
        {choose === TabTypes.request.id ? (
          <Request
            intruderOptions={options}
            onUpdateRequest={onUpdateRequest}
          />
        ) : null}
        {choose === TabTypes.payload.id ? (
          <Payload intruderOptions={options} />
        ) : null}
        {choose === TabTypes.options.id ? (
          <Settings
            intruderOptions={options}
            onUpdateSetting={onUpdateSetting}
          />
        ) : null}
      </div>
    </div>
  );
}
