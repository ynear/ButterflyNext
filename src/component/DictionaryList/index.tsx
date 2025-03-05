"use client";
import React, { HTMLAttributes, useMemo } from "react";
import { BaseGenerator } from "~/utils/PayloadGenerate";
import Button from "../Button";
import styles from "./styles.module.scss";

type Props = HTMLAttributes<HTMLUListElement> & {
  generator: BaseGenerator;
};

const DictionaryList: React.FC<Props> = ({
  generator,
  ...otherProps
}: Props) => {
  const formatList = useMemo(() => {
    if (generator.showList.length < 1001) {
      return generator.showList;
    }
    return [
      ...generator.showList.slice(0, 500),
      ...generator.showList.slice(generator.showList.length - 500),
    ];
  }, [generator.showList]);
  const totalLength = useMemo(() => generator.length, [generator.length]);

  const start = () => {
    console.log(generator.next());
  };

  return (
    <div className={styles.resultContainer}>
      <ul {...otherProps}>
        {formatList.map((key, idx) => (
          <li className={styles.resultItem} key={`${idx}${key}`}>
            {key}
          </li>
        ))}
      </ul>
      <div className="total-length">{`总计: ${totalLength}个`}</div>
      <div className="button-container">
        <Button onClick={start} title="开始爆破" />
      </div>
    </div>
  );
};

export default DictionaryList;
