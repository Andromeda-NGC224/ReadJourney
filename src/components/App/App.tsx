import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookProvider } from "../../globalContext/BookContext.tsx";
import Footer from "../Footer/Footer.tsx";
import { Layout } from "antd";
import css from "./App.module.css";
import Loader from "../Loader/Loader.tsx";

const { Content } = Layout;

const DashboardPage = lazy(
  () => import("../../pages/DashboardPage/DashboardPage.tsx")
);

const EditBookPage = lazy(
  () => import("../../pages/EditBookPage/EditBookPage.tsx")
);

const AddBookPage = lazy(
  () => import("../../pages/AddBookPage/AddBookPage.tsx")
);

const App: React.FC = () => {
  return (
    <BookProvider>
      <BrowserRouter>
        <Layout className={css.appContainer}>
          <Content className={css.content}>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/add-book" element={<AddBookPage />} />
                <Route path="/edit-book/:id" element={<EditBookPage />} />
              </Routes>
            </Suspense>
          </Content>
          <Footer />
        </Layout>
      </BrowserRouter>
    </BookProvider>
  );
};

export default App;
