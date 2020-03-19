import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import FormListsContext from "../../contexts/FormListsContext";

export default function FormListAdd({ onCancel }) {
  const { addFormList } = useContext(FormListsContext);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const handleSaveTitle = () => {
    if (!title.trim()) {
      return setError("Добавиться дата после добавления");
    }

    addFormList(title).then(response => onCancel());
  };

  return (
    <tr>
      <td>
        <div className="nav-link p-0 leading-none">
          <span className="avatar"></span>
          <span className="ml-2 d-none d-lg-block"></span>
          <span className="text-default">Halid</span>
        </div>
      </td>
      <td>
        <input
          type="text"
          placeholder="Названия"
          className="form-control form-control-sm w-75"
          onChange={({ target }) => setTitle(target.value)}
        />
        {error && <small className="text-danger">Заполните поле</small>}
      </td>
      <td>0</td>
      <td>
        <small>Добавиться дата после добавления"</small>
      </td>
      <td>
        <div className="d-flex justify-content-end">
          <div
            className="form-list-action form-action-edit mr-3"
            onClick={handleSaveTitle}
          >
            <i className="fe fe-save mr-1"></i>
          </div>
          <div
            className="form-list-action form-action-remove"
            onClick={onCancel}
          >
            <i className="fe fe-x mr-1"></i>
          </div>
        </div>
      </td>
    </tr>
  );
}

FormListAdd.propTypes = {
  onCancel: PropTypes.func.isRequired
};
