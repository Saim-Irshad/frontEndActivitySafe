import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/CustomTable";
import { TbEditCircle, TbExternalLink } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { FaSortUp, FaSortDown } from "react-icons/fa";

interface Student {
  uuid: number;
  name: string;
  age: number;
  class: number;
  gpa: number;
  sex: string;
  siblings: number;
}

interface StudentTableProps {
  students: Student[];
  sortField: keyof Student;
  sortDirection: "asc" | "desc";
  handleSort: (field: keyof Student) => void;
  handleStudentClick: (student: Student) => void;
  handleEditClick: (student: Student) => void;
  handleDelete: (uuid: number) => void;
}

const tableHeaders = [
  { id: "uuid", label: "Id", sortable: true },
  { id: "name", label: "Name", sortable: true },
  { id: "class", label: "Class", sortable: true },
  { id: "gpa", label: "GPA", sortable: true },
  { id: "status", label: "Status", sortable: false },
  { id: "actions", label: "Actions", sortable: false },
];

const genderStatusStyles = {
  male: "bg-blue-100 text-blue-800",
  female: "bg-pink-100 text-pink-800",
  default: "bg-yellow-100 text-yellow-800",
};

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  sortField,
  sortDirection,
  handleSort,
  handleStudentClick,
  handleEditClick,
  handleDelete,
}) => {
  const renderSortIcon = (field: keyof Student) => {
    if (sortField === field) {
      return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return null;
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden border-gray-200 p-[1px] bg-gray-300 rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={() =>
                      header.sortable && handleSort(header.id as keyof Student)
                    }
                    className={`${
                      header.sortable ? "cursor-pointer" : ""
                    } whitespace-nowrap px-4 py-3`}
                  >
                    <div className="flex items-center">
                      <span>{header.label}</span>
                      {header.sortable && (
                        <span>
                          {renderSortIcon(header.id as keyof Student)}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.uuid}>
                  <TableCell className="whitespace-nowrap px-4 py-3">
                    {student.uuid}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-4 py-3">
                    <span
                      className="cursor-pointer flex gap-1 items-center hover:underline"
                      onClick={() => handleStudentClick(student)}
                    >
                      {student.name}{" "}
                      <TbExternalLink className="text-safepayGreen" />
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-4 py-3">
                    {student.class}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-4 py-3">
                    {student.gpa}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-4 py-3">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        genderStatusStyles[
                          student.sex as keyof typeof genderStatusStyles
                        ] || genderStatusStyles.default
                      }`}
                    >
                      {student.sex}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditClick(student)}
                        className="ml-2 text-blue-600 hover:text-blue-900"
                      >
                        <TbEditCircle size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(student.uuid)}
                        className="ml-2 text-red-600 hover:text-red-900"
                      >
                        <MdOutlineDelete size={20} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
