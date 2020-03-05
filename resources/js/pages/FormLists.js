import React, { useState, useEffect, useContext } from "react";
import Master from "../layouts/Master";
import FormListsContext from "../contexts/FormListsContext";
import FormListsAdd from './FormListsAdd';
import FormListRemove from "./FormListRemove";

export default function FormLists() {
 const { fetchAllFormListsFromApi } = useContext(FormListsContext);

 useEffect(() => fetchAllFormListsFromApi(), []);

 const [isClose, setIsClose] = useState(false);

 return (
  <Master>
   {isClose && <FormListRemove onClose={() => setClosed(false)} />}
   <div className="container">
    <div className="card">
     <div className="card-header justify-content-between">
      <h4 className="card-title">Списак формы</h4>
      <div className="form-btn-action">
       <button className="btn btn-sm btn-outline-cyan">
        <i className="fe fe-plus mr-1"></i>
        <span>Добавить Форму</span>
       </button>
      </div>
     </div>
     <div className="card-body">
      <FormListsTable />
     </div>
    </div>
   </div>
  </Master>
 );
}

function FormListsTable() {
 const { formLists } = useContext(FormListsContext);

 return (
  <table className="table table-light table-hover">
   <thead>
    <tr>
     <th scope="col">Создатель</th>
     <th scope="col">Названия</th>
     <th scope="col">Количества листов</th>
     <th scope="col">Дата</th>
     <th></th>
    </tr>
   </thead>
   <tbody>
    {formLists.allFormLists.map(formList => (
     <tr key={formList.id}>
      <td>
       <div className="nav-link p-0 leading-none">
        <span className="avatar"></span>
        <span className="ml-2 d-none d-lg-block"></span>
        <span className="text-default">{formList.user.name}</span>
       </div>
      </td>
      <td>{formList.title}</td>
      <td>0</td>
      <td>{formList.created_at}</td>
      <td>
       <div className="d-flex justify-content-end">
        <div className="form-action form-action-edit mr-3">
         <button className="btn btn-sm btn-outline-primary btn-pill">
          <i className="fe fe-edit mr-1"></i>
          Редактировать
         </button>
        </div>
        <div className="form-action form-action-remove">
         <button className="btn btn-sm btn-outline-danger btn-pill">
          <i className="fe fe-trash-2 mr-1"></i>
          <span>Удалить</span>
         </button>
        </div>
       </div>
      </td>
     </tr>
    ))}
    <FormListsAdd />
   </tbody>
  </table>
 );
}
