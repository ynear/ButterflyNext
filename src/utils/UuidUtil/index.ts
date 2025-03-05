function uuid() {
  const timeSign = new Date().getTime().toString(36);
  const randSign = "xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  return `${timeSign}-${randSign}`;
}

export default uuid;

const LocalIdString = "local-";

export const isLocalId = (id: string) => {
  return id.startsWith(LocalIdString);
};

export const generateLocalId = () => {
  return `${LocalIdString}${uuid()}`;
};
