import React, { useEffect, useState } from "react";
import ModalCreateTeacher from "./ModalCreateTeacher";
import { Teacher } from "./typesTeacher";
import { useUserContext } from "../../config/UserContext";
import { toast } from "react-hot-toast";
import axiosInstance from "../../config/Api";
import { Avatar } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

function ListTeacher() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isConnected } = useUserContext();

  const [listTeachers, setListTeachers] = useState<Teacher[]>([]);

  const [visiblePasswords, setVisiblePasswords] = useState<{
    [key: string]: boolean;
  }>({});

  const showModal = () => {
    setIsModalOpen(true);
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

  return (
    <div className="table-responsive mb-5">
      <div className="flex justify-between items-center">
        <button type="button" className="btn btn-primary" onClick={showModal}>
          Add New
        </button>
        <input
          type="text"
          placeholder="Search Attendees..."
          className="form-input w-48 shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
        />
      </div>
      <table className="table-hover mt-7">
        <thead>
          <tr>
            <th>Avatar</th>
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
                <Avatar style={{ backgroundColor: "#87d068" }}>
                  {teacher.firstName.charAt(0).toUpperCase()}
                </Avatar>
              </td>
              <td>{teacher.firstName}</td>
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
                <EditOutlined
                  style={{
                    color: "blue",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  className="cursor-pointer mx-2"
                />
                <DeleteOutlined
                  className="cursor-pointer mx-2"
                  style={{
                    color: "red",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalCreateTeacher
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    </div>
  );
}

export default ListTeacher;
