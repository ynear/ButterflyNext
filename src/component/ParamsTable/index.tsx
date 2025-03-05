"use client";
import React from "react";
import { HeaderParamsItem } from "~/constant/intruder";
import variables from "~/styles/variables.module.scss";
import Icon from "../Icon";
import Switch from "../Switch";
import styles from "./styles.module.scss";

type Props = {
  params: HeaderParamsItem[];
  onChange: (id: string, value: HeaderParamsItem) => void;
  onDelete: (id: string) => void;
};

const ParamsTable: React.FC<Props> = ({
  params,
  onChange,
  onDelete,
}: Props) => {
  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th scope="col">key</th>
            <th scope="col">value</th>
            <th scope="col">enable</th>
          </tr>
        </thead>
        <tbody>
          {params.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <input
                    value={item.key}
                    placeholder="key"
                    onChange={(e) =>
                      onChange(item.id, { ...item, key: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    value={item.value}
                    placeholder="value"
                    onChange={(e) =>
                      onChange(item.id, { ...item, value: e.target.value })
                    }
                  />
                </td>
                {item.key || item.value ? (
                  <td>
                    <Switch
                      enable={item.enable}
                      onChange={(value) =>
                        onChange(item.id, { ...item, enable: value })
                      }
                    />
                    <div className="del" onClick={() => onDelete(item.id)}>
                      <Icon
                        name={"Close"}
                        size={"xs"}
                        color={variables.colorTextDark}
                      />
                    </div>
                  </td>
                ) : (
                  <td />
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ParamsTable;
