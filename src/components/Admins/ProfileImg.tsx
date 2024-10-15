import { Avatar, Button, Upload, UploadProps } from "antd";
import { useCallback } from "react";
import { useState } from "react";
import { useUserContext } from "../../config/UserContext";
import { EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
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
  setFormDataAdmin,
  setIsProfileImgEditing,
  isProfileImgEditing,
}: {
  setFormDataAdmin: React.Dispatch<React.SetStateAction<IFormDataAdmin>>;
  isProfileImgEditing: boolean;
  setIsProfileImgEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { currentAdmin } = useUserContext();

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

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  if (!currentAdmin) return null;
  
  console.log(currentAdmin);

  return !isProfileImgEditing ? (
    <div className="relative w-min">
      <Avatar
        size="large"
        src={
          <img
            src={`http://localhost:3000/profile-images/${currentAdmin.image}`}
          />
        }
        className="w-32 h-32"
        
      >
        {currentAdmin.fullName.split(" ")[0].toUpperCase()}
      </Avatar>
      <div className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:bg-slate-400 hover:bg-opacity-30 h-full w-full rounded-full hover:flex justify-center items-center">
        <Button
          onClick={handleToggleImgEdit}
          size="large"
          icon={<EditOutlined />}
          className="hidden group-hover:block"
        />
        
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <Upload
        {...props}
        onChange={handleChangeImg}
        beforeUpload={beforeUpload}
        name="image"
        showUploadList={false}
        listType="picture-circle"
        className="avatar-uploader block"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            className="rounded-full"
          />
        ) : (
          uploadButton
        )}
      </Upload>

      <Button
        size="small"
        className="mt-2"
        variant="dashed"
        color="primary"
        onClick={handleToggleImgEdit}
      >
        Cancel
      </Button>
    </div>
  );
}
