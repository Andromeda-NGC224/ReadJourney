import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Select,
  Space,
  Typography,
  message,
  Popconfirm,
  Tag,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { Book } from "../../types/Book.ts";
import {
  getAllBooks,
  getActiveBooks,
  getDeactivatedBooks,
  toggleBookStatus,
  deleteBook,
} from "../../services/bookService.ts";
import css from "./DashboardContent.module.css";

const { Option } = Select;
const { Title } = Typography;

type FilterType = "all" | "active" | "deactivated";

const DashboardContent: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filter, setFilter] = useState<FilterType>("active");
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const allBooks = await getAllBooks();
      setTotalBooks(allBooks.length);

      let filteredBooks: Book[];
      switch (filter) {
        case "active":
          filteredBooks = await getActiveBooks();
          break;
        case "deactivated":
          filteredBooks = await getDeactivatedBooks();
          break;
        default:
          filteredBooks = allBooks;
      }
      setBooks(filteredBooks);
    } catch (error) {
      message.error("Помилка при завантаженні даних");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [filter]);

  const handleFilterChange = (value: FilterType) => {
    setFilter(value);
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleBookStatus(id);
      message.success("Статус книги успішно змінено");
      fetchBooks();
    } catch (error) {
      message.error("Помилка при зміні статусу книги");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);
      message.success("Книгу успішно видалено");
      fetchBooks();
    } catch (error) {
      message.error("Помилка при видаленні книги");
    }
  };

  const formatDateTime = (date: Date | null) => {
    if (!date) return "--";
    return format(date, "d MMMM yyyy, h:mma");
  };

  const columns = [
    {
      title: "Назва книги",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Автор",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Категорія",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "Створено",
      key: "createdAt",
      render: (record: Book) => formatDateTime(record.createdAt),
    },
    {
      title: "Відредаговано",
      key: "editedAt",
      render: (record: Book) => formatDateTime(record.editedAt),
    },
    {
      title: "Дії",
      key: "actions",
      render: (record: Book) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/edit-book/${record.id}`)}
          >
            Редагувати
          </Button>

          <Button
            type={record.isActive ? "default" : "primary"}
            icon={record.isActive ? <StopOutlined /> : <CheckCircleOutlined />}
            onClick={() => handleToggleStatus(record.id)}
          >
            {record.isActive ? "Деактивувати" : "Активувати"}
          </Button>

          {!record.isActive && (
            <Popconfirm
              title="Ви впевнені, що хочете видалити цю книгу?"
              onConfirm={() => handleDelete(record.id)}
              okText="Так"
              cancelText="Ні"
            >
              <Button danger icon={<DeleteOutlined />}>
                Видалити
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className={css.dashboardContainer}>
      <div className={css.header}>
        <Title level={2}>Бібліотека книг</Title>
        <Link to="/add-book">
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Додати книгу
          </Button>
        </Link>
      </div>

      <div className={css.filterContainer}>
        <Space>
          <span>Фільтр:</span>
          <Select
            value={filter}
            onChange={handleFilterChange}
            style={{ width: 150 }}
          >
            <Option value="all">Показати всі</Option>
            <Option value="active">Показати активні</Option>
            <Option value="deactivated">Показати деактивовані</Option>
          </Select>
          <span>
            Показано {books.length} з {totalBooks} записів
          </span>
        </Space>
      </div>

      <Table
        dataSource={books}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        rowClassName={(record) => (!record.isActive ? css.deactivatedRow : "")}
      />
    </div>
  );
};

export default DashboardContent;
