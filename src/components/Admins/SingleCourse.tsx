import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance, { imageURL } from "../../config/Api";
import { ICourse } from "../../types/course";
import { isObject } from "lodash";
import IconLoader from "../Icon/IconLoader";
import { Alert } from "antd";
import Title from "antd/es/typography/Title";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function SingleCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState<ICourse | null | false>(null);
  const defaultLayout = defaultLayoutPlugin();

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (iframeRef.current && course) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.body.innerHTML = course.content ?? "";
      } else {
        console.warn("Le document de l'iframe est null.");
      }
    }
  }, [course]);

  // GET SINGLE COURSE ID 



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
   <div>
        <Title level={3}>{course.title}</Title>
        {course.url && (
          <div className="pdf-viewer-container">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer
                fileUrl={`${imageURL}Courses-pdfs/${course.url.split("/").pop()}`}
                plugins={[defaultLayout]}
              />
            </Worker>
          </div>
        )}
      </div>

    <iframe
      ref={iframeRef}
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
      }}
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />

    <style>
      {`
        .content-wrapper {
          all: unset; /* Resets all inherited and applied styles */ display: revert; /* Reverts the default browser styles */
        }
      `}
    </style>
  </div>
  );
}
