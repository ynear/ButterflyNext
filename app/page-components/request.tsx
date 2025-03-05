import React, { useCallback, useMemo, useState } from "react";
import Button from "~/component/Button";
import Input from "~/component/Input";
import Select from "~/component/Select";
import Tab from "~/component/Tab";
import {
  HeaderParamsItem,
  IntruderOptions,
  RequestMeth,
} from "~/constant/intruder";
import uuid from "~/utils/UuidUtil";
import styles from "../page.module.scss";
import RequestHeaders from "./request-headers";
import RequestParams from "./request-params";
import RequestBody from "./request-body";

const BodyType = ["Headers", "Query Params", "Body"] as const;

type Props = {
  intruderOptions: IntruderOptions;
  onUpdateRequest: (
    requestParams: Omit<IntruderOptions, "attackType" | "settings">
  ) => void;
};

const Request: React.FC<Props> = ({
  intruderOptions,
  onUpdateRequest,
}: Props) => {
  const [choose, setChoose] = useState<(typeof BodyType)[number]>(BodyType[0]);
  const requestMethList = useMemo(
    () => Object.values(RequestMeth).map((m) => ({ id: m, name: m })),
    []
  );
  const bodyTypeList = useMemo(
    () => BodyType.map((m) => ({ id: m, name: m })),
    []
  );

  const onUpdateMethod = useCallback(
    (method: Values<typeof RequestMeth>) => {
      onUpdateRequest({ ...intruderOptions, method });
    },
    [intruderOptions]
  );

  const onUpdateHeaders = useCallback(
    (id: string, value: HeaderParamsItem) => {
      const headers = intruderOptions.headers;
      const newHeaders = headers.map((item) => (item.id === id ? value : item));
      const hasEmpty = newHeaders.some((item) => !item.key && !item.value);
      if (!hasEmpty) {
        newHeaders.push({ id: uuid(), key: "", value: "", enable: true });
      }
      onUpdateRequest({ ...intruderOptions, headers: newHeaders });
    },
    [intruderOptions]
  );

  const onDeleteHeadersItem = useCallback(
    (id: string) => {
      const headers = intruderOptions.headers;
      const newHeaders = headers.filter((item) => item.id != id);
      onUpdateRequest({ ...intruderOptions, headers: newHeaders });
    },
    [intruderOptions]
  );

  const onUpdateParams = useCallback(
    (id: string, value: HeaderParamsItem) => {
      const params = intruderOptions.params;
      const newParams = params.map((item) => (item.id === id ? value : item));
      const hasEmpty = newParams.some((item) => !item.key && !item.value);
      if (!hasEmpty) {
        newParams.push({ id: uuid(), key: "", value: "", enable: true });
      }
      onUpdateRequest({ ...intruderOptions, params: newParams });
    },
    [intruderOptions]
  );

  const onDeleteParamsItem = useCallback(
    (id: string) => {
      const params = intruderOptions.params;
      const newParams = params.filter((item) => item.id != id);
      onUpdateRequest({ ...intruderOptions, params: newParams });
    },
    [intruderOptions]
  );

  return (
    <div className={styles.content}>
      <div className={styles.inputBox}>
        <Select
          className="method-select"
          title={"Method"}
          data={requestMethList}
          value={{ id: intruderOptions.method, name: intruderOptions.method }}
          onChange={({ id }) => {
            onUpdateMethod(id as Values<typeof RequestMeth>);
          }}
        />
        <Input
          className="url-input"
          title="URL*"
          placeholder='E.g. "https://example.com/foobar"'
        />
        <Button className="curl-parse-btn" title="解析curl命令" />
      </div>
      <div className={styles.requestContent}>
        <Tab
          size="small"
          data={bodyTypeList}
          onChange={(value) => setChoose(value.id as (typeof BodyType)[number])}
        />
        <div className="requestOptions">
          {choose === BodyType[0] ? (
            <RequestHeaders
              intruderOptions={intruderOptions}
              onUpdateHeaders={onUpdateHeaders}
              onDeleteHeadersItem={onDeleteHeadersItem}
            />
          ) : null}
          {choose === BodyType[1] ? (
            <RequestParams
              intruderOptions={intruderOptions}
              onUpdateParams={onUpdateParams}
              onDeleteParamsItem={onDeleteParamsItem}
            />
          ) : null}
          {choose === BodyType[2] ? (
            <RequestBody intruderOptions={intruderOptions} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Request;
