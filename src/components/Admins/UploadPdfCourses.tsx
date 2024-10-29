import React, { useEffect, useState } from "react";

import ModalCreateCoursePDF from "./ModalCreateCoursePDF";
import { Student } from "../Students/typesStudent";

import { useUserContext } from "../../config/UserContext";
import axiosInstance from "../../config/Api";

import { Card, Col, Row } from 'antd';

function UploadPdfCourses() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [titleCourses,setTitleCourses] = useState<Student[]>([])

  const { isConnected } = useUserContext();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    if (isConnected) {
      axiosInstance
        .get<Student[]>("/course/title")
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

      <Row gutter={[16,16]} style={{marginTop: '4rem', gap: 10, marginLeft: '3rem'}} >
        {titleCourses.map((course, index) => (
           <Col span={4} key={index} >
           <Card
             title={course.title}
             bordered={false}
             style={{
               backgroundColor: '#f7f7f7', 
               boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
               borderRadius: '8px',
             }}
           >
             <button
               style={{
                backgroundColor: '#e75159',
                  color: '#fff',
                 border: 'none',
                 padding: '6px 10px',
                 borderRadius: '5px',
                 cursor: 'pointer',
                 transition: 'background-color 0.3s ease',
                
               }}
               onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1565c0')} 
               onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#1e88e5')}
             >
               View Course
             </button>
           </Card>
         </Col>
        ))}
      </Row>


      <ModalCreateCoursePDF
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    </div>
  );
}

export default UploadPdfCourses;
