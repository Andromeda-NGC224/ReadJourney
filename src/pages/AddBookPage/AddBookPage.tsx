import React from "react";
import BookForm from "../../components/BookForm/BookForm";
import { BookData } from "../../types/Book";
import { useBookContext } from "../../globalContext/BookContext.tsx";

const AddBookPage: React.FC = () => {
  const { addBook } = useBookContext();

  const handleSubmit = async (data: BookData) => {
    await addBook(data);
  };

  return (
    <BookForm
      onSubmit={handleSubmit}
      title="Add a new book"
      submitButtonText="Add a book"
    />
  );
};

export default AddBookPage;
