"use client";
import { useState } from "react";
import Button from "~/component/Button";
import Radio from "~/component/Radio";
import Textarea from "~/component/Textarea";
import decoderStyles from "../decoder.module.scss";

export default function Url() {
  const [text, setText] = useState<string>("");
  const [useEncodeURI, setUseEncodeURI] = useState(true);
  const [result, setResult] = useState<string>("");

  const encodeAndDecode = () => {
    const func = useEncodeURI ? encodeURI : encodeURIComponent;
    setResult(func(text));
  };

  const decodeAndDecode = () => {
    const func = useEncodeURI ? decodeURI : decodeURIComponent;
    setResult(func(text));
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
        <div className="title">转码规则:</div>
        <div className="items">
          <Radio
            title={"转码   ;   ,   /   ?   :   @   &   =   +   $   #"}
            checked={!useEncodeURI}
            onChange={() => {
              setUseEncodeURI(!useEncodeURI);
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
