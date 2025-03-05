"use client";
import { useEffect, useMemo, useState } from "react";
import DictionaryList from "~/component/DictionaryList";
import Input from "~/component/Input";
import Select from "~/component/Select";
import {
  BaseGenerator,
  DateGenerateOption,
  DateStep,
  payloadGenerateForDate,
} from "~/utils/PayloadGenerate";
import dictionaryStyles from "../dictionary.module.scss";
import styles from "./date.module.scss";

export default function Dates() {
  const dateStepList = useMemo(() => Object.values(DateStep), []);
  const [generator, setGenerator] = useState<BaseGenerator | null>(null);
  const [characterOption, setCharacterOption] = useState<DateGenerateOption>({
    fromYear: new Date().getFullYear(),
    fromMonth: new Date().getMonth() + 1,
    fromDay: new Date().getDay(),
    toYear: new Date().getFullYear(),
    toMonth: new Date().getMonth() + 1,
    toDay: new Date().getDay(),
    step: 1,
    stepType: DateStep.days.id,
    format: "DD.MM.YYYY",
  });

  useEffect(() => {
    const generator = payloadGenerateForDate(characterOption);
    setGenerator(generator);
  }, [characterOption]);

  return (
    <div className={dictionaryStyles.subPageContainer}>
      <div className={`${dictionaryStyles.paramGroup} ${styles.paramGroup}`}>
        <div className="title">From:</div>
        <div className="items">
          <Input
            className="fix-width"
            value={characterOption.fromYear}
            onChange={(e) => {
              const num = Number(e.target.value);
              if (!Number.isNaN(num) && num >= 0) {
                setCharacterOption({ ...characterOption, fromYear: num });
              }
            }}
          />
          年
          <Input
            className="fix-width"
            value={characterOption.fromMonth}
            onChange={(e) => {
              const num = Number(e.target.value);
              if (!Number.isNaN(num) && num >= 1 && num <= 12) {
                setCharacterOption({ ...characterOption, fromMonth: num });
              }
            }}
          />
          月
          <Input
            className="fix-width"
            value={characterOption.fromDay}
            onChange={(e) => {
              const num = Number(e.target.value);
              if (!Number.isNaN(num) && num >= 1 && num <= 31) {
                setCharacterOption({ ...characterOption, fromDay: num });
              }
            }}
          />
          日
        </div>
      </div>
      <div className={`${dictionaryStyles.paramGroup} ${styles.paramGroup}`}>
        <div className="title">To:</div>
        <div className="items">
          <Input
            className="fix-width"
            value={characterOption.toYear}
            onChange={(e) => {
              const num = Number(e.target.value);
              if (!Number.isNaN(num) && num >= 0) {
                setCharacterOption({ ...characterOption, toYear: num });
              }
            }}
          />
          年
          <Input
            className="fix-width"
            value={characterOption.toMonth}
            onChange={(e) => {
              const num = Number(e.target.value);
              if (!Number.isNaN(num) && num >= 1 && num <= 12) {
                setCharacterOption({ ...characterOption, toMonth: num });
              }
            }}
          />
          月
          <Input
            className="fix-width"
            value={characterOption.toDay}
            onChange={(e) => {
              const num = Number(e.target.value);
              if (!Number.isNaN(num) && num >= 1 && num <= 31) {
                setCharacterOption({ ...characterOption, toDay: num });
              }
            }}
          />
          日
        </div>
      </div>
      <div className={`${dictionaryStyles.paramGroup} ${styles.paramGroup}`}>
        <div className="title">Step:</div>
        <div className="items">
          <Input
            className="fix-width"
            value={characterOption.step}
            onChange={(e) => {
              const num = Number(e.target.value);
              if (!Number.isNaN(num) && num > 0) {
                setCharacterOption({ ...characterOption, step: num });
              }
            }}
          />
          <Select
            title={""}
            data={dateStepList}
            value={{
              id: characterOption.stepType,
              name:
                dateStepList.find(
                  (item) => item.id === characterOption.stepType
                )?.name || "",
            }}
            onChange={(value) => {
              setCharacterOption({
                ...characterOption,
                stepType: value.id as Values<typeof DateStep>["id"],
              });
            }}
          />
        </div>
      </div>
      <div className={`${dictionaryStyles.paramGroup} ${styles.paramGroup}`}>
        <div className="title">Format:</div>
        <div className="items">
          <Input
            value={characterOption.format}
            onChange={(e) => {
              const value = e.target.value;
              setCharacterOption({ ...characterOption, format: value });
            }}
          />
          <span className="notice">YYYY:1970</span>
          <span className="notice">YY:70</span>
          <span className="notice">DD:01</span>
          <span className="notice">D:1</span>
          <span className="notice">M:1</span>
          <span className="notice">MM:01</span>
          <span className="notice">MMM:Jan</span>
          <span className="notice">MMMM:January</span>
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
