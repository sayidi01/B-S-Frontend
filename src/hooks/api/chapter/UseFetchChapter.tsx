import { useCallback, useEffect, useState } from "react";
import { useUserContext } from "../../../config/UserContext";
import { IChapter, SingleChapterView } from "../../../types/chapter";
import { toast } from "react-hot-toast";
import { useCourse } from "../../../components/Admins/SingleCourse";
import {
  ICourse,
  TimelineItem,
  TimelineReference,
} from "../../../types/course";
import { ChapterTimelineEdit } from "../../../api/ChapterAPIClient";
import { useQueryClient } from "@tanstack/react-query";

interface CreateChapterResponse {
  data: {
    chapter: SingleChapterView;
  };
  courseDetails?: ICourse;
}

interface DeleteChapterResponse {
  data: {
    chapter: IChapter;
  };
  courseDetails?: ICourse;
}

const moveItem = function <T>(arr: T[], fromIndex: number, toIndex: number) {
  const item = arr.splice(fromIndex, 1)[0];
  arr.splice(toIndex, 0, item);
  return arr;
};

export default function useFetchChapterData(id: string | undefined) {
  const { chapterApiClient } = useUserContext();
  const { updateCourseDetails, courseDetails } = useCourse();
  const queryClient = useQueryClient();

  const [chapterData, setChapterData] = useState<null | SingleChapterView[]>(
    null
  );
  const [singleChapterData, setSingleChapterData] =
    useState<null | SingleChapterView>(null);

  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("Course ID is undefined");
      return;
    }

    setIsLoading(true);
    chapterApiClient
      .getAllChapterDataById(id)
      .then((response) => {
        const data = response as { data: { chapters: SingleChapterView[] } };
        setChapterData(data.data.chapters);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching chapters:", err);
        setError("Failed to retrieve chapter data");
        setChapterData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, chapterApiClient, courseDetails]);

  const getSingleChapter = useCallback(
    async (courseId: string, chapterId: string) => {
      setIsLoading(true);
      try {
        const response = await chapterApiClient.getSingleChapter(
          courseId,
          chapterId
        );
        setSingleChapterData(
          (response as { data: { chapter: SingleChapterView } }).data.chapter
        );
        setError(null);
      } catch (err) {
        console.error("Error fetching single chapter:", err);
        setError("Failed to retrieve single chapter data");
        setSingleChapterData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [chapterApiClient]
  );

  const createChapter = useCallback(
    async (title: string, courseId: string) => {
      setIsLoading(true);
      try {
        const response = (await chapterApiClient.createChapter(
          courseId,
          title
        )) as CreateChapterResponse;

        queryClient.refetchQueries({
          queryKey: ['courseData', courseId],
        });

        console.log("response", response);

        setChapterData((prev) => {
          if (prev) {
            return [...prev, response.data.chapter];
          } else {
            return [response.data.chapter];
          }
        }); // @TODO to recheck

        setError(null);
      } catch (err) {
        setError("Failed to create chapter");
        console.error("Error creating chapter:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [chapterApiClient]
  );

  const deleteChapter = useCallback(
    async (courseId: string, chapterId: string) => {
      setIsLoading(true);
      try {
        const response = (await chapterApiClient.deleteChapter(
          courseId,
          chapterId
        )) as DeleteChapterResponse;

        setChapterData((prev) =>
          prev ? prev.filter((chapter) => chapter._id !== chapterId) : []
        );

        if (response.courseDetails) {
          updateCourseDetails(response.courseDetails);
        }

        setError(null);
        toast.success("Chapter deleted Successfully!");
      } catch (err) {
        setError("Failed to delete chapter");
        console.error("Error deleting chapter:", err);
        toast.error("Failed to delete chapter");
      } finally {
        setIsLoading(false);
      }
    },
    [chapterApiClient, setChapterData, updateCourseDetails]
  );

  const updateChapter = useCallback(
    async (courseId: string, chapterID: string, title: string) => {
      console.log(courseId);
      setIsLoading(true);
      try {
        const response = (await chapterApiClient.updateChapter(
          courseId,
          chapterID,
          title
        )) as CreateChapterResponse;

        setChapterData((prev) =>
          prev
            ? prev.map((chapter) =>
                chapter._id === chapterID ? { ...chapter, title } : chapter
              )
            : []
        );

        if (response.courseDetails) {
          updateCourseDetails(response.courseDetails);
        }

        setError(null);
        toast.success("Chapter Updated Successfully!");
      } catch (err) {
        setError("Failed to update chapter");
        console.error("Error updating chapter:", err);
        toast.error("Failed to update chapter");
      } finally {
        setIsLoading(false);
      }
    },
    [chapterApiClient, setChapterData, updateCourseDetails]
  );

  const handleMoveOrderQuiz = (
    quizIndex: number,
    chapterId: string,
    direction: "up" | "down"
  ) => {
    if (!chapterData) return;

    let newIndex = quizIndex + (direction === "up" ? -1 : 1);
    if (newIndex < 0) {
      console.error(`Error: newIndex is less than 0`);
      return;
    }

    const chapter = chapterData.find((chapter) => chapter._id === chapterId);
    if (!chapter) {
      console.error(`Error: Chapter with ID ${chapterId} not found`);
      return;
    }
    const updatedChapterTimeline = moveItem<
      SingleChapterView["timeline"][number]
    >(chapter.timeline, quizIndex, newIndex);
    if (updatedChapterTimeline.length !== chapter.timeline.length) {
      console.error(
        `Error: Timeline length mismatch after moving quiz from index ${quizIndex} to ${newIndex}`
      );
      return;
    }

    console.log("updatedChapterTimeline", updatedChapterTimeline, chapterId);

    setChapterData(
      (prev) =>
        prev?.map((chapter) => {
          if (chapter._id === chapterId) {
            return { ...chapter, timeline: updatedChapterTimeline };
          }
          return chapter;
        }) || null
    );

    const updatedTimeline = prepareChapterViewTimelineUpdate(
      updatedChapterTimeline as unknown as TimelineItem[]
    );

    console.log("updatedTimeline", updatedTimeline);

    chapterApiClient
      .updateTimeline(chapter.courseId, chapterId, updatedTimeline)
      .then(() => {
        toast.success("Order updated successfully!");

        queryClient.refetchQueries({
          queryKey: ["courseData", id],
        });
      })
      .catch((err) => {
        console.error("Error updating order:", err);
        toast.error("Failed to update order");
      });
  };

  return {
    chapterData,
    error,
    isLoading,
    setError,
    createChapter,
    deleteChapter,
    updateChapter,
    getSingleChapter,
    singleChapterData,
    handleMoveOrderQuiz,
  };
}

export const prepareChapterTimelineUpdate = (
  timeline: TimelineReference[]
): ChapterTimelineEdit => {
  return timeline
    .filter((item) => item)
    .map((item) => ({
      elementName: item.elementName as any,
      id: item.id,
    }));
};

export const prepareChapterViewTimelineUpdate = (
  timeline: TimelineItem[]
): ChapterTimelineEdit => {
  console.log("timeline", timeline);
  return timeline
    .filter((item): item is TimelineItem => !!item)
    .map((item) => ({
      elementName:
        "elementName" in item ? item.elementName : (item as any).type,
      id: "data" in item
        ? (item as any).data._id
        : "_id" in item
        ? (item as any)._id
        : (item as any).id,
    }));
};

