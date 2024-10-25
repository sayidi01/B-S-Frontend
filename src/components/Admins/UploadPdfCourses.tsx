import React from "react";
import { Input } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";

const props: UploadProps = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function UploadPdfCourses() {
  return (
    <div>
      <p
        style={{
          fontFamily: "ROBOTO",
          fontSize: 30,
          marginTop: "3rem",
          marginLeft: "4rem",
        }}
      >
        Upload courses with PDF files
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginTop: "3rem",
          marginLeft: "4rem",
        }}
      >
        <Input placeholder="Name Courses" name="" style={{ width: "15%" }} />

        <Upload {...props}>
          <Button
            style={{ backgroundColor: "#e3f2fd", color: '"#e3f2fd' }}
            icon={<UploadOutlined />}
          >
            Click to Upload
          </Button>
        </Upload>
      </div>
    </div>
  );
}

export default UploadPdfCourses;
