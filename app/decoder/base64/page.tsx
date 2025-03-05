"use client";
import { useState } from "react";
import Button from "~/component/Button";
import Textarea from "~/component/Textarea";
import decoderStyles from "../decoder.module.scss";

export default function Base64() {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const encodeAndDecode = () => {
    const encode = encodeURI(text);
    setResult(btoa(encode));
  };

  const decodeAndDecode = () => {
    const encode = atob(text);
    setResult(decodeURI(encode));
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
        <div className="title">结果:</div>
        <div className="items">
          <Textarea value={result} spellCheck={false} disabled />
        </div>
      </div>
      <div className={decoderStyles.paramGroup}>
        <Button onClick={encodeAndDecode} title="加密" />
        <Button onClick={decodeAndDecode} title="解密" />
      </div>
    </div>
  );
}
