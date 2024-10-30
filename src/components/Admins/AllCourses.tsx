import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/Api";
import { Admin } from "./ModalCreateAdmin";
import { useUserContext } from "../../config/UserContext";

function AllCourses() {
  const [Courses, setCourses] = useState<Admin[]>([]);

  const { isConnected } = useUserContext();

  console.log(Courses)

  useEffect(() => {
    if (isConnected) {
      axiosInstance
        .get<Admin[]>("/course/pdfs")
        .then(({ data }) => {
          console.log(data);
          setCourses(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération  cours", error);
        });
    }
  }, [isConnected]);

  return <div>

  </div>;
}

export default AllCourses;
