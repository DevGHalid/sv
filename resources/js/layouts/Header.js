import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function Header() {
  const [isShowMenu, setShowMenu] = useState(false);
  const { logout } = useContext(AuthContext);

  return (
    <div className="header">
      <div className="container">
        <div className="d-flex">
          <a className="header-brand" href="/">
            Опросный лист
          </a>
          <div className="d-flex order-lg-2 ml-auto">
            <div className="nav-item">
              <a className="nav-link d-md-flex"></a>
              <a href="#" className="btn btn-sm btn-outline-cyan">
                <i className="fe fe-user-plus mr-1"></i>
                Добавить сотрудника
              </a>
            </div>
            <div className="dropdown d-flex">
              <a className="nav-link">
                <i className="fe fe-bell"></i>
                <span className="nav-unread"></span>
              </a>
            </div>
            <div className="dropdown">
              <a
                className="nav-link leading-none"
                onClick={() => setShowMenu(!isShowMenu)}
              >
                <span className="avatar"></span>
                <div className="ml-2">
                  <span className="text-default">Halid</span>
                  <small className="text-muted d-block mt-1">
                    Administrator
                  </small>
                </div>
              </a>
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
          </div>
        </div>
      </div>
    </div>
  );
}
