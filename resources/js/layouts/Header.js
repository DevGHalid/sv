import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

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
          <div className="col col-lg order-lg-first">
            <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
              {menu.map(item => (
                <li className="nav-item" key={item.title}>
                  <NavLink to={item.to} className="nav-link">
                    <i className={`mr-2 ${item.icon}`}></i>
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="d-flex">
            <div className="dropdown d-flex">
              <a className="nav-link">
                <i className="fe fe-bell"></i>
                <span className="nav-unread"></span>
              </a>
            </div>
            <HeaderDropDown />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderDropDown() {
  const [isShowMenu, setShowMenu] = useState(false);
  const { logout } = useContext(AuthContext);

  return (
    <div className="dropdown">
      <div
        className="nav-link leading-none"
        onClick={() => setShowMenu(!isShowMenu)}
      >
        <span className="avatar"></span>
        <div className="ml-2">
          <span className="text-default">Halid</span>
          <small className="text-muted d-block mt-1">Administrator</small>
        </div>
      </div>
      {isShowMenu && (
        <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow header-dropdown-menu show">
          <a className="dropdown-item">
            <i className="fe fe-user dropdown-icon"></i> Профиль
          </a>
          <a className="dropdown-item">
            <i className="fe fe-settings dropdown-icon"></i> Настройки
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" onClick={logout}>
            <i className="fe fe-log-out dropdown-icon"></i> Выйти
          </a>
        </div>
      )}
    </div>
  );
}
