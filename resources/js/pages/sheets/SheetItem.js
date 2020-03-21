import React from "react";
import { useHistory } from "react-router-dom";

export default function SheetItem({ id, title, created_at, user, onDelete }) {
  const history = useHistory();

  return (
    <div className="sheet">
      <div
        className="sheet-content"
        onClick={() => history.push(`/sheets/${id}`)}
      >
        <div className="sheet-icon"></div>
        <div className="sheet-info">
          <div className="sheet-title">{title}</div>
          <div className="sheet-user">Добавил: {user.name}</div>
        </div>
        <div className="sheet-date">{created_at}</div>
      </div>
      <div className="sheet-actions">
        <div className="sheet-action">
          <i className="fe fe-copy"></i>
        </div>
        <div className="sheet-action">
          <i className="fe fe-download"></i>
        </div>
        <div className="sheet-action" onClick={onDelete}>
          <i className="fe fe-trash-2"></i>
        </div>
      </div>
    </div>
  );
}
