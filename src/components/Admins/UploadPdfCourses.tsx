import React, { useCallback, useEffect, useMemo, useState } from "react";

import ModalCreateCoursePDF from "./ModalCreateCoursePDF";

import Dropdown from "../../components/Dropdown";
import IconHorizontalDots from "../../components/Icon/IconHorizontalDots";
import IconTrashLines from "../Icon/IconTrashLines";
import IconPencil from "../Icon/IconPencil";

import { Button, Modal, Pagination, Card, Col, Row } from "antd";

import { useUserContext } from "../../config/UserContext";
import axiosInstance, { imageURL } from "../../config/Api";

import { Admin } from "./ModalCreateAdmin";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
import ModalEditTitleCourse from "./ModalEditTitleCourse";

const itemsPerPage = 8;

function UploadPdfCourses() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isModalEditTitleOpen, setIsModaEditTitleOpen] =
    useState<boolean>(false);

  const [titleCourses, setTitleCourses] = useState<Admin[]>([]);

  const [editTitleCourse, setEditTitleCourse] = useState<Admin | null>(null);

  const [courseId, setCourseId] = useState<Admin[]>([]);

  const { isConnected } = useUserContext();
  const navigate = useNavigate();

  console.log(courseId);

  const [currentPage, setCurrentPage] = useState(1);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return titleCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [titleCourses, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalEditTitleCourse = (course: Admin) => {
    setEditTitleCourse(course);
    setIsModaEditTitleOpen(true);
  };

  const handleEditCancel = () => {
    setIsModaEditTitleOpen(false);
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

  // GET ONE COURSE BY ID

  useEffect(() => {
    console.log("Course ID:", courseId);
    if (courseId && courseId.length > 0) {
      axiosInstance
        .get(`/course/${courseId}`)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération cours . ", error);
        });
    }
  }, [courseId]);

  // DELETE COURSE BY ID

  const deleteCourse = useCallback((coursepdfId: string, title: string) => {
    if (!coursepdfId) {
      console.error("L'identifiant cours est requis.");
      return;
    }
    console.log("Suppression cours avec l'ID:", coursepdfId);
    axiosInstance
      .delete(`/course/${coursepdfId}`)
      .then((data) => {
        console.log(data);
        setTitleCourses((prev) =>
          prev.filter((courseTitle) => courseTitle._id != coursepdfId)
        );
        setCourseId((prev) =>
          prev.filter((course) => course._id != coursepdfId)
        );
        console.log(data);
        toast.success(" Course successfully deleted");
      })
      .catch((err) => {
        toast.error("Erreur lors de la suppression cours", err);
      });
  }, []);

  // CONFIRATION MODAL DELTE COURSE

  const confirmDeleteCourse = (courseId: string, title: string) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this course?",
      onOk: () => {
        deleteCourse(courseId, title);
      },
    });
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
        Course Manager and Upload Zone
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
        gutter={[24, 48]}
        style={{ marginTop: "2rem", gap: 10, marginLeft: "3rem" }}
      >
        {paginatedCourses.map((course, index) => (
          <Col span={5} key={index}>
            <Card
              title={
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "0",
                    paddingBottom: "0", 
                  }}
                >
                  {course.title}
                </div>
              }
              bordered={false}
              style={{
                backgroundColor: "#f6f7f9",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                width: "100%",
                minHeight: "350px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginBottom: "35px",
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <img
                  src={`${imageURL}courses-images/${course.imageCourse?.replace(
                    "/uploads/ImageCourse/",
                    ""
                  )}`}
                  alt={course.imageCourse}
                  style={{
                    borderRadius: "8px",
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{
                  flex: 1,
                  fontSize: "13px",
                  color: "#666",
                  height: "100px", 
                  overflow: "hidden", 
                }}
                onBlur={(e) => {
                  console.log("Element lost focus");
                }}
                tabIndex={0} 
                role="text" 
              >
                {course.description.slice(0, 77)}{"..."}
              </div>
              <div className="flex items-center">
                <Link to={`/Dashbord/courses/${course._id}`}>
                  <Button
                    size="small"
                    style={{
                      backgroundColor: "#4261ee",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    
                      marginLeft: "1rem",
                    }}
                  >
                    View Course
                  </Button>
                </Link>
                <div className="dropdown ml-2">
                  <Dropdown
                    placement="bottom-start"
                    btnClassName="btn p-0 rounded-none border-0 shadow-none dropdown-toggle text-black dark:text-white-dark hover:text-primary dark:hover:text-primary"
                    button={
                      <Button
                        size="small"
                        style={{ marginLeft: "5px"}}
                        className="p-0"
                      >
                        <IconHorizontalDots />
                      </Button>
                    }
                  >
                    <ul className="!min-w-[130px]">
                      <li>
                        <button
                          onClick={() =>
                            navigate(`/Dashbord/courses/${course._id}/edit`, {
                              state: { course },
                            })
                          }
                          type="button"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          Editor Text
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => showModalEditTitleCourse(course)}
                          type="button"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <IconPencil className="w-5 h-5" />
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() =>
                            confirmDeleteCourse(course._id, course.title)
                          }
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <IconTrashLines className="w-5 h-5" />
                          Delete
                        </button>
                      </li>
                    </ul>
                  </Dropdown>
                </div>
              </div>
            </Card>
          </Col>
        ))}
        {titleCourses.length > itemsPerPage && (
          <Pagination
            className="custom-pagination"
            current={currentPage}
            pageSize={itemsPerPage}
            total={titleCourses.length}
            onChange={handlePageChange}
          />
        )}
      </Row>

      <ModalCreateCoursePDF
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        setTitleCourses={setTitleCourses}
      />
      <ModalEditTitleCourse
        setTitleCourses={setTitleCourses}
        isModalEditTitleOpen={isModalEditTitleOpen}
        editTitleCourse={editTitleCourse}
        handleEditCancel={handleEditCancel}
      />
    </div>
  );
}

export default UploadPdfCourses;
