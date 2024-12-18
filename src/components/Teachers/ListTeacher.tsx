import React, { useCallback, useEffect, useMemo, useState } from "react";
import ModalCreateTeacher from "./ModalCreateTeacher";
import ModalEditTeacher from "./ModalEditTeacher";
import { Teacher, TeacherResponse } from "./typesTeacher";
import { useUserContext } from "../../config/UserContext";
import { toast } from "react-hot-toast";
import axiosInstance, { imageURL } from "../../config/Api";
import { Modal, Pagination } from "antd";
import IconTrashLines from "../Icon/IconTrashLines";
import IconPencil from "../Icon/IconPencil";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import IconEdit from "../Icon/IconEdit";

const itemsPerPage = 9;

function ListTeacher() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isModalEditOpen, setIsModaEditlOpen] = useState<boolean>(false);
  const { isConnected } = useUserContext();

  const [listTeachers, setListTeachers] = useState<Teacher[]>([]);

  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);

  const [searchTeacher, setSearchTeacher] = useState<string>("");

  const [visiblePasswords, setVisiblePasswords] = useState<{
    [key: string]: boolean;
  }>({});

  const [currentPage, setCurrentPage] = useState(1);

  const paginatedTeachers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return listTeachers.slice(startIndex, startIndex + itemsPerPage);
  }, [listTeachers, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log(listTeachers);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalEdit = (teacher: Teacher) => {
    setEditTeacher(teacher);
    setIsModaEditlOpen(true);
  };

  const handleEditCancel = () => {
    setIsModaEditlOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputSearchTeachers = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { target } = event;
    setSearchTeacher(target.value);
  };

  const togglePasswordVisibility = (email: string) => {
    setVisiblePasswords((prevState) => ({
      ...prevState,
      [email]: !prevState[email],
    }));
  };

  // GET ALL TEACHERS

  useEffect(() => {
    if (isConnected) {
      axiosInstance
        .get<Teacher[]>("/teacher")
        .then(({ data }) => {
          console.log(data);
          setListTeachers(data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des Professeurs",
            error
          );
        });
    }
  }, [isConnected]);

  // DELETE TEACHER BY ID

  const deleteTeacher = useCallback((teacherId: string) => {
    if (!teacherId) {
      console.error("L'identifiant Professeur est requis.");
      return;
    }
    console.log("Suppression Professeur avec l'ID:", teacherId);
    axiosInstance
      .delete(`/teacher/${teacherId}`)
      .then((data) => {
        console.log(data);
        setListTeachers((prev) =>
          prev.filter((teacher) => teacher._id != teacherId)
        );
        console.log(data);
        toast.success("Teacher successfully deleted");
      })
      .catch((err) => {
        toast.error("Erreur lors de la suppression Professeur", err);
      });
  }, []);

  // SEARCH TEACHER BY QUERY

  useEffect(() => {
    if (searchTeacher) {
      axiosInstance
        .get<TeacherResponse>(`/teacher/search?query=` + searchTeacher)
        .then(({ data }) => {
          console.log(data);
          setListTeachers(data.teachers);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchTeacher]);

  // CONFIRMATION MODAL DELTE TEACHER

  const confirmDeleteTeacher = (teacherId: string) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this Teacher?",
      onOk: () => {
        deleteTeacher(teacherId);
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
          type="text"
          value={searchTeacher}
          onChange={handleInputSearchTeachers}
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
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTeachers.map((teacher) => (
            <tr key={teacher._id}>
              <td className="flex items-center">
                <span className="flex justify-center items-center w-12 h-12 text-center rounded-full bg-teal-400 text-xl text-white mr-3">
                  {teacher.image ? (
                    <img
                      src={`${imageURL}teachers-images/${teacher.image}`}
                      alt="Teacher Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    teacher.firstName.charAt(0).toUpperCase()
                  )}
                </span>
                {teacher.firstName}
              </td>
              <td>{teacher.lastName}</td>
              <td>{teacher.email}</td>
              <td>
                <input
                  type={visiblePasswords[teacher.email] ? "text" : "password"}
                  value={teacher.password}
                  readOnly
                  className="bg-transparent border-none"
                />
                {visiblePasswords[teacher.email] ? (
                  <EyeInvisibleOutlined
                    onClick={() => togglePasswordVisibility(teacher.email)}
                    className="cursor-pointer ml-2"
                  />
                ) : (
                  <EyeOutlined
                    onClick={() => togglePasswordVisibility(teacher.email)}
                    className="cursor-pointer ml-2"
                  />
                )}
              </td>
              <td>{teacher.phone}</td>
              <td className="text-center">
                <div
                  onClick={() => showModalEdit(teacher)}
                  className="cursor-pointer mx-2 inline-block"
                >
                   <IconEdit className="w-5 h-5"  />
                </div>

                <div
                  onClick={() => confirmDeleteTeacher(teacher._id)}
                  className="cursor-pointer mx-2 inline-block"
                >
                  <IconTrashLines className="w-5 h-5" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        {listTeachers.length > itemsPerPage && (
          <Pagination
            className="custom-pagination"
            current={currentPage}
            pageSize={itemsPerPage}
            total={listTeachers.length}
            onChange={handlePageChange}
          />
        )}
      </table>
      <ModalCreateTeacher
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        setListTeachers={setListTeachers}
        setVisiblePasswords={setVisiblePasswords}
      />
      <ModalEditTeacher
        isModalEditOpen={isModalEditOpen}
        handleEditCancel={handleEditCancel}
        editTeacher={editTeacher}
        setListTeachers={setListTeachers}
      />
    </div>
  );
}

export default ListTeacher;
