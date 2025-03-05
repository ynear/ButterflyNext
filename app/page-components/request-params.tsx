import React from "react";
import ParamsTable from "~/component/ParamsTable";
import { HeaderParamsItem, IntruderOptions } from "~/constant/intruder";

type Props = {
  intruderOptions: IntruderOptions;
  onUpdateParams: (id: string, value: HeaderParamsItem) => void;
  onDeleteParamsItem: (id: string) => void;
};

const RequestParams: React.FC<Props> = ({
  intruderOptions,
  onUpdateParams,
  onDeleteParamsItem,
}: Props) => {
  return (
    <ParamsTable
      params={intruderOptions.params}
      onChange={onUpdateParams}
      onDelete={onDeleteParamsItem}
    />
  );
};

export default RequestParams;
