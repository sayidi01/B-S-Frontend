import { useNavigate, useParams } from "react-router-dom"
import useFetchQuizzesByCourseData from "../../../../../hooks/api/course/useFetchQuizzesByCourseData";


export default function Quiz() {
  const {  id } = useParams();
  const navigate = useNavigate();

  const {courseData} = useFetchQuizzesByCourseData(id as string)

console.log(courseData)

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
       <div className="flex justify-end mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          onClick={() =>   navigate(`/Dashbord/courses/${id}/edit/create-quiz`)}
        >
          Add New Quiz
        </button>
      </div>

    

    </div>
  )
}
