import React from "react";
import { useRecentLookups } from "@/store/recentLookupsStore";

interface Student {
  uuid: number;
  name: string;
  age: number;
  class: number;
  gpa: number;
  sex: string;
  siblings: number;
}

interface RecentLookupsProps {
  onStudentClick: (student: Student) => void;
}

const RecentLookups: React.FC<RecentLookupsProps> = ({ onStudentClick }) => {
  const recentLookups = useRecentLookups((state) => state.recentLookups);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-black mb-2">Recent Lookups</h2>
      {recentLookups.length === 0 ? (
        <p className="text-gray-500 ">No recent lookups</p>
      ) : (
        <ul className="gap-2 flex max-sm:flex-col justify-start items-center">
          {recentLookups.map((student) => (
            <li
              key={student.uuid}
              className="bg-gray-50 w-full hover:bg-gray-100 border rounded-lg border-gray-300 shadow p-2 cursor-pointer"
              onClick={() => onStudentClick(student as Student)}
            >
              <p className="font-semibold text-black">{student.name}</p>
              <p className="text-sm text-gray-600">
                ID: {student.uuid}, Age: {student.age}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentLookups;
