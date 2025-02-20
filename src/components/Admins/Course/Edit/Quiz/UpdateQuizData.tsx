import React, { useEffect, useState } from 'react'
import UseFetchSingleQuiz from '../../../../../hooks/api/Quiz/UseFetchSingleQuiz'
import { useParams } from 'react-router-dom'


function UpdateQuizData() {

    const {id: courseID, quizID} = useParams()

    const {quizData} = UseFetchSingleQuiz(courseID as string, quizID as string)

  

    const [editFormQuiz, setEditFormQuiz] = useState(quizData)

    console.log(editFormQuiz)

    useEffect(() => {
        setEditFormQuiz(quizData)
    },[quizData])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
     
     <input
          type="text"
          id="name"
          name="name"
          value={editFormQuiz?.name}
          className="border p-2 w-full mb-4"
          
        />
      
    </div>
  )
}

export default UpdateQuizData
