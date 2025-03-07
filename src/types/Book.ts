export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  createdAt: Date;
  editedAt: Date | null;
  isActive: boolean;
}

export type BookData = Omit<Book, "id" | "createdAt" | "editedAt" | "isActive">;

export type FilterType = "all" | "active" | "deactivated";
