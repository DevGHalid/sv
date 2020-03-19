import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

export default function Navigation() {
  const [menu, setMenu] = useState([
    {
      title: "Гланая",
      to: "/home",
      icon: "fe fe-home"
    },
    {
      title: "Сотрудники",
      to: "/users",
      icon: "fe fe-users"
    },
    {
      title: "Листы",
      to: "/sheets",
      icon: "fe fe-file-text"
    }
  ]);

  return (
    <div className="header d-lg-flex p-0 collapse">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-3 ml-auto"></div>
          <div className="col col-lg order-lg-first">
            <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
              {menu.map(item => (
                <li className="nav-item" key={item.title}>
                  <NavLink to={item.to} className="nav-link">
                    <i className={classNames("mr-2", item.icon)}></i>
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
