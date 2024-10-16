import React, { useState } from 'react'
import ModalCreateTeacher from './ModalCreateTeacher';

function ListTeacher() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);



  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Phone</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
       
      </tbody>
    </table>
    <ModalCreateTeacher
     isModalOpen={isModalOpen}
     handleCancel={handleCancel}
    />
   
  </div>
  )
}

export default ListTeacher
