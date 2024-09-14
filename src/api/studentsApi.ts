const BASE_URL = "http://127.0.0.1:5000";

export interface Student {
  uuid: number;
  name: string;
  age: number;
  class: number;
  gpa: number;
  sex: string;
  siblings: number;
}

export const studentsApi = {
  getAllStudents: async (): Promise<Student[]> => {
    const response = await fetch(`${BASE_URL}/students`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  getStudentById: async (uuid: number): Promise<Student> => {
    const response = await fetch(`${BASE_URL}/student/${uuid}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  addStudent: async (student: Omit<Student, "uuid">): Promise<Student> => {
    const response = await fetch(`${BASE_URL}/student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  updateStudent: async (student: Student): Promise<Student> => {
    console.log(student.uuid);
    const response = await fetch(`${BASE_URL}/student/${student.uuid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  deleteStudent: async (uuid: number): Promise<{ success: boolean }> => {
    const response = await fetch(`${BASE_URL}/student/${uuid}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};
