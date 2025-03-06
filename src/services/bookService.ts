import { Book } from "../types/Book";

let books: Book[] = [
  {
    id: "1",
    title: "Кобзар",
    author: "Тарас Шевченко",
    category: "Поезія",
    isbn: "978-966-01-0000-9",
    createdAt: new Date("2023-01-15T10:30:00"),
    editedAt: new Date("2023-02-20T14:45:00"),
    isActive: true,
  },
  {
    id: "2",
    title: "Лісова пісня",
    author: "Леся Українка",
    category: "Драма",
    isbn: "978-966-01-0001-6",
    createdAt: new Date("2023-03-10T09:15:00"),
    editedAt: null,
    isActive: true,
  },
  {
    id: "3",
    title: "Тигролови",
    author: "Іван Багряний",
    category: "Роман",
    isbn: "978-966-01-0002-3",
    createdAt: new Date("2023-02-05T16:20:00"),
    editedAt: new Date("2023-04-12T11:30:00"),
    isActive: false,
  },
];

export const getAllBooks = (): Promise<Book[]> => {
  return Promise.resolve([...books]);
};

export const getActiveBooks = (): Promise<Book[]> => {
  return Promise.resolve(books.filter((book) => book.isActive));
};

export const getDeactivatedBooks = (): Promise<Book[]> => {
  return Promise.resolve(books.filter((book) => !book.isActive));
};

export const toggleBookStatus = (id: string): Promise<Book> => {
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return Promise.reject(new Error("Книгу не знайдено"));
  }

  books[bookIndex] = {
    ...books[bookIndex],
    isActive: !books[bookIndex].isActive,
    editedAt: new Date(),
  };

  return Promise.resolve(books[bookIndex]);
};

export const deleteBook = (id: string): Promise<void> => {
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return Promise.reject(new Error("Книгу не знайдено"));
  }

  books = books.filter((book) => book.id !== id);
  return Promise.resolve();
};
