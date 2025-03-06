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
