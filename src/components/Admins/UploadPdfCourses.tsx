import React, { useEffect, useState } from "react";

import ModalCreateCoursePDF from "./ModalCreateCoursePDF";

import { Button } from "antd";

import { useUserContext } from "../../config/UserContext";
import axiosInstance from "../../config/Api";

import { Card, Col, Row } from "antd";
import { Admin } from "./ModalCreateAdmin";

function UploadPdfCourses() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [titleCourses, setTitleCourses] = useState<Admin[]>([]);

  const { isConnected } = useUserContext();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

// GET COUSRSES TITLE

  useEffect(() => {
    if (isConnected) {
      axiosInstance
        .get<Admin[]>("/course/title")
        .then(({ data }) => {
          console.log(data);
          setTitleCourses(data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération les  titres cours",
            error
          );
        });
    }
  }, [isConnected]);

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
        style={{ marginTop: "3rem", marginLeft: "4rem" }}
        onClick={showModal}
      >
        Add New +
      </button>

      <Row
        gutter={[16, 16]}
        style={{ marginTop: "4rem", gap: 10, marginLeft: "3rem" }}
      >
        {titleCourses.map((course, index) => (
          <Col span={4} key={index}>
            <Card
              title={course.title}
              bordered={false}
              style={{
                backgroundColor: "#f6f7f9",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Button
                size="small"
                style={{
                  backgroundColor: "#FF4201",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                View Course
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <ModalCreateCoursePDF
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        setTitleCourses={setTitleCourses}
      />
    </div>
  );
}

export default UploadPdfCourses;
