import React, { useState, useContext } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { Formik, Form, Field } from "formik";
import Modal from "../../layouts/Modal";
import SheetAnswersContext from "../../contexts/SheetAnswersContext";

export default function SheetEditAnswer({ type, sheetAnswerId, onClose }) {
  const { sheetAnswers, updateSheetAnswer } = useContext(SheetAnswersContext);
  const [answer, setAnswer] = useState(() =>
    sheetAnswers.answers.find(answer => {
      return answer.id === sheetAnswerId;
    })
  );

  const handleSubmit = attributes => {
    updateSheetAnswer({ attributes }, answer.id);
    onClose();
  };

  return (
    <Modal>
      <div className="modal-body">
        <Formik
          initialValues={{ ...answer.attributes }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur }) => {
            return (
              <Form>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="question">
                    Вопрос
                    <span className="form-required">*</span>
                  </label>
                  <textarea
                    id="question"
                    className="form-control"
                    name="label"
                    value={values.label || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="placeholder">
                    Вопрос внутри поля
                  </label>
                  <textarea
                    id="placeholder"
                    className="form-control"
                    name="placeholder"
                    value={values.placeholder || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="comment">
                    Комментарий
                  </label>
                  <textarea
                    id="comment"
                    className="form-control"
                    name="comment"
                    value={values.comment || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {answer.slug === "drop_down_list" && (
                  <div className="mb-3">
                    <div className="form-group mb-3">
                      <label className="form-label" id="question">
                        Введите новые варианты ответа
                      </label>
                      <div className="row gutters-xs">
                        <div className="col">
                          <input className="form-control" type="text" />
                        </div>
                        <div className="col col-auto">
                          <button className="btn btn-cyan btn-icon">
                            Добавить
                          </button>
                        </div>
                      </div>
                    </div>

                    <Container>
                      {values.options.map((option, idx) => (
                        <Draggable
                          className="list-group-item list-group-item-action sheet-answer-option"
                          key={option}
                        >
                          <input
                            type="text"
                            className="sheet-answer-option-field mr-3"
                            onChange={({ target }) => {
                              const newOptions = values.options.map(
                                (option, i) => {
                                  if (i === idx) {
                                    return target.value;
                                  }
                                  return option;
                                }
                              );

                              // handleChange();
                              console.log(newOptions);
                            }}
                            value={option}
                          />
                          <div className="sheet-answer-option-actions">
                            <div className="sheet-answer-option-action">
                              <i className="fe fe-trash" />
                            </div>
                          </div>
                        </Draggable>
                      ))}
                    </Container>
                  </div>
                )}
                <div className="d-flex">
                  <button
                    className="btn btn-outline-cyan f-grow-1 mr-2"
                    type="submit"
                  >
                    Сохранить
                  </button>
                  <button
                    className="btn btn-secondary f-grow-1"
                    onClick={onClose}
                  >
                    Отмена
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
}
