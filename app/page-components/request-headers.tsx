import React from "react";
import ParamsTable from "~/component/ParamsTable";
import { HeaderParamsItem, IntruderOptions } from "~/constant/intruder";

type Props = {
  intruderOptions: IntruderOptions;
  onUpdateHeaders: (id: string, value: HeaderParamsItem) => void;
  onDeleteHeadersItem: (id: string) => void;
};

const RequestHeaders: React.FC<Props> = ({
  intruderOptions,
  onUpdateHeaders,
  onDeleteHeadersItem,
}: Props) => {
  return (
    <ParamsTable
      params={intruderOptions.headers}
      onChange={onUpdateHeaders}
      onDelete={onDeleteHeadersItem}
    />
  );
};

export default RequestHeaders;
