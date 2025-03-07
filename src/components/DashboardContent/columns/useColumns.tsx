import React from "react";
import { Button, Space, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  StopOutlined,
  BookOutlined,
  UserOutlined,
  TagOutlined,
  NumberOutlined,
  ClockCircleOutlined,
  EditFilled,
} from "@ant-design/icons";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import css from "../DashboardContent.module.css";

export const formatDateTime = (dateString: string | null) => {
  if (!dateString) return "--";
  return format(parseISO(dateString), "d MMMM yyyy, h:mma");
};

export const useColumns = (
  handleToggleStatus: (id: string) => void,
  handleDelete: (id: string) => void
) => {
  const navigate = useNavigate();

  return [
    {
      title: "Title of the book",
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <div className={css.cellWithIcon}>
          <BookOutlined /> {text}
        </div>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (text: string) => (
        <div className={css.cellWithIcon}>
          <UserOutlined /> {text}
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text: string) => (
        <div className={css.cellWithIcon}>
          <TagOutlined /> {text}
        </div>
      ),
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      render: (text: string) => (
        <div className={css.cellWithIcon}>
          <NumberOutlined /> {text}
        </div>
      ),
    },
    {
      title: "Created",
      key: "createdAt",
      render: (record: any) => (
        <div className={css.cellWithIcon}>
          <ClockCircleOutlined /> {formatDateTime(record.createdAt)}
        </div>
      ),
    },
    {
      title: "Edited",
      key: "editedAt",
      render: (record: any) => (
        <div className={css.cellWithIcon}>
          <EditFilled /> {formatDateTime(record.editedAt)}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/edit-book/${record.id}`)}
            className={css.actionButton}
          >
            Edit
          </Button>

          <Button
            type={record.isActive ? "default" : "primary"}
            icon={record.isActive ? <StopOutlined /> : <CheckCircleOutlined />}
            onClick={() => handleToggleStatus(record.id)}
            className={css.actionButton}
          >
            {record.isActive ? "Deactivate" : "Activate"}
          </Button>

          {!record.isActive && (
            <Popconfirm
              title="Are you sure you want to delete this book?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                className={css.actionButton}
              >
                Remove
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];
};
