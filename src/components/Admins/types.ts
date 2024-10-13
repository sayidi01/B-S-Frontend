import { UploadFile } from "antd";

export interface IFormDataAdmin {
  fullName: string;
  email: string;
  phone: string;
  img: null | UploadFile<any>;
  [key: string]: IFormDataAdmin[keyof IFormDataAdmin];
}
