import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance, { imageURL } from "../../config/Api";
import { ICourse } from "../../types/course";
import { isObject } from "lodash";
import IconLoader from "../Icon/IconLoader";
import { Alert, Button } from "antd";
import Title from "antd/es/typography/Title";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function SingleCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState<ICourse | null | false>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState<string[]>([]);

  const defaultLayout = defaultLayoutPlugin();

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (course && course.content) {
      const sentences = course.content.split(/(?<=[.!?])\s+/);
  
      const newPages = [];
      let currentPageContent = "";
  
      sentences.forEach((sentence) => {
        if ((currentPageContent + sentence).length > 2000) {
          newPages.push(currentPageContent);
          currentPageContent = sentence;
        } else {
          currentPageContent += sentence + " ";
        }
      });
      if (currentPageContent) {
        newPages.push(currentPageContent);
      }
  
      setPages(newPages);
    }
  }, [course]);

  useEffect(() => {
    if (iframeRef.current && pages.length > 0) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.body.innerHTML = pages[currentPage] ?? "";
      } else {
        console.warn("Le document de l'iframe est null.");
      }
    }
  }, [currentPage, pages]);

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
                fileUrl={`${imageURL}Courses-pdfs/${course.url
                  .split("/")
                  .pop()}`}
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
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous page
        </Button>
        <span style={{ margin: "0 20px" }}>
          Page {currentPage + 1} sur {pages.length}
        </span>
        <Button
          disabled={currentPage === pages.length - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next page
        </Button>
      </div>

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
