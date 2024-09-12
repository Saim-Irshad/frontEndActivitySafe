import { DragCloseDrawer } from "@/components/DragCloseDrawer";
import RecentLookups from "@/components/RecentLookups";
import { useState, useEffect, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { useRecentLookups } from "@/store/recentLookupsStore";
import { useToast } from "@/hooks/use-toast";
import StudentDetailsCard from "@/components/StudentDetailsCard";

interface Student {
  uuid: number;
  name: string;
  age: number;
  class: number;
  gpa: number;
  sex: string;
  siblings: number;
}

const LookupPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<Student | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const addLookup = useRecentLookups((state) => state.addLookup);
  const { toast } = useToast();

  const fetchStudentDetails = async (uuid: number): Promise<Student | null> => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/student/${uuid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch student details");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching student details:", error);
      toast({
        variant: "destructive",
        title: "Error occurred",
        description: "Failed to fetch student details. Please try again.",
      });
      return null;
    }
  };

  const handleSearch = useCallback(async () => {
    if (!searchTerm) {
      setSearchResult(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchStudentDetails(parseInt(searchTerm));
      if (data) {
        setSearchResult(data);
        addLookup({ uuid: data.uuid, name: data.name, age: data.age });
      } else {
        throw new Error("Student not found");
      }
    } catch (error) {
      console.error("Error fetching student:", error);
      setSearchResult(null);
      setError("No student found with the given ID");
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, addLookup, toast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 2000);

    return () => clearTimeout(timer);
  }, [handleSearch]);

  const handleStudentClick = async (student: {
    uuid: number;
    name: string;
    age: number;
  }) => {
    const fullStudentData = await fetchStudentDetails(student.uuid);
    if (fullStudentData) {
      setSearchResult(fullStudentData);
      setDrawerOpen(true);
    }
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-xl font-semibold mb-4 whitespace-nowrap text-gray-800">
        Student Data
      </h1>
      <div className="flex max-sm:w-full items-start gap-4 ">
        <div className="flex-col max-sm:w-full ">
          <div className="relative max-sm:w-full   ">
            <div className="absolute sm:max-w-[300px] inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <CiSearch className="text-slate-800" />
            </div>
            <input
              type="text"
              placeholder="Search student by id..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="simple-search"
              className="bg-gray-50 border sm:max-w-[300px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 px-2.5 py-1.5 "
              required
            />
          </div>
          {isLoading && <p className="mt-2 text-gray-600">Searching...</p>}
          {!searchResult && !isLoading && !error && (
            <p className="mt-2 text-gray-600">
              No student found, Enter correct student ID
            </p>
          )}
          {error && <p className="mt-2 text-red-500">{error}</p>}
          {searchResult && !error && (
            <div className="bg-gray-50 hover:bg-gray-100 border rounded-lg border-gray-300 shadow-lg p-2 mb-4 mt-1">
              <div
                className="cursor-pointer"
                onClick={() => handleStudentClick(searchResult)}
              >
                {searchResult.name}
              </div>
            </div>
          )}
        </div>
      </div>

      <RecentLookups onStudentClick={handleStudentClick} />

      <DragCloseDrawer open={drawerOpen} setOpen={setDrawerOpen}>
        {searchResult && <StudentDetailsCard student={searchResult} />}
      </DragCloseDrawer>
    </div>
  );
};

export default LookupPage;
