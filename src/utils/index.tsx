import { isObject } from "lodash";

export const extractMsgFromError = (err: any): string => {
  if ("response" in err) {
    const data = err.response.data;
    if ("message" in data) return data.message;
    return err.message;
  }

  if (err instanceof Error) {
    return err.message;
  }

  if (isObject(err) && "message" in err) return err.message as string;

  return JSON.stringify(err).slice(0, 100);
};
