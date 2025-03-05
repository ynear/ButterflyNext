import React, { useMemo } from "react";
import Select from "~/component/Select";
import { AttackType, IntruderOptions } from "~/constant/intruder";
import styles from "../page.module.scss";

const Payload1 = ["a", "b", "c", "d"];
const Payload2 = ["x", "y", "z"];

type Props = {
  intruderOptions: IntruderOptions;
  onUpdateAttackType: (type: IntruderOptions["attackType"]) => void;
};

const AttachType: React.FC<Props> = ({
  intruderOptions,
  onUpdateAttackType,
}: Props) => {
  const typeList = useMemo(() => Object.values(AttackType), []);

  return (
    <div className={styles.content}>
      <div className={styles.inputBox}>
        <Select
          title={"攻击类型"}
          data={typeList}
          value={{
            id: intruderOptions.attackType,
            name:
              typeList.find((item) => item.id === intruderOptions.attackType)
                ?.name || "",
          }}
          onChange={(value) => {
            onUpdateAttackType(value.id as Values<typeof AttackType>["id"]);
          }}
        />
      </div>
      <div className={styles.introduce}>
        {intruderOptions.attackType === AttackType.Sniper.id ? (
          <div>
            <div className="text">
              只能使用一组<span>payload</span>集合, 每次只替换一个
              <span>payload 标记位置</span>
            </div>
            <div className="example-flag">
              标记位置: <SpanList data={["标记位置1", "标记位置2"]} />
            </div>
            <div className="example-payload">
              攻击载荷: <SpanList data={Payload1} />
            </div>
            <table>
              <tbody>
                <tr>
                  <th scope="col">攻击编号</th>
                  <th scope="col">标记位置1</th>
                  <th scope="col">标记位置2</th>
                </tr>
                <tr>
                  <td>0</td>
                  <td>不替换</td>
                  <td>不替换</td>
                </tr>
                {new Array(Math.min(Payload1.length * 2))
                  .fill("")
                  .map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          {idx < Payload1.length ? (
                            <span>{Payload1[idx % Payload1.length]}</span>
                          ) : (
                            "不替换"
                          )}
                        </td>
                        <td>
                          {idx >= Payload1.length ? (
                            <span>{Payload1[idx % Payload1.length]}</span>
                          ) : (
                            "不替换"
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : null}
        {intruderOptions.attackType === AttackType.BatteringRam.id ? (
          <div>
            <div className="text">
              只能使用一组<span>payload</span>集合, 每次替换所有的
              <span>payload 标记位置</span>
            </div>
            <div className="example-flag">
              标记位置: <SpanList data={["标记位置1", "标记位置2"]} />
            </div>
            <div className="example-payload">
              攻击载荷: <SpanList data={Payload1} />
            </div>
            <table>
              <tbody>
                <tr>
                  <th scope="col">攻击编号</th>
                  <th scope="col">标记位置1</th>
                  <th scope="col">标记位置2</th>
                </tr>
                <tr>
                  <td>0</td>
                  <td>不替换</td>
                  <td>不替换</td>
                </tr>
                {Payload1.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <span>{item}</span>
                      </td>
                      <td>
                        <span>{item}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
        {intruderOptions.attackType === AttackType.Pitchfork.id ? (
          <div>
            <div className="text">
              需要为每个<span>payload 标记位置</span>配置不同的
              <span>payload</span>集合, 每次攻击会取出每个
              <span>payload 标记位置</span>所对应的<span>payload</span>集合,
              直到某个<span>payload</span>集合遍历完
            </div>
            <div className="example-flag">
              标记位置: <SpanList data={["标记位置1", "标记位置2"]} />
            </div>
            <div className="example-payload">
              标记位置1 对应的攻击载荷: <SpanList data={Payload1} />
            </div>
            <div className="example-payload">
              标记位置2 对应的攻击载荷: <SpanList data={Payload2} />
            </div>
            <table>
              <tbody>
                <tr>
                  <th scope="col">攻击编号</th>
                  <th scope="col">标记位置1</th>
                  <th scope="col">标记位置2</th>
                </tr>
                <tr>
                  <td>0</td>
                  <td>不替换</td>
                  <td>不替换</td>
                </tr>
                {new Array(Math.min(Payload1.length, Payload2.length))
                  .fill("")
                  .map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          <span>{Payload1[idx]}</span>
                        </td>
                        <td>
                          <span>{Payload2[idx]}</span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : null}
        {intruderOptions.attackType === AttackType.ClusterBomb.id ? (
          <div>
            <div className="text">
              需要为每个<span>payload 标记位置</span>配置不同的
              <span>payload</span>集合, 攻击会测试
              <span>payload</span>集合的所有排列组合
            </div>
            <div className="example-flag">
              标记位置: <SpanList data={["标记位置1", "标记位置2"]} />
            </div>
            <div className="example-payload">
              标记位置1 对应的攻击载荷: <SpanList data={Payload1} />
            </div>
            <div className="example-payload">
              标记位置2 对应的攻击载荷: <SpanList data={Payload2} />
            </div>
            <table>
              <tbody>
                <tr>
                  <th scope="col">攻击编号</th>
                  <th scope="col">标记位置1</th>
                  <th scope="col">标记位置2</th>
                </tr>
                <tr>
                  <td>0</td>
                  <td>不替换</td>
                  <td>不替换</td>
                </tr>
                {new Array(Math.min(Payload1.length * Payload2.length))
                  .fill("")
                  .map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          <span>{Payload1[idx % Payload1.length]}</span>
                        </td>
                        <td>
                          <span>{Payload2[~~(idx / Payload1.length)]}</span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AttachType;

type SpanListProps = {
  data: string[];
};

const SpanList: React.FC<SpanListProps> = ({ data }: SpanListProps) => {
  return (
    <>
      {new Array(Math.min(data.length * 2 - 1)).fill("").map((item, idx) => {
        const isInterval = idx % 2 > 0;
        if (isInterval) {
          return (
            <span key={idx} className="normal">
              ,{" "}
            </span>
          );
        }
        const realIdx = ~~(idx / 2);
        return <span key={idx}>{data[realIdx]}</span>;
      })}
    </>
  );
};
