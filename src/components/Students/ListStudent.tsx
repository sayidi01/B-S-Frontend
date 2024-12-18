import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useUserContext } from "../../config/UserContext";
import { toast } from "react-hot-toast";
import { Modal, Pagination } from "antd";
import axiosInstance, { imageURL } from "../../config/Api";

import IconTrashLines from "../Icon/IconTrashLines";

import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Student, StudentResponse } from "./typesStudent";

import ModalCreateStudent from "./ModalCreateStudent";

import ModalEditStudent from "./ModalEditStudent";
import { formatDistance, isPast } from "date-fns";
import IconEdit from "../Icon/IconEdit";
import { ICourse } from "../../types/course";

const itemsPerPage = 9;

function ListStudent() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalEditOpen, setIsModaEditlOpen] = useState<boolean>(false);

 

  const { isConnected, courses, setCourses } = useUserContext();

  const [listStudents, setListStudents] = useState<Student[]>([]);

  const [editStudent, setEditStudent] = useState<Student | null>(null);

  const [searchStudent, setSearchStudent] = useState<string>("");

  const [visiblePasswords, setVisiblePasswords] = useState<{
    [key: string]: boolean;
  }>({});

  const [currentPage, setCurrentPage] = useState(1);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return listStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [listStudents, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log(listStudents);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalEditStudent = (student: Student) => {
    setEditStudent(student);
    setIsModaEditlOpen(true);
  };

  const handleEditCancelStudent = () => {
    setIsModaEditlOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const togglePasswordVisibility = (email: string) => {
    setVisiblePasswords((prevState) => ({
      ...prevState,
      [email]: !prevState[email],
    }));
  };

  const handleInputSearchStudents = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { target } = event;
    setSearchStudent(target.value);
  };

  console.log(listStudents.length);


  // GET ALL COURSES 

  useEffect(() => {
    axiosInstance
      .get<ICourse[]>("/course/title")
      .then(({ data }) => {
        console.log("Data loaded:", data);
        setCourses(data);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
      });
  }, []);


  // GET COURSE TITLE STUDENT 

  const getCourseTitles = (courseIds: string[]): string => {
    if (!Array.isArray(courseIds)) {
      console.error("courseIds doit être un tableau mais est :", courseIds);
      return "Aucun cours";
    }
  
    const titles = courseIds
      .map((courseId) => courses.find((course) => course._id === courseId)?.title)
      .filter((title) => title); 
  
    return titles.length > 0 ? titles.join(", ") : "No Courses";
  };





  // GET ALL STUDENTS

  useEffect(() => {
    if (isConnected) {
      axiosInstance
        .get<Student[]>("/student")
        .then(({ data }) => {
          console.log(data);
          setListStudents(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des ètudiants", error);
        });
    }
  }, [isConnected]);

  // DELETE STUDENT BY ID

  const deleteStudent = useCallback((studentId: string) => {
    if (!studentId) {
      console.error("L'identifiant étudiant est requis.");
      return;
    }
    console.log("Suppression étudiant avec l'ID:", studentId);
    axiosInstance
      .delete(`/student/${studentId}`)
      .then((data) => {
        console.log(data);
        setListStudents((prev) =>
          prev.filter((student) => student._id != studentId)
        );
        console.log(data);
        toast.success("Student successfully deleted");
      })
      .catch((err) => {
        toast.error("Erreur lors de la suppression étudiant", err);
      });
  }, []);

  // SEARCH STUDENT BY QUERY

  useEffect(() => {
    if (searchStudent) {
      axiosInstance
        .get<StudentResponse>(`/student/search?query=` + searchStudent)
        .then(({ data }) => {
          console.log(data);
          setListStudents(data.students);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchStudent]);

  // CONFIRAMTION MODAL DELTE Student

  const confirmDeleteStudent = (studentId: string) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this Student?",
      onOk: () => {
        deleteStudent(studentId);
      },
    });
  };

  return (
    <div className="table-responsive mb-5">
      <div className="flex justify-between items-center">
        <button type="button" className="btn btn-primary" onClick={showModal}>
          Add New
        </button>
        <input
          value={searchStudent}
          onChange={handleInputSearchStudents}
          type="text"
          placeholder="Search Attendees..."
          className="form-input w-48 shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
        />
      </div>
      <table className="table-hover mt-7">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Courses</th>
            <th>Expiry Date</th>

            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStudents.map((student) => (
            <tr key={student._id}>
              <td className="flex items-center">
                <span className="flex justify-center items-center w-12 h-12 text-center rounded-full bg-green-400 text-xl text-white mr-3">
                  {student.image ? (
                    <img
                      src={`${imageURL}students-images/profiles/${student.image}`}
                      alt="Student Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    student.firstName.charAt(0).toUpperCase()
                  )}
                </span>
                {student.firstName}
              </td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>
                <input
                  type={visiblePasswords[student.email] ? "text" : "password"}
                  value={student.password}
                  readOnly
                  className="bg-transparent border-none"
                />
                {visiblePasswords[student.email] ? (
                  <EyeInvisibleOutlined
                    onClick={() => togglePasswordVisibility(student.email)}
                    className="cursor-pointer ml-2"
                  />
                ) : (
                  <EyeOutlined
                    onClick={() => togglePasswordVisibility(student.email)}
                    className="cursor-pointer ml-2"
                  />
                )}
              </td>
              <td>{student.phone}</td>
              <td>{getCourseTitles(student.myCourses)}</td>
              <td>
                {student.accountExpiryDate && isPast(student.accountExpiryDate)
                  ? `Expired ${formatDistance(
                      student.accountExpiryDate,
                      new Date()
                    )}`
                  : student.accountExpiryDate
                  ? formatDistance(
                      student.accountExpiryDate,
                      new Date()
                    ).concat(" remaining..")
                  : null}
              </td>
              <td className="text-center">
                <div
                  onClick={() => showModalEditStudent(student)}
                  className="cursor-pointer mx-2 inline-block"
                >
                  <IconEdit className="w-5 h-5" />
                </div>

                <div
                  onClick={() => confirmDeleteStudent(student._id)}
                  className="cursor-pointer mx-2 inline-block"
                >
                  <IconTrashLines className="w-5 h-5" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        {listStudents.length > itemsPerPage && (
          <Pagination
            className="custom-pagination"
            current={currentPage}
            pageSize={itemsPerPage}
            total={listStudents.length}
            onChange={handlePageChange}
          />
        )}
      </table>
      <ModalCreateStudent
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        setListStudents={setListStudents}
        setVisiblePasswords={setVisiblePasswords}
      />
      <ModalEditStudent
        setListStudents={setListStudents}
        isModalEditOpen={isModalEditOpen}
        handleEditCancelStudent={handleEditCancelStudent}
        editStudent={editStudent}
      />
    </div>
  );
}

export default ListStudent;
