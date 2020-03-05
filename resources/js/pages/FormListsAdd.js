import React from "react";

export default function FormListAdd() {
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
    />
   </td>
   <td>0</td>
   <td>
    <small>Добавиться дата после добавления</small>
   </td>
   <td>
    <div className="d-flex justify-content-end">
     <div className="form-action form-action-edit mr-3">
      <button className="btn btn-sm btn-outline-cyan btn-pill">
       <i className="fe fe-save mr-1"></i>
       <span>Сохранить</span>
      </button>
     </div>
     <div className="form-action form-action-remove">
      <button className="btn btn-sm btn-outline-cyan btn-pill">
       <i className="fe fe-x mr-1"></i>
       <span>Отменить</span>
      </button>
     </div>
    </div>
   </td>
  </tr>
 );
}
