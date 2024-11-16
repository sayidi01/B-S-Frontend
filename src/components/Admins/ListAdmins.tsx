import React, { useEffect, useMemo, useState } from "react";
import ModalCreateAdmin from "./ModalCreateAdmin";
import ModalEditAdmin from "./ModalEditAdmin";
import axiosInstance, { imageURL } from "../../config/Api";
import { useCallback } from "react";

import IconTrashLines from "../Icon/IconTrashLines";
import IconPencil from "../Icon/IconPencil";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useUserContext } from "../../config/UserContext";
import { toast } from "react-hot-toast";

import { Admin } from "./ModalCreateAdmin";
import { Modal, Pagination } from "antd";

export interface AdminResponse {
  admins: Admin[];
  admin: Admin;
  image: string;
}

const itemsPerPage = 9;

const ListAdmins: React.FC = () => {
  const { isConnected, currentAdmin } = useUserContext();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isModalEditOpen, setIsModaEditlOpen] = useState<boolean>(false);

  const [editAdmin, setEditdAdmin] = useState<Admin | null>(null);

  const [searchAdmin, setSearchAdmin] = useState<string>("");

  const [listAdmins, setListAdmins] = useState<Admin[]>([]);

  const [visiblePasswords, setVisiblePasswords] = useState<{
    [key: string]: boolean;
  }>({});

  const [currentPage, setCurrentPage] = useState(1);

  const paginatedAdmins = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return listAdmins.slice(startIndex, startIndex + itemsPerPage);
  }, [listAdmins, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

  // CONFIRATION MODAL DELTE ADMIN

  const confirmDelete = (adminId: string) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this Admin ?",
      onOk: () => {
        deleteAdmin(adminId);
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
          {paginatedAdmins.length ? (
            paginatedAdmins.map((admin, index) => (
              <tr key={admin._id || index}>
                <td className="flex items-center">
                  <span className="flex justify-center items-center w-12 h-12 text-center rounded-full bg-orange-400 text-xl text-white mr-3">
                    {admin.image ? (
                      <img
                        src={`${imageURL}profile-images/${admin.image}`}
                        alt="Admin Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      admin.fullName.charAt(0).toUpperCase()
                    )}
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
                    <div
                      className="cursor-pointer"
                      onClick={() => showModalEdit(admin)}
                    >
                      <IconPencil className="w-5 h-5" fill={true} />
                    </div>
                    <div
                      className="grid place-content-center w-14 h-14 rounded-md cursor-pointer"
                      onClick={() => confirmDelete(admin._id)}
                    >
                      <IconTrashLines className="w-5 h-5" />
                    </div>
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
        {listAdmins.length > itemsPerPage ? (
          <Pagination
            className="custom-pagination"
            current={currentPage}
            pageSize={itemsPerPage}
            total={listAdmins.length}
            onChange={handlePageChange}
          />
        ) : null}
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
