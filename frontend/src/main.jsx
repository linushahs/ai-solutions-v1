import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import ServicesPage from "./services/index.jsx";
import ContactUsPage from "./contactus/index.jsx";
import { Toaster } from "react-hot-toast";
import Chatbot from "./components/chatbot/chatbot.jsx";
import ReviewsPage from "./reviews/index.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/services",
    Component: ServicesPage,
  },
  {
    path: "/contact-us",
    Component: ContactUsPage,
  },
  {
    path: "/reviews",
    Component: ReviewsPage
  }
]);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
    <Chatbot />
    <Toaster position="bottom-right" />
  </>
);
