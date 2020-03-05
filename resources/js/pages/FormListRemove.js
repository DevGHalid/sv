import React from "react";
import Modal from "../layouts/Modal";

export default function FormListRemove({ title, children, onClose }) {
 return (
  <Modal title="Вы абсолютно уверены?" onClose={onClose}>
   <div>
    Это действие не может быть отменено. Это приведет к необратимому удалению
   </div>
   <div className="mt-2">
    Пожалуйста, введите
    <code className="text-danger">{title}</code> для подтверждения.
   </div>
   <div className="form-group mt-4">
    <input className="form-control" />
    <div className="mt-4">
     <button className="btn btn-cyan btn-block">
      Я понимаю последствия, удалите этоу форму
     </button>
    </div>
   </div>
  </Modal>
 );
}
