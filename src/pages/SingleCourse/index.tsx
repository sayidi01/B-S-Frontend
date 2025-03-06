import { useCourse } from "../../components/Admins/SingleCourse";
import { ICourse } from "../../types/course";

export default function CourseView() {
  const { course } = useCourse() as { course: ICourse  };

  console.log(course, "course");

  return (
    <iframe
      title={`Course Description `}
      srcDoc={course?.description}
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
      }}
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
