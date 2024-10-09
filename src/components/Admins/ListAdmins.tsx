import React, { useEffect, useState } from "react";
import ModalCreateAdmin from "./ModalCreateAdmin";
import ModalEditAdmin from "./ModalEditAdmin";
import axiosInstance from "../../config/Api";
import { useCallback } from "react";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useUserContext } from "../../config/UserContext";
import { toast } from "react-hot-toast";

import { Admin } from "./ModalCreateAdmin";


export interface AdminResponse {
  admins: Admin[];
  admin: Admin
}


const ListAdmins: React.FC = () => {
  const { isConnected } = useUserContext();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isModalEditOpen, setIsModaEditlOpen] = useState<boolean>(false);

  const [editAdmin, setEditdAdmin] = useState<Admin | null>(null);

  const [searchAdmin, setSearchAdmin] = useState<string>("");

  const [listAdmins, setListAdmins] = useState<Admin[]>([]);

  const [visiblePasswords, setVisiblePasswords] = useState<{
    [key: string]: boolean;
  }>({});

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalEdit = (admin: Admin) => {
    setEditdAdmin(admin);
    setIsModaEditlOpen(true);
  };

  const handleEditCancel = () => {
    setIsModaEditlOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputSearchAdmin = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { target } = event;
    setSearchAdmin(target.value);
  };
  const togglePasswordVisibility = (email: string) => {
    setVisiblePasswords((prevState) => ({
      ...prevState,
      [email]: !prevState[email],
    }));
  };

  // GET ALL ADMINS

  useEffect(() => {
    if (isConnected) {
      axiosInstance
        .get<Admin[]>("/admin")
        .then(({ data }) => {
          console.log(data);
          setListAdmins(data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des administrateurs",
            error
          );
        });
    }
  }, [isConnected, searchAdmin]);
  


  // SEARCH ADMIN BY QUERY

  useEffect(() => {
    if (searchAdmin) {
      axiosInstance
        .get<AdminResponse>(`/admin/search?query=` + searchAdmin)
        .then(({ data }) => {
          console.log(data);
          setListAdmins(data.admins);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchAdmin]);

  // DELETE ADMIN BY ID

  const deleteAdmin = useCallback((adminId: string) => {
    if (!adminId) {
      console.error("L'identifiant de l'administrateur est requis.");
      return;
    }
    console.log("Suppression de l'administrateur avec l'ID:", adminId);
    axiosInstance
      .delete(`/admin/${adminId}`)
      .then((data) => {
        console.log(data);
        setListAdmins((prev) => prev.filter((admin) => admin._id != adminId));
        console.log(data);
        toast.success("Administrator successfully deleted");
      })
      .catch((err) => {
        toast.error("Erreur lors de la suppression de Administrateur", err);
      });
  }, []);

  return (
    <div className="table-responsive mb-5">
      <div className="flex justify-between items-center">
        <button type="button" className="btn btn-primary" onClick={showModal}>
          Add New
        </button>
        <input
          type="text"
          onChange={handleInputSearchAdmin}
          value={searchAdmin}
          placeholder="Search Attendees..."
          className="form-input w-48 shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
        />
      </div>
      <table className="table-hover mt-7">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
  {listAdmins.length > 0 ? (
    listAdmins.map((admin, index) => (
      <tr key={admin._id || index}>
        <td className="flex items-center">
          <span className="flex justify-center items-center w-12 h-12 text-center rounded-full bg-orange-400 text-xl text-white mr-3">
            {admin.fullName.charAt(0)}
          </span>
          {admin.fullName}
        </td>
        <td>{admin.email}</td>
        <td>
          {visiblePasswords[admin.email] ? admin.password : "******"}
          <button
            onClick={() => togglePasswordVisibility(admin.email)}
            className="ml-2"
          >
            {visiblePasswords[admin.email] ? (
              <EyeInvisibleOutlined />
            ) : (
              <EyeOutlined />
            )}
          </button>
        </td>
        <td>{admin.phone}</td>
        <td className="text-center">
          <div className="flex justify-center items-center space-x-3">
            <EditOutlined
              style={{
                color: "blue",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => showModalEdit(admin)}
            />
            <DeleteOutlined
              style={{
                color: "red",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => deleteAdmin(admin._id)}
            />
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={5} className="text-center">
        No Admin found
      </td>
    </tr>
  )}
</tbody>
      </table>

      <ModalCreateAdmin
        setListAdmins={setListAdmins}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        setVisiblePasswords={setVisiblePasswords}
      />
      <ModalEditAdmin
        isModalEditOpen={isModalEditOpen}
        handleEditCancel={handleEditCancel}
        editAdmin={editAdmin}
        setListAdmins={setListAdmins}
      />
    </div>
  );
};

export default ListAdmins;
