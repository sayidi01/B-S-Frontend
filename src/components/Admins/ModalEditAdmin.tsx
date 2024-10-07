import React, { useCallback, useEffect, useState } from "react";
import { Input, Modal } from "antd";
import axiosInstance from "../../config/Api";
import { toast } from "react-hot-toast";
import { useUserContext } from "../../config/UserContext";
import { Admin, FormData } from "./ModalCreateAdmin";

interface ModalEditAdminProps {
  isModalEditOpen: boolean;
  handleEditCancel: () => void;
  setListAdmins: React.Dispatch<React.SetStateAction<Admin[]>>;
  editAdmin: Admin | null;
}

const ModalEditAdmin: React.FC<ModalEditAdminProps> = ({
  isModalEditOpen,
  handleEditCancel,
  setListAdmins,
  editAdmin,
}) => {
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    if (editAdmin) {
      setFormData({
        fullName: editAdmin.fullName,
        email: editAdmin.email,
        password: editAdmin.password,
        phone: editAdmin.phone,
      });
    }
  }, [editAdmin]);

  const handleChangeEditAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSumbit = useCallback(() => {
    if (!editAdmin) {
      console.error("No admin selected for editing.");
      return;
    }

    axiosInstance
      .put(`/admin/${editAdmin._id}`, { ...formData })
      .then(({ data }) => {
        console.log(data);
        setListAdmins((prev) => prev.map((admin) => admin._id === editAdmin._id?{ ...admin, ...formData } : admin))
        toast.success("Admin updated successfully");
        handleEditCancel();
      })
      .catch((err) => {
        toast.error("Error in updating Admin", err);
      });
  }, [formData, setListAdmins, editAdmin]);

  return (
    <div>
      <Modal
        title="Edit Admin"
        open={isModalEditOpen}
        onCancel={handleEditCancel}
        onOk={handleSumbit}
      >
        {formData && (
          <>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChangeEditAdmin}
              placeholder="Full Name"
            />
            <Input
              name="email"
              type="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChangeEditAdmin}
              style={{ marginTop: "23px" }}
            />
            <Input
              name="password"
              value={formData.password}
              type="password"
              onChange={handleChangeEditAdmin}
              placeholder="Password"
              style={{ marginTop: "23px" }}
            />
            <Input
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChangeEditAdmin}
              style={{ marginTop: "23px" }}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default ModalEditAdmin;
