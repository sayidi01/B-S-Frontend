import React, { useCallback, useEffect, useState } from "react";
import ModalCreateTeacher from "./ModalCreateTeacher";
import ModalEditTeacher from "./ModalEditTeacher";
import { Teacher, TeacherResponse } from "./typesTeacher";
import { useUserContext } from "../../config/UserContext";
import { toast } from "react-hot-toast";
import axiosInstance from "../../config/Api";
import { Avatar, Modal } from "antd";
import IconTrashLines from "../Icon/IconTrashLines";
import IconPencil from "../Icon/IconPencil";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

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
          {listTeachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    style={{ backgroundColor: "#87d068", marginRight: "10px" }}
                  >
                    {teacher.firstName.charAt(0).toUpperCase()}
                  </Avatar>
                  <span>{teacher.firstName}</span>
                </div>
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
                  <IconPencil className="w-6 h-6" fill={true} />
                </div>

                <div
                 onClick={() => confirmDeleteTeacher(teacher._id)}
                  className="cursor-pointer mx-2 inline-block"
                >
                  <IconTrashLines className="w-6 h-6" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
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
