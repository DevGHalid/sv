import React, { useState, useContext, useMemo, memo } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { Formik, Form, Field } from "formik";
import Modal from "../../layouts/Modal";
import SheetAnswersContext from "../../contexts/SheetAnswersContext";

export default function SheetAnswerEdit({ type, sheetAnswerId, onClose }) {
  const { sheetAnswers, updateAttributesToSheetAnswer } = useContext(
    SheetAnswersContext
  );
  const answer = useMemo(
    () =>
      sheetAnswers.answers.find(answer => {
        return answer.id === sheetAnswerId;
      }),
    [sheetAnswerId]
  );

  const handleSubmit = attributes => {
    updateAttributesToSheetAnswer({ attributes }, answer.id);
    // close model
    onClose();
  };

  return (
    <Modal>
      <div className="modal-body">
        <Formik
          initialValues={{ ...answer.attributes }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => {
            return (
              <>
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
                    <DropDownListAddItem
                      onAdd={value => {
                        handleChange({
                          type: "",
                          target: {
                            name: "options",
                            value: values.options.concat(value)
                          }
                        });
                      }}
                    />

                    {values.options && values.options.length ? (
                      <DropDownListItems
                        options={values.options}
                        onChange={value =>
                          handleChange({
                            type: "",
                            target: {
                              name: "options",
                              value
                            }
                          })
                        }
                      />
                    ) : (
                      ""
                    )}
                  </div>
                )}
                <div className="d-flex">
                  <button
                    className="btn btn-outline-cyan f-grow-1 mr-2"
                    onClick={handleSubmit}
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
              </>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
}

const DropDownListAddItem = memo(
  ({ onAdd }) => {
    const [option, setOption] = useState("");

    const handleChangeOption = ({ target }) => {
      setOption(target.value);
    };

    const handleAddOption = () => {
      onAdd(option);
      // clear filed
      setOption("");
    };

    return (
      <div className="form-group mb-3">
        <label className="form-label" id="question">
          Введите новые варианты ответа
        </label>
        <div className="row gutters-xs">
          <div className="col">
            <input
              className="form-control"
              type="text"
              value={option}
              onChange={handleChangeOption}
            />
          </div>
          <div className="col col-auto">
            <button
              className="btn btn-secondary"
              disabled={!option}
              onClick={handleAddOption}
            >
              <i className="fe fe-plus" />
            </button>
          </div>
        </div>
      </div>
    );
  }
  // (prevProps, nextProps) => prevProps.options === nextProps.options
);

const DropDownListItems = memo(
  ({ options, onChange }) => {
    const handleDrop = ({ removedIndex, addedIndex, payload }) => {
      if (removedIndex === null && addedIndex === null) return null;

      const newOptions = options.slice();
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = newOptions.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        newOptions.splice(addedIndex, 0, itemToAdd);
      }

      onChange(newOptions);
    };

    const handleChangeOption = idx => ({ target }) => {
      const newOptions = options.slice();
      newOptions[idx] = target.value;
      onChange(newOptions);
    };

    const handleRemoveOption = idx => () => {
      const newOptions = options.filter((_, i) => idx !== i);
      onChange(newOptions);
    };

    return (
      <Container onDrop={handleDrop} getChildPayload={i => options[i]}>
        {options.map((option, idx) => (
          <Draggable
            className="list-group-item list-group-item-action sheet-answer-option"
            key={idx}
          >
            <input
              type="text"
              className="sheet-answer-option-field mr-3"
              value={option}
              onChange={handleChangeOption(idx)}
            />
            <div className="sheet-answer-option-actions">
              <div
                className="sheet-answer-option-action"
                onClick={handleRemoveOption(idx)}
              >
                <i className="fe fe-trash" />
              </div>
            </div>
          </Draggable>
        ))}
      </Container>
    );
  },
  (prevProps, nextProps) => prevProps.options === nextProps.options
);
