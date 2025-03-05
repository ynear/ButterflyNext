export const RoutePath = {
  HOME: { path: "/" },
  INTRUDER: { path: "/intruder" },
  DICTIONARY: {
    path: "/dictionary",
    childs: [
      {
        title: "数字",
        path: "numbers",
      },
      {
        title: "日期",
        path: "dates",
      },
      {
        title: "暴力字典",
        path: "bruteForcer",
      },
      {
        title: "目录生成器",
        path: "directoryTraversal",
      },
    ],
  },
  DECODER: {
    path: "/decoder",
    childs: [
      {
        title: "URL",
        path: "url",
      },
      {
        title: "Base64",
        path: "base64",
      },
      {
        title: "凯撒变换",
        path: "caesar",
      },
    ],
  },
  OTHERTOOLS: {
    path: "/otherTools",
    childs: [
      {
        title: "进制转换",
        path: "hexConvert",
      },
      {
        title: "颜色转换",
        path: "colorConvert",
      },
      {
        title: "IP地址计算器",
        path: "subnetmask",
      },
      {
        title: "Curl解析",
        path: "curlParse",
      },
    ],
  },
  SETTINGS: {
    path: "/settings",
    childs: [{ title: "通用", path: "" }],
  },
} as const;
