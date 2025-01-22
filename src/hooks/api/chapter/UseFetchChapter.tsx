import { useCallback, useEffect, useState } from "react";
import { useUserContext } from "../../../config/UserContext";
import { IChapter } from "../../../types/chapter";

interface CreateChapterResponse {
  data: {
    chapter: IChapter;
  };
}

export default function useFetchChapterData(id: string | undefined) {
  const { chapterApiClient } = useUserContext();

  const [chapterData, setChapterData] = useState<null | IChapter[]>(null);

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

  return { chapterData, error, isLoading, setError,createChapter };
}
