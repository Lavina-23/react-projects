import React from "react";
import ReactDOM from "react-dom/client";
import Accordion from "./components/accordion/index.tsx";
import ImageSlider from "./components/image-slider/index.tsx";
import LoadMore from "./components/load-more/index.tsx";
import StarRating from "./components/star-rating/index.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="grid justify-items-center">
      <Accordion />
      <StarRating />
      <ImageSlider url={"https://picsum.photos/v2/list"} limit={10} page={1} />
      <LoadMore />
    </div>
  </React.StrictMode>
);
