import React, { useCallback, useEffect, useState } from "react";
import { Input, Modal, DatePicker, Select } from "antd";
import axiosInstance from "../../config/Api";
import { toast } from "react-hot-toast";
import { useUserContext } from "../../config/UserContext";
import isObject from "lodash/isObject";
import { FormDataStudent, Student } from "./typesStudent";
import type { DatePickerProps } from "antd";
import { ICourse } from "../../types/course";

interface ModalCreateStudentProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  setListStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  setVisiblePasswords: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

const ModalCreateStudent: React.FC<ModalCreateStudentProps> = ({
  isModalOpen,
  handleCancel,
  setListStudents,
  setVisiblePasswords,
}) => {
  const { data, courses, setCourses } = useUserContext();

  const [formdataStudent, setFormDataStudent] = useState<FormDataStudent>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    accountExpiryDate: "",
    myCourses: [],
    learningMode: "online",
  });

  console.log(formdataStudent);

  // Function to generate a random password Student
  const generateRandomPasswordStudent = (length: number) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  useEffect(() => {
    if (isModalOpen) {
      const generatedPassword = generateRandomPasswordStudent(10);
      setFormDataStudent((prevState) => ({
        ...prevState,
        password: generatedPassword,
      }));
    }
  }, [isModalOpen]);

  const handleChangeFormStudent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormDataStudent((prevState) => ({
      ...prevState,
      [name]:
        name === "firstName"
          ? value.charAt(0).toUpperCase() + value.slice(1)
          : value,
    }));
  };

  const handleChangeLearningMode = (value: "on-site" | "online") => {
    setFormDataStudent((prevState) => ({
      ...prevState,
      learningMode: value,
    }));
  };


  // ONCHANGE COURSE STUDENT

  const handleCourseChange = (value: string | string[]) => {
    const courses = Array.isArray(value) ? value : [value];
    setFormDataStudent((prevData) => ({
      ...prevData,
      myCourses: courses.map(courseId => ({ courseId, expiredDateCourse: "" }))
    }));
  };


  // ONCHANGE SESSION STUDENT 

  const onChange: DatePickerProps["onChange"] = (_, dateString) => {
    if (typeof dateString == "string")
      setFormDataStudent((prev) => ({
        ...prev,
        accountExpiryDate: dateString,
      }));
  };

  // ONCHANGE EXPIRED DATE COURSE STUDENT

  const onExpiredDateCourseChange: DatePickerProps["onChange"] = (
    _,
    dateString
  ) => {
    if (typeof dateString === "string") {
      setFormDataStudent((prev) => ({
        ...prev,
        myCourses: prev.myCourses.map((course, index) =>
          index === 0 ? { ...course, expiredDateCourse: dateString } : course
        ),
      }));
    }
  };

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

  // CREATE NEW STUDENT SEND EMAIL

  const handlesubmitStudent = useCallback(() => {
    if (!data || !isObject(data)) {
      toast.error("Students data is not available or not valid");
      return;
    }
    if (
      !formdataStudent.firstName ||
      !formdataStudent.lastName ||
      !formdataStudent.email ||
      !formdataStudent.phone ||
      !formdataStudent.myCourses ||
      !formdataStudent.learningMode
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    
    axiosInstance
      .post("/student", formdataStudent)
      .then(({ data }) => {
        console.log(data);
        if (
          isObject(data) &&
          "data" in data &&
          isObject(data.data) &&
          "student" in data.data &&
          isObject(data.data.student)
        ) {
          const newStudent = { ...data.data.student } as Student;

          setListStudents((prev: Student[]) => [...prev, newStudent]);
          setVisiblePasswords((prev) => ({
            ...prev,
            [newStudent.email]: false,
          }));
          toast.success("Student added successfully");
          setFormDataStudent({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
            accountExpiryDate: "",
            myCourses: [],
            learningMode: "online",
            
          });
          handleCancel();
        } else {
          toast.error("Invalid server error");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in Create New Student");
      });
  }, [formdataStudent, setListStudents]);

  return (
    <div>
      <Modal
        title="Create New Student"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handlesubmitStudent}
      >
        <Input
          name="firstName"
          placeholder="First Name"
          value={formdataStudent.firstName}
          onChange={handleChangeFormStudent}
        />
        <Input
          value={formdataStudent.lastName}
          onChange={handleChangeFormStudent}
          name="lastName"
          placeholder="Last Name"
          style={{ marginTop: "23px" }}
        />
        <Input
          name="email"
          value={formdataStudent.email}
          onChange={handleChangeFormStudent}
          type="email"
          placeholder="Email"
          style={{ marginTop: "23px" }}
        />
        <Input
          onChange={handleChangeFormStudent}
          value={formdataStudent.password}
          disabled
          name="password"
          type="password"
          placeholder="Password"
          style={{ marginTop: "23px" }}
        />
        <Input
          onChange={handleChangeFormStudent}
          value={formdataStudent.phone}
          placeholder="Phone"
          name="phone"
          style={{ marginTop: "23px" }}
        />
        <Select
          style={{ marginTop: "23px", width: "100%" }}
          placeholder="Select Learning Mode"
          value={formdataStudent.learningMode}
          onChange={handleChangeLearningMode}
        >
          <Select.Option value="on-site">On-site</Select.Option>
          <Select.Option value="online">Online</Select.Option>
        </Select>

        <Select
          style={{ marginTop: "23px", width: "100%" }}
          
          onChange={handleCourseChange}
          value={formdataStudent.myCourses.map(course => course.courseId)}  >
          <Select.Option value="">Select a course</Select.Option>

          {courses &&
            Array.isArray(courses) &&
            courses.map((course) => (
              <Select.Option key={course._id} value={course._id}>
                {course.title}
              </Select.Option>
            ))}
        </Select>
        <div className="mt-4">
          <p style={{ marginBottom: "4px" }}>Expiry Course</p>
          <DatePicker
            onChange={onExpiredDateCourseChange}
            name="expiredDateCourse"
            picker="date"
            style={{ marginTop: "0px" }} 
          />
        </div>
        <div className="mt-4">
          <p style={{ marginBottom: "4px" }}>Expiry Session</p>
          <DatePicker
            onChange={onChange}
            name="accountExpiryDate"
            picker="date"
            style={{ marginTop: "0px" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ModalCreateStudent;
