import React from "react";
import { Table, Button, Select, Space, Typography, message } from "antd";
import {
  PlusOutlined,
  FilterOutlined,
  BookOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useBookContext } from "../../globalContext/BookContext.tsx";
import { FilterType } from "../../types/Book";
import { useColumns } from "./columns/useColumns.tsx";

import css from "./DashboardContent.module.css";

const DashboardContent: React.FC = () => {
  const {
    books,
    totalBooks,
    loading,
    filter,
    setFilter,
    toggleBookStatus,
    deleteBook,
  } = useBookContext();

  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = (content: string) => {
    messageApi.open({
      type: "success",
      content,
    });
  };

  const errorMessage = (content: string) => {
    messageApi.open({
      type: "error",
      content,
    });
  };

  const handleFilterChange = (value: FilterType) => {
    setFilter(value);
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleBookStatus(id);
      successMessage("Book status changed successfully");
    } catch (error) {
      errorMessage("Error changing book status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);
      successMessage("Book successfully deleted");
    } catch (error) {
      errorMessage("Error deleting book");
    }
  };

  const columns = useColumns(handleToggleStatus, handleDelete);

  return (
    <div className={css.dashboardContainer}>
      {contextHolder}
      <div className={css.header}>
        <Typography.Title className={css.title} level={2}>
          <BookOutlined /> ReadJourney
        </Typography.Title>
        <Link to="/add-book">
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Add a book
          </Button>
        </Link>
      </div>

      <div className={css.filterContainer}>
        <span className={css.filterLabel}>
          <FilterOutlined /> Filter:
        </span>
        <Select
          value={filter}
          onChange={handleFilterChange}
          style={{ width: 150 }}
        >
          <Select.Option value="all">Show all</Select.Option>
          <Select.Option value="active">Show active</Select.Option>
          <Select.Option value="deactivated">Show disabled</Select.Option>
        </Select>
        <span className={css.statsInfo}>
          <InfoCircleOutlined /> Shown {books.length} of {totalBooks} entries
        </span>
      </div>

      <Table
        className={css.table}
        dataSource={books}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        rowClassName={(record) => (!record.isActive ? css.deactivatedRow : "")}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default DashboardContent;
