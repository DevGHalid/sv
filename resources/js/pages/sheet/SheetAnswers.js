import React, { useState, useContext, useEffect } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import SheetEditAnswer from "./SheetEditAnswer";
import SheetAnswersContext from "../../contexts/SheetAnswersContext";
import Loader from "../../layouts/Loader";

export default function SheetAnswers({ sheetItemId }) {
  const {
    sheetAnswers,
    fetchSheetAnswersBySheetIdFromApi,
    addSheetAnswerToSheet,
    updateIndexToSheetAnswer
  } = useContext(SheetAnswersContext);

  useEffect(() => {
    fetchSheetAnswersBySheetIdFromApi(sheetItemId);
  }, [sheetItemId]);

  const handleDrop = ({ addedIndex, removedIndex, payload }) => {
    if (removedIndex === null && addedIndex !== null) {
      addSheetAnswerToSheet(
        payload.id,
        {
          ...payload.attributes,
          label: payload.title
        },
        addedIndex,
        sheetItemId
      );
    } else if (removedIndex !== null && addedIndex !== null) {
      updateIndexToSheetAnswer(removedIndex, addedIndex, sheetItemId);
    }
  };

  const [editSheetAnswerId, setEditSheetAnswerId] = useState(null);

  return (
    <div>
      {editSheetAnswerId !== null && (
        <SheetEditAnswer sheetAnswerId={editSheetAnswerId} />
      )}

      <Container
        groupName="elements"
        getChildPayload={i => sheetAnswers.answers[i]}
        dragClass="testssss"
        onDrop={handleDrop}
      >
        {sheetAnswers.answers.map(answer => (
          <Draggable className="sheet-answer" key={answer.id}>
            <SheetAnswerFiled
              type={answer.slug}
              attributes={answer.attributes}
              onEditSheetAnswer={() => setEditSheetAnswerId(answer.id)}
            />
          </Draggable>
        ))}

        <button className="btn btn-primary btn-block" type="submit">
          Сохранить
        </button>
      </Container>
    </div>
  );
}

function SheetAnswerFiled({ type, attributes, onEditSheetAnswer }) {
  const [attrs, setAttrs] = useState(attributes);

  switch (type) {
    case "answer_short_text":
      return (
        <label className="sheet-answer-field">
          <div className="sheet-answer-header">
            <div className="sheet-answer-title">{attrs.label}</div>
            <div className="sheet-answer-actions">
              <div className="sheet-answer-action" onClick={onEditSheetAnswer}>
                <i className="fe fe-edit-2" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-copy" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-trash-2" />
              </div>
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder={attrs.placeholder}
          />
        </label>
      );
    case "answer_long_text":
      return (
        <label className="sheet-answer-field">
          <div className="sheet-answer-header">
            <div className="sheet-answer-title">{attrs.label}</div>
            <div className="sheet-answer-actions">
              <div className="sheet-answer-action" onClick={onEditSheetAnswer}>
                <i className="fe fe-edit-2" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-copy" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-trash-2" />
              </div>
            </div>
          </div>
          <textarea
            type="text"
            className="form-control"
            placeholder={attrs.placeholder}
          />
        </label>
      );
    case "email":
      return (
        <label className="sheet-answer-field">
          <div className="sheet-answer-header">
            <div className="sheet-answer-title">{attrs.label}</div>
            <div className="sheet-answer-actions">
              <div className="sheet-answer-action" onClick={onEditSheetAnswer}>
                <i className="fe fe-edit-2" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-copy" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-trash-2" />
              </div>
            </div>
          </div>
          <input
            type="email"
            className="form-control"
            placeholder={attrs.placeholder}
          />
        </label>
      );
    case "file":
      return (
        <label className="sheet-answer-field">
          <div className="sheet-answer-header">
            <div className="sheet-answer-title">{attrs.label}</div>
            <div className="sheet-answer-actions">
              <div className="sheet-answer-action" onClick={onEditSheetAnswer}>
                <i className="fe fe-edit-2" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-copy" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-trash-2" />
              </div>
            </div>
          </div>
          <input
            type="file"
            className="form-control"
            placeholder={attrs.placeholder}
          />
        </label>
      );
    case "drop_down_list":
      return (
        <label className="sheet-answer-field">
          <div className="sheet-answer-header">
            <div className="sheet-answer-title">{attrs.label}</div>
            <div className="sheet-answer-actions">
              <div className="sheet-answer-action" onClick={onEditSheetAnswer}>
                <i className="fe fe-edit-2" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-copy" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-trash-2" />
              </div>
            </div>
          </div>
          <select
            type="text"
            className="form-control"
            placeholder={attrs.placeholder}
          >
            {attrs.options &&
              attrs.options.map(option => (
                <option key={option}>{option}</option>
              ))}
          </select>
        </label>
      );
    case "one_option":
      return (
        <label className="sheet-answer-field">
          <div className="sheet-answer-header">
            <div className="sheet-answer-title">{attrs.label}</div>
            <div className="sheet-answer-actions">
              <div className="sheet-answer-action" onClick={onEditSheetAnswer}>
                <i className="fe fe-edit-2" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-copy" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-trash-2" />
              </div>
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder={attrs.placeholder}
          />
        </label>
      );
    case "several_variants":
      return (
        <label className="sheet-answer-field">
          <div className="sheet-answer-header">
            <div className="sheet-answer-title">{attrs.label}</div>
            <div className="sheet-answer-actions">
              <div className="sheet-answer-action" onClick={onEditSheetAnswer}>
                <i className="fe fe-edit-2" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-copy" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-trash-2" />
              </div>
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder={attrs.placeholder}
          />
        </label>
      );
    default:
      return <div />;
  }
}
