export const AttackType = {
  Sniper: { id: "Sniper", name: "狙击" },
  BatteringRam: { id: "BatteringRam", name: "横推" },
  Pitchfork: { id: "Pitchfork", name: "多路并进" },
  ClusterBomb: { id: "ClusterBomb", name: "饱和攻击" },
} as const;

export const RequestMeth = {
  get: "GET",
  post: "POST",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE",
  head: "HEAD",
  options: "OPTIONS",
} as const;

export const IntruderOptionsDelayBetweenReqType = {
  Fixed: { id: "Fixed", name: "固定" },
  Random: { id: "Random", name: "随机" },
  Increase: { id: "Increase", name: "自增" },
} as const;

export const IntruderOptionsDefaultValue: IntruderOptions = {
  attackType: AttackType.Sniper.id,
  method: RequestMeth.get,
  headers: [{ id: "default-empty", key: "", value: "", enable: true }],
  params: [{ id: "default-empty", key: "", value: "", enable: true }],
  settings: {
    maximumConcurrentReq: 10,
    delayBetweenRes: {
      type: IntruderOptionsDelayBetweenReqType.Fixed.id,
      fixedValue: 1000,
      randomValue: [1000, 5000],
      increaseValue: 100,
    },
  },
};

export type HeaderParamsItem = {
  id: string;
  key: string;
  value: string;
  enable: boolean;
};

export type SettingsParams = {
  maximumConcurrentReq: number;
  delayBetweenRes: {
    type: Values<typeof IntruderOptionsDelayBetweenReqType>["id"];
    fixedValue: number;
    randomValue: [number, number];
    increaseValue: number;
  };
};

export type IntruderOptions = {
  attackType: Values<typeof AttackType>["id"];
  method: Values<typeof RequestMeth>;
  headers: HeaderParamsItem[];
  params: HeaderParamsItem[];
  settings: SettingsParams;
};
