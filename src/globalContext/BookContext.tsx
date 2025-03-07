import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Book, BookData, FilterType } from "../types/Book";
import * as bookService from "../services/bookService";

interface BookContextType {
  books: Book[];
  totalBooks: number;
  loading: boolean;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  fetchBooks: () => Promise<void>;
  addBook: (bookData: BookData) => Promise<Book>;
  updateBook: (id: string, bookData: BookData) => Promise<Book>;
  toggleBookStatus: (id: string) => Promise<Book>;
  deleteBook: (id: string) => Promise<void>;
  getBookById: (id: string) => Promise<Book>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used with BookProvider");
  }
  return context;
};

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<FilterType>("active");

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const allBooks = await bookService.getAllBooks();
      setTotalBooks(allBooks.length);

      let filteredBooks: Book[];
      switch (filter) {
        case "active":
          filteredBooks = await bookService.getActiveBooks();
          break;
        case "deactivated":
          filteredBooks = await bookService.getDeactivatedBooks();
          break;
        default:
          filteredBooks = allBooks;
      }
      setBooks(filteredBooks);
    } catch (error) {
      console.error("Error loading books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [filter]);

  const addBook = async (bookData: BookData): Promise<Book> => {
    const newBook = await bookService.createBook(bookData);
    await fetchBooks();
    return newBook;
  };

  const updateBook = async (id: string, bookData: BookData): Promise<Book> => {
    const updatedBook = await bookService.updateBook(id, bookData);
    await fetchBooks();
    return updatedBook;
  };

  const toggleBookStatus = async (id: string): Promise<Book> => {
    const updatedBook = await bookService.toggleBookStatus(id);
    await fetchBooks();
    return updatedBook;
  };

  const deleteBook = async (id: string): Promise<void> => {
    await bookService.deleteBook(id);
    await fetchBooks();
  };

  const getBookById = async (id: string): Promise<Book> => {
    return bookService.getBookById(id);
  };

  const value = {
    books,
    totalBooks,
    loading,
    filter,
    setFilter,
    fetchBooks,
    addBook,
    updateBook,
    toggleBookStatus,
    deleteBook,
    getBookById,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
