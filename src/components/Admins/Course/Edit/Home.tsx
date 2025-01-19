import React from "react";
import { Alert, Spin, Typography } from "antd";
import useFetchCourseData from "../../../../hooks/api/course/useFetchCourseData";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;

export default function Home() {
  const { id } = useParams();
  const { courseData, error, isLoading } = useFetchCourseData(id as string);

  if (error)
    return (
      <Alert message={error || "Failed to retrieve course data"} type="error" />
    );
  if (isLoading) return <Spin />;

  if (!courseData) return null;

  return (
    <>
      <Title>{courseData.title}</Title>
      <Text>{courseData.description}</Text>
    </>
  );
}
