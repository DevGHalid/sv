import React, { useState, useEffect, useContext } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { Container, Draggable } from "react-smooth-dnd";
import Master from "../../layouts/Master";
import FormListContext from "../../contexts/FormListContext";
import FormListElementsContext from "../../contexts/FormListElementsContext";
import applyDrag from "../../helpers/applyDrag";
import SheetsContext from "../../contexts/SheetsContext";

export default function FormList() {
 const history = useHistory();
 const params = useParams();
 const { formList, fetchFormListFromApi } = useContext(FormListContext);
 const {
  formListElements,
  fetchAllFormListElementsFromApi,
  setFormListElements
 } = useContext(FormListElementsContext);

 useEffect(() => {
  fetchFormListFromApi(params.id)
   .then(response => fetchAllFormListElementsFromApi())
   .catch(error => history.goBack());
 }, []);

 return (
  <Master>
   <div className="container">
    {formList.formListItem ? (
     <FormListContent
      formListItem={formList.formListItem}
      formListElements={formListElements.allFormListElements}
      setFormListElements={setFormListElements}
     />
    ) : (
     <div className="loader m-auto"></div>
    )}
   </div>
  </Master>
 );
}

function FormListContent({
 formListItem,
 formListElements,
 setFormListElements
}) {
 const { sheets, fetchSheetsByFormListIdFromApi } = useContext(SheetsContext);

 useEffect(() => {
  fetchSheetsByFormListIdFromApi(formListItem.id);
 }, []);

 return (
  <div className="row">
   <div className="col-lg-12">
    <ul className="nav nav-tabs mb-4 m-0">
     <li className="nav-list-item">
      <NavLink
       to={`/form-lists/${formListItem.id}/edit/constructor`}
       className="nav-link-item"
      >
       Конструктор
      </NavLink>
     </li>
     <li className="nav-list-item">
      <NavLink
       to={`/form-lists/${formListItem.id}/edit/preview`}
       className="nav-link-item"
      >
       Предпросмотр
      </NavLink>
     </li>
    </ul>
   </div>
   <div className="col-lg-3">
    <div>
     <div className="list-group-transparent question-items">
      <Container
       groupName="form-list"
       behaviour="copy"
       getChildPayload={i => formListElements[i]}
       onDrop={e => {
        setFormListElements(applyDrag(formListElements, e));
       }}
      >
       {formListElements.map(formListElement => (
        <Draggable
         className="d-flex align-items-center question-item"
         key={formListElement.id}
        >
         <span className="mr-3 icon">
          <i className={formListElement.icon}></i>
         </span>
         {formListElement.title}
        </Draggable>
       ))}
      </Container>
     </div>
    </div>
   </div>
   <div className="col-lg-9">
    <div className="card">
     <div className="card-body">
      <Container
       className="dimmer active"
       groupName="form-list"
       getChildPayload={i => array[i]}
       onDrop={e => setArray(applyDrag(array, e))}
      >
       {sheets.loading ? (
        <div className="loader m-auto"></div>
       ) : (
        sheets.allSheets.map((sheet, idx) => (
         <Draggable key={idx} className="list-group-item">
          <div className="question d-flex justify-content-between">
           <div className="question-content d-flex">
            <div className="question-icon mr-3">
             <i className={sheet.icon}></i>
            </div>
            <div className="question-title">{sheet.title}</div>
           </div>
           <div className="question-actions d-flex">
            <div className="question-action mr-3">
             <i className="fe fe-settings"></i>
            </div>
            <div className="question-action">
             <i className="fe fe-trash-2"></i>
            </div>
           </div>
          </div>
         </Draggable>
        ))
       )}
      </Container>
     </div>
    </div>
   </div>
  </div>
 );
}
