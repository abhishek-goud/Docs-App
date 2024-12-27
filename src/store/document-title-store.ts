import { create } from "zustand";
import { Id } from "../../convex/_generated/dataModel";

interface DocumentTitleState {
  title: string; // Simplified type
  setTitle: (title: string) => void; // Simplified type
  id: Id<"documents"> | null,
  setId: (id : Id<"documents">) => void
}

export const useDocumentTitleStore = create<DocumentTitleState>((set) => ({
  title: "Untitled Document", // Default value
  setTitle: (title) => set({ title }),
  id: null,
  setId: (id) => set({id})
  
}));
