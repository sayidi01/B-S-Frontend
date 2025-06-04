import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Button, Alert, Select } from "antd";
const { TextArea } = Input;
import { toast } from "react-hot-toast";
import useFetchChapterData from "../../../../../hooks/api/chapter/UseFetchChapter";
import { ILesson } from "./TypesLessons";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  createLesson: (
    courseId: string,
    title: string,
    description: string
  ) => Promise<void>;
  lessonData: ILesson[];
  error: string | null;
  isLoading: boolean;
  deleteLesson: (lessonId: string) => void;
  onClose: () => void;
}

function CreateNewLessonPopover({
  onClose,
  createLesson,
  error,
  isLoading,
}: Props) {
  const { id: courseId } = useParams<{ id: string;  }>();

  const queryClient = useQueryClient();

  const [formDataLesson, setFormDataLesson] = useState({
    title: "",
    description: "",
   
  });
 

  console.log(formDataLesson);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormDataLesson((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateLesson = async () => {
    if (!courseId) {
      console.error("Course ID missing");
      return;
    }
   
    try {
      console.log("Payload:", formDataLesson);
    

      const response = await createLesson(
        courseId,
        formDataLesson.title,
        formDataLesson.description
      );
      console.log("Lesson Created:", response);
      toast.success("Lesson Created Successfully");

      // queryClient.refetchQueries({
      //   queryKey: ["courseData", courseId],
      // })

      onClose();
    } catch (err) {
      console.error("Error creating lesson:", err);
      toast.error("Failed to create lesson");
    }
  };
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          value={formDataLesson.title}
          onChange={handleInputChange}
          placeholder="Enter lesson title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <TextArea
          id="description"
          name="description"
          value={formDataLesson.description}
          onChange={handleInputChange}
          placeholder="Enter lesson description"
          rows={3}
        />
      </div>

      <div className="mt-3">
        <Button
          type="primary"
          onClick={handleCreateLesson}
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Create"}
        </Button>
      </div>
      {error && (
        <div className="mt-3">
          <Alert message={error} type="error" showIcon />
        </div>
      )}
    </div>
  );
}

export default CreateNewLessonPopover;
