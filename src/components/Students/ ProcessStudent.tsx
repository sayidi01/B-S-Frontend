import React, { useEffect, useState } from "react";

import { UnlockOutlined, LockOutlined } from "@ant-design/icons";
import IconMapPin from "../Icon/IconMapPin";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../config/UserContext";
import axiosInstance, { imageURL } from "../../config/Api";
import IconDesktop from "../Icon/IconDesktop";
import { toast } from "react-hot-toast";
import { IcourseResponse, Student } from "./typesStudent";
import CourseProgressCard from "./ CourseProgressCard";

function ProcessStudent() {
  const navigate = useNavigate();

  const { studentId } = useParams();

  const [dataStudent, setDataStudent] = useState<IcourseResponse[]>([]);

  console.log(dataStudent, "dataStudent");

  useEffect(() => {
    if (studentId) {
      axiosInstance
        .get<IcourseResponse[]>(`student/${studentId}/courses`)
        .then(({ data }) => {
          console.log(data);
          setDataStudent(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des cours", error);
          toast.error("Erreur lors de la récupération des cours");
        });
    }
  }, [studentId]);

  return (
    <div>
      <div className="panel h-full  rounded-xl overflow-hidden mt-8 bg-gray-100 shadow-sm">
        {dataStudent.map((course, index) => (
          <React.Fragment key={course._id}>
            <div className="flex items-center gap-4 p-6 ">
              <div className="w-40 h-20 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={`${imageURL}courses-images/${course.courseId.imageCourse?.replace(
                    "/uploads/ImageCourse/",
                    ""
                  )}`}
                  alt="Course"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800">
                  {course.courseId
                    ? course.courseId.title
                    : "No Title Available"}
                </p>
                <div className="text-sm text-gray-500 mt-1 flex gap-4">
                  <span className="flex items-center gap-1">
                    <UnlockOutlined />
                    {course?.creationDate
                      ? new Date(course.creationDate).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "No creation date"}
                  </span>
                  <span className="flex items-center gap-1">
                    <LockOutlined />
                    {course.expiredDateCourse
                      ? new Date(course.expiredDateCourse).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "No expiration date"}
                  </span>
                </div>
              </div>
              {/* <div className="text-right">
                <h5 className="text-gray-600 text-base"> { } Points</h5>
              </div> */}
            </div>

            <div className="px-6 py-4 mt-7">
              <CourseProgressCard
                courseId={course.courseId._id}
                studentId={studentId || ""}
              />

              <div className="flex items-center gap-3 mt-8">
                {course?.learningMode === "on-site" ? (
                  <IconMapPin className="w-5 h-5 text-gray-500" />
                ) : (
                  <IconDesktop className="w-5 h-5 text-gray-500" />
                )}
                <div className="text-gray-700 capitalize">
                  {course?.learningMode}
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-[#4361ee] text-white rounded-lg hover:bg-[#354dbf] transition"
                  onClick={() =>
                    navigate(`/Dashbord/DetailProgressCourse/${course.courseId._id}/${studentId}`)
                  }
                >
                  Progress Overview
                </button>
              </div>
            </div>

            {index !== dataStudent.length - 1 && (
              <div className="h-4 bg-gray-50"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProcessStudent;
