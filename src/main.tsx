import React from "react";
import ReactDOM from "react-dom/client";
import Accordion from "./components/accordion/index.tsx";
import StarRating from "./components/star-rating/index.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Accordion />
    <StarRating />
  </React.StrictMode>
);
