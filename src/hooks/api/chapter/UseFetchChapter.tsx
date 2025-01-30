import { useCallback, useEffect, useState } from "react";
import { useUserContext } from "../../../config/UserContext";
import { IChapter } from "../../../types/chapter";
import { toast } from "react-hot-toast";


interface CreateChapterResponse {
  data: {
    chapter: IChapter;
  };
}

export default function useFetchChapterData(id: string | undefined) {
  const { chapterApiClient } = useUserContext();

  const [chapterData, setChapterData] = useState<null | IChapter[]>(null);
  const [singleChapterData, setSingleChapterData] = useState<null | IChapter>(null); 

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
        const data = response as { data: { chapters: IChapter[] } };
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
  }, [id, chapterApiClient]);



  const getSingleChapter = useCallback(
    async (courseId: string, chapterId: string) => {
      setIsLoading(true);
      try {
        const response = await chapterApiClient.getSingleChapter(courseId, chapterId);
        setSingleChapterData((response as { data: { chapter: IChapter} }).data.chapter);
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

        setChapterData((prev) => {
          if (prev) {
            return [...prev, response.data.chapter];
          } else {
            return [response.data.chapter];
          }
        });

        setError(null);
      } catch (err) {
        setError("Failed to create chapter");
        console.error("Error creating chapter:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [id, chapterApiClient]
  );

  const deleteChapter = useCallback(
    (courseId: string, chapterId: string) => {
      setIsLoading(true);
      chapterApiClient
        .deleteChapter(courseId,chapterId )
        .then(() => {
          setChapterData((prev) => {
            if (prev) {
              return prev.filter((chapter) => chapter._id !== chapterId);
            }
            return prev;
          });
          toast.success("Chapter deleted Successfully!");
        })
        .catch((err) => {
          console.error("Error deleting chapter:", err);
          setError("Failed to delete chapter");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [chapterApiClient, setChapterData]
  );

  const updateChapter = useCallback(
    (courseId: string, chapterID: string, title: string) => {
      setIsLoading(true);
      chapterApiClient
        .updateChapter(courseId, chapterID, title)
        .then(() => {
          setChapterData((prev) => {
            if (prev) {
              return prev.map((chapter) => {
                if (chapter._id === chapterID) {
                  return { ...chapter, title }; 
                }
                return chapter;
              });
            }
            return prev;
          });
          toast.success("Chapter Updated Successfully!");
         
        })
        .catch((err) => {
          console.error("Error updating chapter:", err);
          setError("Failed to update chapter");
          toast.error("Failed to update chapter");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [chapterApiClient, setChapterData]
  );
  return { chapterData, error, isLoading, setError, createChapter, deleteChapter, updateChapter, getSingleChapter, singleChapterData };
}
