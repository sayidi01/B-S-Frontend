import React, { useCallback, useContext, useState } from 'react';
import { Input, Modal } from 'antd';
import axiosInstance from '../../config/Api';
import { toast } from 'react-hot-toast';
import UserContext from '../../config/UserContext';
import { useUserContext } from '../../config/UserContext';

interface ModalCreateAdminProps {
    isModalOpen: boolean;
    handleCancel: () => void;
}

interface FormData {
    fullName: string;
    email: string;
    password: string;
    phone: number;
    
}

const ModalCreateAdmin: React.FC<ModalCreateAdminProps> = ({ isModalOpen, handleCancel }) => {
    const { data } = useUserContext();

    const [formdata, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        password: '',
        phone: 0,
       
    });

    console.log(formdata)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handlesubmit = useCallback(() => {
        if (!data) {
            toast.error('Admin data is not available');
            return;
        }
        axiosInstance
            .post('/admin', { ...formdata, adminData: data })
            .then(({ data }) => {
                console.log(data);
                toast.success('Create new Admin  Successfully');
                handleCancel();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Error in Create New Admin');
            });
    }, [formdata, data]);

    return (
        <Modal title="Create New Admin" open={isModalOpen} onCancel={handleCancel} onOk={handlesubmit}>
            <Input name="fullName" value={formdata.fullName} onChange={handleChange} placeholder="Full Name" />
            <Input name="email" type="email" value={formdata.email} placeholder="Email" onChange={handleChange} style={{ marginTop: '23px' }} />
            <Input name="password" value={formdata.password} type="password" onChange={handleChange} placeholder="Password" style={{ marginTop: '23px' }} />
            <Input placeholder="Phone" name="phone" value={formdata.phone} onChange={handleChange} style={{ marginTop: '23px' }} />
        </Modal>
    );
};

export default ModalCreateAdmin;
