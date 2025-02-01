import { create } from "zustand";

// Zustand store 

const useDataStore = create((set) => ({
  Email: "email",
  updateEmail: (newEmail) => set({ Email: newEmail }),
//   updateEmail: (emailNew) => set({ Email: emailNew }),
}));

export  { useDataStore };