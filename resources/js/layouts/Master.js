import React from "react";
import Header from "./Header";

export default function Master({ children }) {
  return (
    <div className="page">
      <div className="page-main">
        <Header />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}
