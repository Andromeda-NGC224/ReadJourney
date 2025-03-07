import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import {
  ArrowLeftOutlined,
  BookOutlined,
  UserOutlined,
  TagOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Book, BookData } from "../../types/Book";
import css from "./BookForm.module.css";

interface BookFormProps {
  initialValues?: Book;
  onSubmit: (data: BookData) => Promise<void>;
  title: string;
  submitButtonText: string;
}

const categories = [
  "Science Fiction",
  "Detective",
  "Novel",
  "Poetry",
  "Scientific Literature",
  "History",
  "Biography",
  "Drama",
  "Adventure",
  "Children's Literature",
];

const BookForm: React.FC<BookFormProps> = ({
  initialValues,
  onSubmit,
  title,
  submitButtonText,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = () => {
    messageApi.open({
      type: "success",
      content: "Book saved successfully",
    });
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "Error saving book",
    });
  };

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleSubmit = async (values: BookData) => {
    setLoading(true);
    try {
      await onSubmit(values);
      successMessage();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      errorMessage();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.formContainer}>
      {contextHolder}
      <Link to="/">
        <Button icon={<ArrowLeftOutlined />} className={css.backButton}>
          Back to list
        </Button>
      </Link>

      <h2 className={css.formTitle}>
        <BookOutlined /> {title}
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={initialValues}
        className={css.form}
      >
        <Form.Item
          name="title"
          label="Title of book"
          rules={[
            { required: true, message: "Please enter the title of the book." },
          ]}
          className={css.formItem}
        >
          <Input
            placeholder="Enter title of the book"
            prefix={<BookOutlined className={css.iconWrapper} />}
          />
        </Form.Item>

        <Form.Item
          name="author"
          label="Author"
          rules={[
            { required: true, message: "Please enter the author's name." },
          ]}
          className={css.formItem}
        >
          <Input
            placeholder="Enter the author's name"
            prefix={<UserOutlined className={css.iconWrapper} />}
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
          className={css.formItem}
        >
          <Select
            placeholder="Select a category"
            suffixIcon={<TagOutlined className={css.iconWrapper} />}
          >
            {categories.map((category) => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="isbn"
          label="ISBN"
          rules={[
            { required: true, message: "Please enter ISBN" },
            {
              pattern: /^[0-9-]+$/,
              message: "ISBN must contain only numbers and hyphens",
            },
          ]}
          className={css.formItem}
        >
          <Input
            placeholder="Enter the ISBN"
            prefix={<NumberOutlined className={css.iconWrapper} />}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className={css.submitButton}
          >
            {submitButtonText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookForm;
