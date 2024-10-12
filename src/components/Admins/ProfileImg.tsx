import { Avatar, Button, Typography, Upload, UploadProps } from "antd";
import { useCallback } from "react";
import { useState } from "react";
import { useUserContext } from "../../config/UserContext";
import {
  EditOutlined,
  UploadOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-hot-toast";
import { IFormDataAdmin } from "./types";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

const props: UploadProps = {
  name: "file",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      toast.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      toast.error(`${info.file.name} file upload failed.`);
    }
  },
};

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function ProfileImg({
  formDataAdmin,
  setFormDataAdmin,
}: {
  formDataAdmin: IFormDataAdmin;
  setFormDataAdmin: React.Dispatch<React.SetStateAction<IFormDataAdmin>>;
}) {
  const { currentAdmin } = useUserContext();
  const [isProfileImgEditing, setIsProfileImgEditing] = useState(false);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleToggleImgEdit = useCallback(() => {
    setImageUrl(null);
    setLoading(false);
    setIsProfileImgEditing((prev) => !prev);
  }, []);

  const handleChangeImg = useCallback(
    ({ file }: UploadChangeParam<UploadFile<any>>) => {
      if (!file) return;
      setFormDataAdmin((prev) => ({ ...prev, img: file }));
    },
    []
  );

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG file!");
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast.error("Image must be smaller than 2MB!");
      return false;
    }

    // If validation passes, convert the image to Base64 and set it for preview
    setLoading(true);
    getBase64(file).then((base64) => {
      setImageUrl(base64 as string);
      setLoading(false);
    });

    // Return false to prevent the default upload behavior
    return false;
  };

  if (!currentAdmin) return null;

  return !isProfileImgEditing ? (
    <div className="relative w-min">
      <Avatar size="large" src={currentAdmin.profileImage}>
        {currentAdmin.fullName[0].toUpperCase()}
      </Avatar>
      <Button
        onClick={handleToggleImgEdit}
        className="absolute -right-3 -top-3"
        size="small"
        icon={<EditOutlined />}
      />
    </div>
  ) : (
    <>
      <Upload
        {...props}
        onChange={handleChangeImg}
        beforeUpload={beforeUpload}
        name="image"
        listType="text"
        className="image-uploader"
        showUploadList={false}
      >
        {loading ? (
          <LoadingOutlined />
        ) : (
          <Button>Upload a photo</Button>
        )}
      </Upload>
      {imageUrl && <Avatar src={imageUrl} />}

      <Button size="small" className="mt-2" variant="dashed" color="primary" onClick={handleToggleImgEdit}>
        Cancel
      </Button>
    </>
  );
}
