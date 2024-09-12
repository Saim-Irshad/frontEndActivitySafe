import create from "zustand";
import { persist } from "zustand/middleware";

interface Student {
  uuid: number;
  name: string;
  age: number;
}

interface RecentLookupsState {
  recentLookups: Student[];
  addLookup: (student: Student) => void;
}

export const useRecentLookups = create<RecentLookupsState>()(
  persist(
    (set) => ({
      recentLookups: [],
      addLookup: (student) =>
        set((state) => {
          const updatedLookups = [
            student,
            ...state.recentLookups.filter((s) => s.uuid !== student.uuid),
          ].slice(0, 3);
          return { recentLookups: updatedLookups };
        }),
    }),
    {
      name: "recent-lookups-storage",
    }
  )
);
