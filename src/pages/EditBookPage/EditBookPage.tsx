import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import BookForm from "../../components/BookForm/BookForm";
import { Book, BookData } from "../../types/Book";
import { useBookContext } from "../../globalContext/BookContext.tsx";

const EditBookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookById, updateBook } = useBookContext();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) {
        message.error("Book not found");
        navigate("/");
        return;
      }

      try {
        const bookData = await getBookById(id);
        setBook(bookData);
      } catch (error) {
        message.error("Error loading book");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, getBookById, navigate]);

  const handleSubmit = async (data: BookData) => {
    if (!id) return;
    await updateBook(id, data);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <BookForm
      initialValues={book}
      onSubmit={handleSubmit}
      title="Edit a book"
      submitButtonText="Save changes"
    />
  );
};

export default EditBookPage;
