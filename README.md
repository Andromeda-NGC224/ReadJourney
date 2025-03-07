# 📚 ReadJourney — Book List Management System
**🎯 Project Overview:**
ReadJourney is a book list management application developed to manage a collection of books. It allows users to perform CRUD (Create, Read, Update, Delete) operations on the books in a simple and intuitive way. The application is built with a front-end in React and a back-end in json-server for data storage and management.

## 📋 Key Features and Functionality:

**1. Dashboard Page:**
    - **Table View:** Displays a list of books in a tabular format with details for each book.
    - **Filtering:** The user can filter the displayed books
    - **Pagination:** Books are listed with pagination, showing a limited number of records per page.
    - **Interactive Table:** Users can click the Edit button to modify a book, Deactivate it, or Delete a deactivated record.
**2. Add/Edit Book Page:**
    - **Form for Book Details:** Users can either add a new book or edit an existing one.
    - **Validation:** Each input field is validated to ensure that no required fields are left empty.
    - **Submission:** Upon form submission, the new or updated book is saved, and the user is redirected to the Dashboard with the updated book list.
**3. Responsive Design:**
    - The app is fully responsive, ensuring it works smoothly across different devices (from mobile phones to desktops).

## 🛠️ Technologies Used:
- **Frontend:** Built with **React** (functional components) and Context API for state management. **TypeScript** was used where appropriate for type safety.
- **Backend:** The back-end is powered by **json-server**, a simple tool to generate a fake REST API for CRUD operations. The API is used to handle book data and simulate database interactions.
- **UI Library:** The project uses **Ant Design** for UI components, providing pre-designed and customizable components like tables, buttons, and forms, which accelerates development and ensures consistency.


## ⚙️ How to Run the Project:
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:
   - npm install
5. Run the Server: Start the server with:
   - npm run server
6. Run the Frontend: You can run the Frontend via the [link](https://read-journey-delta.vercel.app/) or locally by entering the command in the console:
   - npm run dev
This will launch the project locally at http://localhost:5173.

## 🚀 Additional Notes:
  - The application uses **json-server** as a mock API to simulate interactions with a database. The server allows performing CRUD operations like adding, updating, and deleting books.
  - The **Dashboard** page automatically updates in real-time, reflecting changes like editing a book or deactivating/reactivating a book. 
