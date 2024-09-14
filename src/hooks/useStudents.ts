import { useState, useCallback } from "react";
import { studentsApi, Student } from "@/api/studentsApi";
import { useToast } from "@/hooks/use-toast";

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentsApi.getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Failed to fetch student data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (uuid: number) => {
    try {
      const result = await studentsApi.deleteStudent(uuid);
      if (result.success) {
        await fetchStudents();
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

  return {
    students,
    loading,
    error,
    fetchStudents,
    handleDelete,
  };
};
