import React from "react";
import classNames from "classnames";

export default function Loader({ className }) {
  return <div className={classNames("loader", className)}></div>;
}
