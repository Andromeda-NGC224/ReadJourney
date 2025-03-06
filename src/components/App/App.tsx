import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";

const { Content, Footer } = Layout;

const DashboardPage = lazy(
  () => import("../../pages/DashboardPage/DashboardPage.tsx")
);

// const EditBookPage = lazy(
//   () => import("../../pages/EditBookPage/EditBookPage.tsx")
// );

// const AddBookPage = lazy(() => import("../../pages/AddBookPage/AddBookPage.tsx"));

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Content>
          <Suspense fallback={<div>Loading</div>}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              {/* <Route path="/add-book" element={<AddBookPage />} />
                <Route path="/edit-book/:id" element={<EditBookPage />} /> */}
            </Routes>
          </Suspense>
        </Content>
        <Footer>
          <a
            href="https://github.com/Andromeda-NGC224"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
