# Smart Contact Manager 📇

A modern, responsive Single Page Application (SPA) designed to manage contacts. This project demonstrates advanced state management patterns using Redux Toolkit, handling asynchronous API operations, and building complex forms with validation.

[Live Demo](https://badofficer.github.io/Smart-Contact-Manager/)

- **Asynchronous Data Fetching:** Utilizes `createAsyncThunk` to fetch initial user data from a REST API (`JSONPlaceholder`), complete with loading and error state handling.
- **Complex State Management:** Separated Redux slices for business logic (`contactsSlice`) and UI state (`notificationsSlice`).
- **Global Notification System:** A centralized Toast/Snackbar notification system that reacts to store changes (success, error, info).
- **Form Validation:** Integrated `React Hook Form` with `Yup` resolvers for performant, re-render-free input handling and strict validation rules.
- **Data Mutation:** Features to add new contacts, delete existing ones, and toggle "Favorite" status.

## 🛠️ Tech Stack

- **Core:** React, Vite
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **UI Library:** Material UI (MUI)
- **Forms & Validation:** React Hook Form, Yup
- **API Interactions:** Native Fetch API

## 📂 Architectural Highlights

This project was built with scalability in mind. It showcases the ability to avoid "Prop Drilling" and keeps React components pure by delegating heavy business logic, side effects, and API calls entirely to Redux Thunks.

## 💻 Getting Started

To run this project locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/BadOfficer/Smart-Contact-Manager.git
    cd Smart-Contact-Manager
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

## 👨‍💻 Author

**Taras Bondarenko**

---

_This project was built as a demonstration of modern Front-End architecture and Redux best practices._
