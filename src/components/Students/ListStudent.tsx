import React, { useCallback, useEffect, useState } from "react";

import { useUserContext } from "../../config/UserContext";
import { toast } from "react-hot-toast";
import { Pagination } from 'antd';
import axiosInstance from "../../config/Api";
import { Avatar } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Student, StudentResponse } from "./typesStudent";

import Index from "../../pages/Index";

import ModalCreateStudent from "./ModalCreateStudent";

import ModalEditStudent from "./ModalEditStudent";

function ListStudent() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalEditOpen, setIsModaEditlOpen] = useState<boolean>(false);

  const { isConnected } = useUserContext();

  const [listStudents, setListStudents] = useState<Student[]>([]);

  const [editStudent, setEditStudent] = useState<Student | null>(null);


  const [searchStudent, setSearchStudent] = useState<string>("");

  


  const [visiblePasswords, setVisiblePasswords] = useState<{
    [key: string]: boolean;
  }>({});

  console.log(listStudents)

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

 

  console.log(listStudents.length)


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
          console.error(
            "Erreur lors de la récupération des ètudiants",
            error
          );
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
        setListStudents((prev) => prev.filter((student) => student._id != studentId));
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

  },[searchStudent])

 

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
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        {listStudents.map((student) => (
            <tr key={student._id}>
             
             <td>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar style={{ backgroundColor: "darkolivegreen", marginRight: "10px" }}>
              {student.firstName.charAt(0).toUpperCase()}
            </Avatar>
            <span>{student.firstName}</span>
          </div>
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
              <td className="text-center">
                <EditOutlined
                  onClick={() => showModalEditStudent(student)}
                  style={{
                    color: "blue",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  className="cursor-pointer mx-2"
                />
                <DeleteOutlined
                  onClick={() => deleteStudent(student._id)}
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
      <ModalCreateStudent
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        setListStudents={setListStudents}
        setVisiblePasswords={setVisiblePasswords}
      />
      <ModalEditStudent
       setListStudents={setListStudents}
       isModalEditOpen={isModalEditOpen}
       handleEditCancelStudent={ handleEditCancelStudent} 
       editStudent={editStudent}          
      />
     
    
    </div>
  );
}

export default ListStudent;
