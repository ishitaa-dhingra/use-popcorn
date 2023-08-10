import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";
import { useState } from "react";

function Test() {
  const [movieRating, setMovierating] = useState(0);
  return (
    <div>
      <StarRating color="blue" maxrating={10} onsetRating={setMovierating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating size={23} color="purple" defaultRating={3} />
    <Test />
  </React.StrictMode>
);
