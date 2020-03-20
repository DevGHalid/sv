import React, { useState, useEffect, useContext, useMemo } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Master from "../../layouts/Master";
import SheetsContext from "../../contexts/SheetsContext";

export default function Sheets() {
  const [tabs, setTabs] = useState([
    {
      title: "Свои",
      query: "my",
      active: true
    },
    {
      title: "Общие",
      query: "common",
      active: false
    }
  ]);

  // find active tab
  const tabActive = useMemo(() => tabs.find(tab => tab.active) || {}, [tabs]);

  const handleChangeActiveFromTabs = query => () => {
    setTabs(
      tabs.map(tab =>
        tab.query === query
          ? { ...tab, active: true }
          : { ...tab, active: false }
      )
    );
  };

  return (
    <Master>
      <div className="container">
        <ul className="nav nav-tabs Tab_header_tabs">
          {tabs.map(nav => (
            <li
              className="nav-item"
              key={nav.query}
              onClick={handleChangeActiveFromTabs(nav.query)}
            >
              <a className={`nav-link ${nav.active ? "active" : ""}`}>
                {nav.title}
              </a>
            </li>
          ))}
        </ul>
        <SheetsContent query={tabActive.query} />
      </div>
    </Master>
  );
}

function SheetsContent({ query }) {
  const { sheets, fetchSheetsFromApi } = useContext(SheetsContext);

  useEffect(() => {
    fetchSheetsFromApi(query);
  }, []);

  return (
    <div className="sheets">
      {sheets.allSheets.map(sheet => (
        <SheetItem key={sheet.id} {...sheet} />
      ))}
    </div>
  );
}

function SheetItem({ title, user = {} }) {
  return (
    <div className="sheet">
      <div className="sheet-icon"></div>
      <div className="sheet-content">
        <div className="sheet-title">{title}</div>
        <div className="sheet-user">Добавил: {user.name}</div>
      </div>
    </div>
  );
}
