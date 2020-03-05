import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Master from "../../layouts/Master";
import FormListsContext from "../../contexts/FormListsContext";
import FormListsAdd from "./FormListsAdd";
import FormListRemove from "./FormListRemove";

export default function FormLists() {
 const history = useHistory();
 const { formLists, fetchAllFormListsFromApi } = useContext(FormListsContext);

 useEffect(() => {
  fetchAllFormListsFromApi();
 }, []);

 const [removingFormList, setRemovingFirmList] = useState(null);
 const [isAdding, setIsAdding] = useState(false);

 return (
  <Master>
   {removingFormList && (
    <FormListRemove
     formListId={removingFormList.id}
     formListTitle={removingFormList.title}
     onClose={() => setRemovingFirmList(null)}
    />
   )}
   <div className="container">
    <div className="card">
     <div className="card-header justify-content-between">
      <h4 className="card-title">Списак формы</h4>
      <div className="form-btn-action">
       <button
        className="btn btn-sm btn-outline-cyan"
        disabled={isAdding}
        onClick={() => setIsAdding(true)}
       >
        <i className="fe fe-plus mr-1"></i>
        <span>Добавить Форму</span>
       </button>
      </div>
     </div>
     <div className="card-body">
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
             <button
              className="btn btn-sm btn-primary-only-text btn-pill"
              onClick={() =>
               history.push("/form-lists", { formListId: formList.id })
              }
             >
              <i className="fe fe-edit mr-1"></i>
              Редактировать
             </button>
            </div>
            <div className="form-action form-action-remove">
             <button
              className="btn btn-sm btn-danger-only-text btn-pill"
              onClick={() => setRemovingFirmList(formList)}
             >
              <i className="fe fe-trash-2 mr-1"></i>
              <span>Удалить</span>
             </button>
            </div>
           </div>
          </td>
         </tr>
        ))}
        {isAdding && <FormListsAdd onCancel={() => setIsAdding(false)} />}
       </tbody>
      </table>
     </div>
    </div>
   </div>
  </Master>
 );
}
