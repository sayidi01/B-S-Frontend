import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/Api";
import { Admin } from "./ModalCreateAdmin";
import { useUserContext } from "../../config/UserContext";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function AllCourses() {
  const [Courses, setCourses] = useState<Admin[]>([]);

  const { isConnected } = useUserContext();

  console.log(Courses);

  useEffect(() => {
    if (isConnected) {
      axiosInstance
        .get<Admin[]>("/course/pdfs")
        .then(({ data }) => {
          console.log(data);
          setCourses(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération  cours", error);
        });
    }
  }, [isConnected]);

  return (
    <div>
      {Courses.map((course) => (
        <div key={course._id} style={{ marginBottom: "20px" }}>
          <p style={{fontSize: 23, fontFamily: 'Roboto', padding: '20px', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>{course.title}</p>
          <div style={{ height: "500px" }}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={`http://localhost:3000/Courses-pdfs/${course.url.split('/').pop()}`} />
            </Worker>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllCourses;
