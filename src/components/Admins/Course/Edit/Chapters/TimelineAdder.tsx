import { useState } from "react";
import { Select } from "antd";
import { IChapter, SingleChapterView } from "../../../../../types/chapter";
import { capitalize } from "lodash";
import {
  prepareChapterTimelineUpdate,
  prepareChapterViewTimelineUpdate,
} from "../../../../../hooks/api/chapter/UseFetchChapter";
import { useUserContext } from "../../../../../config/UserContext";
import toast from "react-hot-toast";
import { useCourse } from "../../../SingleCourse";
import {
  LessonTimelineItem,
  QuizTimelineItem,
  TimelineItem,
} from "../../../../../types/course";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  chapter: SingleChapterView;
}

function TimelineAdder({ chapter }: Props) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const { courseDetails } = useCourse();
  const queryClient = useQueryClient();

  const { chapterApiClient } = useUserContext();

  console.log("courseDetails", courseDetails);

  console.log(courseDetails?.timeline, "courseDetails timeline");

  const handleOptionClick =
    (resource: QuizTimelineItem | LessonTimelineItem) => () => {
      if (!courseDetails) {
        return;
      }
      const updatedTimeline: (QuizTimelineItem | LessonTimelineItem)[] = (
        chapter.timeline as unknown as (QuizTimelineItem | LessonTimelineItem)[]
      ).concat([
        {
          _id: resource._id,
          type: resource.type,
          data: resource.data,
          
        } as QuizTimelineItem | LessonTimelineItem,
      ]);
  
      const preparedTimeline = prepareChapterViewTimelineUpdate(
        updatedTimeline as unknown as TimelineItem[]
      );

      chapterApiClient
        .updateTimeline(chapter.courseId, chapter._id, preparedTimeline)
        .then(() => {
          toast.success("Lesson/Quiz added to timeline successfully");
          queryClient.refetchQueries({
            queryKey: ["courseData", courseDetails.courseData._id ],
          });
        })
        .catch((error) => {
          console.error("Failed to add lesson/quiz to timeline:", error);
          toast.error("Failed to add lesson/quiz to timeline");
        })
        .finally(() => {
          setIsOptionsOpen(false);
        });
    };

    const handleSelectChange = (value: string) => {
      const selectedResource = courseDetails?.timeline
        .filter((element): element is TimelineItem => !!element)
        .find((resource) => resource.data._id === value);
    
      if (selectedResource) {
        handleOptionClick(
          selectedResource as unknown as QuizTimelineItem | LessonTimelineItem
        )();
      }
    };

  const handleToggleOptionsView = () => {
    setIsOptionsOpen((prev) => !prev);
  };


  return (
    <>
      <div className="flex justify-end">
        <button
          className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition-colors duration-200 mb-3"
          onClick={handleToggleOptionsView}
        >
          {isOptionsOpen ? "Close" : "Add Lesson / Quiz"}
        </button>
      </div>

      {isOptionsOpen && (
        <Select
          style={{ width: "100%" }}
          placeholder="Add lesson/quiz to timeline"
          onChange={handleSelectChange}
        >
          {courseDetails?.timeline
            .filter(
              (resource): resource is TimelineItem =>
                (resource?.type === "quiz" || resource?.type === "lesson") &&
                !!resource.data &&
                !!resource.data._id
            )
            
            .map((resource) => (
              
              <Select.Option key={resource.data._id} value={resource.data._id}>
                <span>
                  {capitalize(resource.type) + ": "}
                  {resource.type === "quiz"
                    ? resource.data.name
                    : resource.type === "lesson"
                    ? resource.data.title
                    : "Untitled"}
                </span>
              </Select.Option>
            ))}
        </Select>
      )}
    </>
  );
}

export default TimelineAdder;
