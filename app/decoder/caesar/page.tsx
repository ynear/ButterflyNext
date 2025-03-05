"use client";
import { useState } from "react";
import Button from "~/component/Button";
import Input from "~/component/Input";
import Textarea from "~/component/Textarea";
import { LowercaseLetter } from "~/constant/dictionary";
import decoderStyles from "../decoder.module.scss";

export default function Caesar() {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [shift, setShift] = useState<number>(0);

  const encodeAndDecode = (encode: boolean) => {
    const offset = encode ? shift : 26 - shift;
    const newStr = text
      .split("")
      .map((item) => {
        const nowIdx = LowercaseLetter.indexOf(item);
        if (nowIdx < 0) {
          return item;
        }
        const newIdx = (nowIdx + offset) % 26;
        return LowercaseLetter[newIdx];
      })
      .join("");
    setResult(newStr);
  };

  return (
    <div className={decoderStyles.subPageContainer}>
      <div className={decoderStyles.paramGroup}>
        <div className="title">目标字符串:</div>
        <div className="items">
          <Textarea
            value={text}
            spellCheck={false}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={decoderStyles.paramGroup}>
        <div className="title">位移:</div>
        <div className="items">
          <Input
            type={"number"}
            min={0}
            max={25}
            value={shift}
            onChange={(e) => setShift(Number(e.target.value))}
          />
        </div>
      </div>
      <div className={decoderStyles.paramGroup}>
        <div className="title">结果:</div>
        <div className="items">
          <Textarea value={result} spellCheck={false} disabled />
        </div>
      </div>
      <div className={decoderStyles.paramGroup}>
        <Button onClick={() => encodeAndDecode(true)} title="加密" />
        <Button onClick={() => encodeAndDecode(false)} title="解密" />
      </div>
    </div>
  );
}
