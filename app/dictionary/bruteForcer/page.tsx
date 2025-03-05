"use client";
import { useEffect, useState } from "react";
import DictionaryList from "~/component/DictionaryList";
import Input from "~/component/Input";
import Radio from "~/component/Radio";
import {
  CapitalLetter,
  LowercaseLetter,
  NumberCode,
} from "~/constant/dictionary";
import {
  BaseGenerator,
  payloadGenerateForCharacter,
} from "~/utils/PayloadGenerate";
import dictionaryStyles from "../dictionary.module.scss";
import styles from "./forcer.module.scss";

export default function BruteForcer() {
  const [generator, setGenerator] = useState<BaseGenerator | null>(null);
  const [characterOption, setCharacterOption] = useState<{
    number: boolean;
    letter: boolean;
    caseSensitive: boolean;
  }>({ number: false, letter: false, caseSensitive: false });
  const [length, setLength] = useState(4);

  useEffect(() => {
    let str = "";
    if (characterOption.number) {
      str = str + NumberCode;
    }
    if (characterOption.letter) {
      str = str + LowercaseLetter;
      if (characterOption.caseSensitive) {
        str = str + CapitalLetter;
      }
    }
    const generator = payloadGenerateForCharacter({ character: str, length });
    setGenerator(generator);
  }, [characterOption, length]);

  return (
    <div className={dictionaryStyles.subPageContainer}>
      <div className={`${dictionaryStyles.paramGroup} ${styles.paramGroup}`}>
        <div className="title">字符规则:</div>
        <div className="items">
          <Radio
            title={"数字"}
            checked={characterOption.number}
            onChange={() => {
              setCharacterOption({
                ...characterOption,
                number: !characterOption.number,
              });
            }}
          />
          <Radio
            title={"字母"}
            checked={characterOption.letter}
            onChange={() => {
              setCharacterOption({
                ...characterOption,
                letter: !characterOption.letter,
              });
            }}
          />
          <Radio
            title={"大小写敏感"}
            checked={characterOption.caseSensitive}
            onChange={() => {
              setCharacterOption({
                ...characterOption,
                caseSensitive: !characterOption.caseSensitive,
              });
            }}
          />
        </div>
      </div>
      <div className={`${dictionaryStyles.paramGroup} ${styles.paramGroup}`}>
        <div className="title">长度:</div>
        <div className="items">
          <Input
            value={length}
            onChange={(e) => {
              const num = Number(e.target.value);
              if (!Number.isNaN(num) && num >= 0 && num <= 20) {
                setLength(num);
              }
            }}
          />
        </div>
      </div>
      {generator ? (
        <div className={dictionaryStyles.resultListContainer}>
          <DictionaryList generator={generator} />
        </div>
      ) : null}
    </div>
  );
}
