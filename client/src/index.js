import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PostsPage } from "./pages/posts/index";
import { DetailPostPage } from "./pages/posts/detail/index";
import { EditPostPage } from "./pages/posts/edit/index";
import { AddPostPage } from "./pages/posts/add/index";
import { AuthPage } from "./pages/auth/index";
import { RegistrationPage } from "./pages/registration/index";
import { Root } from "./components/Root";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "posts",
        element: <PostsPage />,
      },
      {
        path: "posts/:id",
        element: <DetailPostPage />,
      },
      {
        path: "posts/:id/edit",
        element: <EditPostPage />,
      },
      {
        path: "posts/add",
        element: <AddPostPage />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "registration",
        element: <RegistrationPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
