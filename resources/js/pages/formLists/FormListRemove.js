import React, { useState, useContext } from "react";
import Modal from "../../layouts/Modal";
import FormListContext from "../../contexts/FormListsContext";

export default function FormListRemove({
 formListId,
 formListTitle,
 children,
 onClose
}) {
 const { removeFormList } = useContext(FormListContext);
 const [confirmingTitle, setConfirmingTitle] = useState("");
 const isConfirmTitle = confirmingTitle === formListTitle;

 const confirmRemoveFormList = () => {
  if (!isConfirmTitle) return;
  removeFormList(formListId)
   .then(response => onClose())
   .catch(error => error);
 };

 return (
  <Modal title="Вы абсолютно уверены?" onClose={onClose}>
   <div>
    Это действие не может быть отменено. Это приведет к необратимому удалению
   </div>
   <div className="mt-2">
    Пожалуйста, введите <code className="text-dark">{formListTitle}</code> для
    подтверждения.
   </div>
   <div className="form-group mt-4">
    <input
     className="form-control"
     onChange={({ target }) => setConfirmingTitle(target.value)}
    />
    <div className="mt-4">
     <button
      className="btn btn-danger btn-block"
      disabled={!isConfirmTitle}
      onClick={confirmRemoveFormList}
     >
      Я понимаю последствия, удалите этоу форму
     </button>
    </div>
   </div>
  </Modal>
 );
}
