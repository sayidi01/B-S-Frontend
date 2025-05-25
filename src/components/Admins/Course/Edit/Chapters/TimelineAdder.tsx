import { useState } from "react";
import { Select } from "antd";
import { IChapter } from "../../../../../types/chapter";
import { capitalize } from "lodash";
import { prepareChapterTimelineUpdate } from "../../../../../hooks/api/chapter/UseFetchChapter";
import { useUserContext } from "../../../../../config/UserContext";
import toast from "react-hot-toast";
import { useCourse } from "../../../SingleCourse";

interface Props {
  chapter: IChapter;
}

function TimelineAdder({ chapter }: Props) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const { courseDetails } = useCourse();

  const { chapterApiClient } = useUserContext();

  const handleOptionClick = (resource: IChapter["timeline"][number]) => () => {
    const updatedTimeline = chapter.timeline.concat(resource);
    const preparedTimeline = prepareChapterTimelineUpdate(updatedTimeline);

    chapterApiClient
      .updateTimeline(chapter.courseId, chapter._id, preparedTimeline)
      .then(() => {
        toast.success("Lesson/Quiz added to timeline successfully");
      })
      .catch((error) => {
        console.error("Failed to add lesson/quiz to timeline:", error);
        toast.error("Failed to add lesson/quiz to timeline");
      })
      .finally(() => {
        setIsOptionsOpen(false);
      });
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
          {isOptionsOpen ? "Close" : "Add Lesson/Quiz"}
        </button>
      </div>

      {isOptionsOpen && (
        <Select
          style={{ width: "100%" }}
          placeholder="Add lesson/quiz to timeline"
        >
          {courseDetails.timeline.map((resource) => (
            <Select.Option key={resource._id} value={resource._id}>
              <span onClick={handleOptionClick(resource)}>
                {capitalize(resource.elementName) + ": "}
                {resource.elementName === "lesson"
                  ? resource.title
                  : resource.elementName === "quiz"
                  ? resource.name
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
