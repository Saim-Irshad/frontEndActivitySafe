import { create } from "zustand";

interface StateProp {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddStudentModal = create<StateProp>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddStudentModal;
