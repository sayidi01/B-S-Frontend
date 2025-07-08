import React from "react";
import useFetchProgressStudentData from "../../hooks/api/Students/ useFetchProgressStudentData";

interface CourseProgressCardProps {
  courseId: string;
  studentId: string;
  onProgressLoaded?: (data: {
    earnedPoints: number;
    totalPoints: number;
  }) => void;
}

const CourseProgressCard: React.FC<CourseProgressCardProps> = ({
  courseId,
  studentId,
  
}) => {
  const { progress, loading } = useFetchProgressStudentData(
    courseId,
    studentId
  );

  

  return (
    <div className="-mt-12 px-8 grid gap-2">
      <div className="bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]">
        <div className="flex justify-between items-center mb-4 dark:text-white">
          <span>Your Progress</span>
          {!loading && progress && (
            <span className="text-sm text-gray-500">
              {progress.earnedPoints} / {progress.totalPoints} Points
            </span>
          )}
        </div>
        <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
          <div
            className="bg-info h-4 rounded-full text-center text-white text-xs transition-all duration-500 ease-in-out"
            style={{
              width: `${loading || !progress ? 0 : progress.progressPercent}%`,
            }}
          >
            {!loading && progress
              ? `${progress.progressPercent}%`
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgressCard;
