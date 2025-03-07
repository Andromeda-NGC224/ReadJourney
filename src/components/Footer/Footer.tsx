import React from "react";
import { Layout } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import css from "./Footer.module.css";

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer className={css.footer}>
      <div className={css.footerContent}>
        <a
          href="https://github.com/Andromeda-NGC224"
          target="_blank"
          rel="noopener noreferrer"
          className={css.footerLink}
        >
          <GithubOutlined /> GitHub
        </a>
      </div>
    </Footer>
  );
};

export default AppFooter;
