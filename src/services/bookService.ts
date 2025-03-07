import { Book, BookData } from "../types/Book.ts";

const API_URL = "http://localhost:3001/books";

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error retrieving books");
  }
  return response.json();
};

export const getBookById = async (id: string): Promise<Book> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Error retrieving book");
  }
  return response.json();
};

export const createBook = async (bookData: BookData): Promise<Book> => {
  const newBook = {
    ...bookData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    editedAt: null,
    isActive: true,
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  });

  if (!response.ok) {
    throw new Error("Book creation error");
  }

  return response.json();
};

export const updateBook = async (
  id: string,
  bookData: BookData
): Promise<Book> => {
  const currentBook = await getBookById(id);

  const updatedBook = {
    ...currentBook,
    ...bookData,
    editedAt: new Date().toISOString(),
  };

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBook),
  });

  if (!response.ok) {
    throw new Error("Book update error");
  }

  return response.json();
};

export const deleteBook = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting book");
  }
};

export const getActiveBooks = async (): Promise<Book[]> => {
  const response = await fetch(`${API_URL}?isActive=true`);
  if (!response.ok) {
    throw new Error("Error retrieving active books");
  }
  return response.json();
};

export const getDeactivatedBooks = async (): Promise<Book[]> => {
  const response = await fetch(`${API_URL}?isActive=false`);
  if (!response.ok) {
    throw new Error("Error retrieving deactivated books");
  }
  return response.json();
};

export const toggleBookStatus = async (id: string): Promise<Book> => {
  const book = await getBookById(id);

  const updatedBook = {
    ...book,
    isActive: !book.isActive,
    editedAt: new Date().toISOString(),
  };

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBook),
  });

  if (!response.ok) {
    throw new Error("Error changing book status");
  }

  return response.json();
};
