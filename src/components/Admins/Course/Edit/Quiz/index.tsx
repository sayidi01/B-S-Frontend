import { useNavigate, useParams } from "react-router-dom";
import useFetchQuizzesByCourseData from "../../../../../hooks/api/course/useFetchQuizzesByCourseData";
import { BookOpen, Clock } from "lucide-react";
import IconTrashLines from "../../../../Icon/IconTrashLines";
import IconEdit from "../../../../Icon/IconEdit";
import IconEye from "../../../../Icon/IconEye";

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { courseData } = useFetchQuizzesByCourseData(id as string);

  const quizzes = courseData?.data?.quizzes || [];

  console.log(courseData);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-6">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate(`/Dashbord/courses/${id}/edit/create-quiz`)}
        >
          Add New Quiz
        </button>
      </div>
      {quizzes.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  name
                </th>
             
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  création date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quizzes.map((quiz, index) => (
                <tr
                  key={quiz._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quiz.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 flex items-center">
                      <BookOpen size={16} className="mr-2" />
                      {quiz.questions.length}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock size={16} className="mr-2" />
                      {new Date(quiz.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="hover:opacity-80 mr-3"
                      title="Voir les détails"
                      onClick={() =>
                        navigate(
                          `/Dashbord/courses/${id}/edit/quiz/${quiz._id}`
                        )
                      }
                    >
                      <IconEye />
                    </button>
                    <button className="hover:opacity-80 mr-3" title="Modifier">
                      <IconEdit />
                    </button>
                    <button className="hover:opacity-80" title="Supprimer">
                      <IconTrashLines />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-800">
            Aucun quiz n'a été créé pour le moment.
          </p>
          <p className="text-gray-600 mt-2">
            Commencez par créer un nouveau quiz en utilisant le bouton ci-dessus
            !
          </p>
        </div>
      )}
    </div>
  );
}
