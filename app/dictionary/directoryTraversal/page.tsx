"use client";
import { useState } from "react";
import Button from "~/component/Button";
import DictionaryList from "~/component/DictionaryList";
import Input from "~/component/Input";
import Radio from "~/component/Radio";
import {
  BaseGenerator,
  payloadGenerateForDirectoryTraversal,
} from "~/utils/PayloadGenerate";
import dictionaryStyles from "../dictionary.module.scss";
import styles from "./directory.module.scss";
import {
  nonStandardEncode2byte,
  nonStandardEncode3byte,
} from "~/constant/dictionary";

export default function DirectoryTraversal() {
  const [fileName, setFileName] = useState("");
  const [extName, setExtName] = useState("");
  const [maxLevel, setMaxLevel] = useState(3);
  const [params, setParams] = useState({
    skipExtensionCheck: false,
    encodeURI: true,
    doubleEncodeURI: true,
    doubleWrite: true,
    isLinux: true,
    nonStandardEncode1: true,
    nonStandardEncode2: true,
    nonStandardEncode3: true,
  });
  const [fileNameError, setFileNameError] = useState(false);
  const [generator, setGenerator] = useState<BaseGenerator | null>(null);
  const [submitKey, setSubmitKey] = useState(Date.now());

  const start = () => {
    setSubmitKey(Date.now());
    if (!fileName) {
      setFileNameError(true);
      setGenerator(null);
      return;
    }
    const generator = payloadGenerateForDirectoryTraversal({
      fileName,
      maxLevel,
      extName,
      ...params,
    });
    setGenerator(generator);
  };

  return (
    <div className={dictionaryStyles.subPageContainer}>
      <div className={`${dictionaryStyles.paramGroup} ${styles.paramGroup}`}>
        <div className="title">文件名:</div>
        <div className="items">
          <Input
            key={submitKey}
            error={fileNameError}
            value={fileName}
            onChange={(e) => {
              setFileNameError(false);
              setFileName(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={`${dictionaryStyles.paramGroup} ${styles.paramGroup}`}>
        <div className="title">文件扩展名:</div>
        <div className="items">
          <Input
            value={extName}
            onChange={(e) => {
              setExtName(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={`${dictionaryStyles.paramGroup} ${styles.paramGroup}`}>
        <div className="title">文件最大深度:</div>
        <div className="items">
          <Input
            type={"number"}
            min={1}
            max={10}
            value={maxLevel}
            onChange={(e) => setMaxLevel(Number(e.target.value))}
          />
        </div>
      </div>
      <div className={`${dictionaryStyles.paramGroup} ${styles.paramGroup}`}>
        <div className="title">字符规则:</div>
        <div className="items">
          <Radio
            title={"空字节绕过扩展名验证"}
            checked={params.skipExtensionCheck}
            onChange={() => {
              setParams({
                ...params,
                skipExtensionCheck: !params.skipExtensionCheck,
              });
            }}
          />
          <Radio
            title={"URL编码"}
            checked={params.encodeURI}
            onChange={() => {
              const newValue = !params.encodeURI;
              setParams({
                ...params,
                encodeURI: newValue,
                doubleEncodeURI: newValue && params.doubleEncodeURI,
              });
            }}
          />
          <Radio
            title={"双重URL编码"}
            checked={params.doubleEncodeURI}
            onChange={() => {
              const newValue = !params.doubleEncodeURI;
              setParams({
                ...params,
                encodeURI: params.encodeURI || newValue,
                doubleEncodeURI: newValue,
              });
            }}
          />
          <Radio
            title={"双写"}
            checked={params.doubleWrite}
            onChange={() => {
              setParams({
                ...params,
                doubleWrite: !params.doubleWrite,
              });
            }}
          />
        </div>
      </div>
      <div className={`${dictionaryStyles.paramGroup} ${styles.paramGroup}`}>
        <div className="title">文件路径分隔符:</div>
        <div className="items">
          <Radio
            title={"/ (linux)"}
            checked={params.isLinux}
            onChange={() => {
              setParams({
                ...params,
                isLinux: true,
              });
            }}
          />
          <Radio
            title={"\\ (windows)"}
            checked={!params.isLinux}
            onChange={() => {
              setParams({
                ...params,
                isLinux: false,
              });
            }}
          />
        </div>
      </div>
      <div className={`${dictionaryStyles.paramGroup} ${styles.paramGroup}`}>
        <div className="title">非法字符替换:</div>
        <div className="items">
          <Radio
            title={`2字节非法字符替换: ${params.isLinux ? "/" : "\\"} => ${
              nonStandardEncode2byte[params.isLinux ? "/" : "\\"]
            }`}
            checked={params.nonStandardEncode1}
            onChange={() => {
              setParams({
                ...params,
                nonStandardEncode1: !params.nonStandardEncode1,
              });
            }}
          />
          <Radio
            title={`3字节非法字符替换: ${params.isLinux ? "/" : "\\"} => ${
              nonStandardEncode3byte[params.isLinux ? "/" : "\\"]
            }`}
            checked={params.nonStandardEncode2}
            onChange={() => {
              setParams({
                ...params,
                nonStandardEncode2: !params.nonStandardEncode2,
              });
            }}
          />
          <Radio
            title={"JAVA非法字符替换: . => %c0%ae"}
            checked={params.nonStandardEncode3}
            onChange={() => {
              setParams({
                ...params,
                nonStandardEncode3: !params.nonStandardEncode3,
              });
            }}
          />
        </div>
      </div>
      <div className={`${dictionaryStyles.paramGroup} ${styles.paramGroup}`}>
        <Button onClick={start} title="枚举" />
      </div>
      {generator ? (
        <div className={dictionaryStyles.resultListContainer}>
          <DictionaryList generator={generator} />
        </div>
      ) : null}
    </div>
  );
}
