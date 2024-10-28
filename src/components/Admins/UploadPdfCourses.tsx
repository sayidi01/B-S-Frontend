import React, { useState } from "react";

import ModalCreateCoursePDF from "./ModalCreateCoursePDF";

function UploadPdfCourses() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

      <button
        type="button"
        className="btn btn-primary"
        style={{ marginTop: "2rem", marginLeft: "4rem" }}
        onClick={showModal}
      >
        Add New +
      </button>

      <ModalCreateCoursePDF
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    </div>
  );
}

export default UploadPdfCourses;
