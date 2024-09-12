import React, { useState, useEffect, useCallback, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import BarLoader from "@/components/BarLoader";
import useAddStudentModal from "@/store/useAddStudentModal";
import EditStudentModal from "@/components/EditStudentModal";
import AddStudentModal from "@/components/AddStudentModal";
import { DragCloseDrawer } from "@/components/DragCloseDrawer";
import { useRecentLookups } from "@/store/recentLookupsStore";
import PaginationComponent from "@/components/PaginationComponent";
import StudentTable from "@/components/StudentTableComponent";
import StudentDetailsCard from "@/components/StudentDetailsCard";
import { usePagination } from "@/hooks/usePagination";

interface Student {
  uuid: number;
  name: string;
  age: number;
  class: number;
  gpa: number;
  sex: string;
  siblings: number;
}

const StudentGridPage: React.FC = () => {
  const { toast } = useToast();
  const { onOpen: onOpenAddStudentModal } = useAddStudentModal();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof Student>("uuid");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState("");
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const recentLookups = useRecentLookups((state) => state.recentLookups);
  const filteredAndSortedStudents = useMemo(() => {
    return students
      .filter(
        (student) =>
          student.name.toLowerCase().includes(filter.toLowerCase()) ||
          student.uuid.toString().includes(filter)
      )
      .sort((a, b) => {
        if (a[sortField] < b[sortField])
          return sortDirection === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField])
          return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [students, filter, sortField, sortDirection]);

  const {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    paginatedItems: paginatedStudents,
  } = usePagination({ items: filteredAndSortedStudents });

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/students");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Failed to fetch student data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleEditClick = (student: Student) => {
    setEditingStudent(student);
  };

  const handleEditClose = () => {
    setEditingStudent(null);
  };

  const handleStudentUpdate = async () => {
    await fetchStudents();
    setEditingStudent(null);
    toast({
      title: "Student updated successfully",
    });
  };

  const handleStudentAdded = async () => {
    await fetchStudents();
  };

  const handleSort = (field: keyof Student) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDelete = async (uuid: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/student/${uuid}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success) {
        setStudents(students.filter((student) => student.uuid !== uuid));
        toast({
          title: "Successfully deleted",
        });
      } else {
        throw new Error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast({
        variant: "destructive",
        title: "Error occurred",
        description: "Failed to delete student. Please try again.",
      });
    }
  };

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setDrawerOpen(true);
  };

  const handleRecentLookupClick = async (uuid: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/student/${uuid}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSelectedStudent(data);
      setDrawerOpen(true);
    } catch (error) {
      console.error("Error fetching student:", error);
      toast({
        variant: "destructive",
        title: "Error occurred",
        description: "Failed to fetch student details. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold text-black mb-2">Recent Lookups</h2>
      {recentLookups.length === 0 ? (
        <p className="text-gray-500 ">No recent lookups</p>
      ) : (
        <ul className="gap-2 flex max-sm:flex-col justify-start items-center">
          {recentLookups.map((student) => (
            <li
              key={student.uuid}
              className="bg-gray-50 w-full hover:bg-gray-100 border rounded-lg border-gray-300 shadow p-2 cursor-pointer"
              onClick={() => handleRecentLookupClick(student.uuid)}
            >
              <p className="font-semibold text-black">{student.name}</p>
              <p className="text-sm text-gray-600">
                ID: {student.uuid}, Age: {student.age}
              </p>
            </li>
          ))}
        </ul>
      )}
      <div className="py-4 gap-4 flex max-sm:flex-col justify-between items-center">
        <h1 className="text-xl font-semibold whitespace-nowrap text-gray-800">
          Student Data
        </h1>

        <AddStudentModal onStudentAdded={handleStudentAdded} />

        <div className="flex max-sm:w-full items-center gap-4 ">
          <div className="relative w-full ">
            <div className="absolute sm:max-w-[300px] inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <CiSearch className="text-slate-800" />
            </div>
            <input
              type="text"
              placeholder="Search Students..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              id="simple-search"
              className="bg-gray-50 border sm:max-w-[300px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 px-2.5 py-1.5 "
              required
            />
          </div>
          <button
            onClick={onOpenAddStudentModal}
            className="text-white flex items-center justify-between gap-2 bg-safepayBlue h-full py-2 px-4 max-sm:px-2.5 max-sm:py-2.5 rounded-lg text-bold text-sm "
          >
            <span>
              <FaPlus />
            </span>
            <span className="max-sm:hidden whitespace-nowrap">Add Student</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <BarLoader />
        </div>
      ) : error ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      ) : filteredAndSortedStudents.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No students found</p>
        </div>
      ) : (
        <>
          <StudentTable
            students={paginatedStudents}
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
            handleStudentClick={handleStudentClick}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
          />
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}

      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          isOpen={!!editingStudent}
          onClose={handleEditClose}
          onUpdate={handleStudentUpdate}
        />
      )}

      <DragCloseDrawer open={drawerOpen} setOpen={setDrawerOpen}>
        {selectedStudent && <StudentDetailsCard student={selectedStudent} />}
      </DragCloseDrawer>
    </div>
  );
};

export default StudentGridPage;
