import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/Api";
import { ICourse } from "../../types/course";
import { isObject } from "lodash";
import IconLoader from "../Icon/IconLoader";
import { Alert } from "antd";
import Title from "antd/es/typography/Title";
import { Text } from "@mantine/core";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function SingleCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState<ICourse | null | false>(null);
  const defaultLayout = defaultLayoutPlugin();

  useEffect(() => {
    console.log("Course ID:", id);
    if (id) {
      axiosInstance
        .get(`/course/${id}`)
        .then(({ data }) => {
          console.log(data);
          if (isObject(data)) {
            setCourse(data as ICourse);
          } else setCourse(false);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération cours ", error);
          setCourse(false);
        });
    }
  }, [id]);

  if (course == null) return <IconLoader />;
  if (course == false)
    return <Alert message={"Failed to load course"} type="error" />;

  return (
    <div>
      <Title level={3}>{course.title}</Title>

      <div style={{ height: "100%" }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={`http://localhost:3000/Courses-pdfs/${course.url
              .split("/")
              .pop()}`}
            plugins={[defaultLayout]}
          />
        </Worker>
      </div>
    </div>
  );
}
