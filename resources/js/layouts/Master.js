import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";

export default function Master({ children }) {
 return (
  <div className="page">
   <div className="page-main">
    <Header />
    <Navigation />
    <div className="page-content">{children}</div>
   </div>
  </div>
 );
}
