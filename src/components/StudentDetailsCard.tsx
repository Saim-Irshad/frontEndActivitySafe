import React from "react";

interface Student {
  uuid: number;
  name: string;
  age: number;
  class: number;
  gpa: number;
  sex: string;
  siblings: number;
}

interface StudentDetailsCardProps {
  student: Student;
}

const StudentDetailsCard: React.FC<StudentDetailsCardProps> = ({ student }) => {
  return (
    <div className="mx-auto max-w-2xl p-6 text-neutral-300">
      <h2 className="text-3xl font-bold text-neutral-100 mb-6 border-b border-neutral-700 pb-2">
        {student.name}'s Details
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-neutral-400">UUID</p>
            <p className="text-lg font-semibold text-neutral-200">
              {student.uuid}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-400">Age</p>
            <p className="text-lg font-semibold text-neutral-200">
              {student.age} years
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-400">Class</p>
            <p className="text-lg font-semibold text-neutral-200">
              {student.class}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-neutral-400">GPA</p>
            <p className="text-lg font-semibold text-neutral-200">
              {student.gpa.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-400">Sex</p>
            <p className="text-lg font-semibold text-neutral-200 capitalize">
              {student.sex}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-400">Siblings</p>
            <p className="text-lg font-semibold text-neutral-200">
              {student.siblings}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsCard;
