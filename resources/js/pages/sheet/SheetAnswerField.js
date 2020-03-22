import React, { useState } from "react";

export default function SheetAnswerFiled({
  type,
  attributes: attrs,
  onEditSheetAnswer,
  onRemoveSheetAnswer
}) {
  switch (type) {
    case "answer_short_text":
      return (
        <div className="sheet-answer-field">
          <div className="sheet-answer-header">
            <div className="sheet-answer-title">{attrs.label}</div>
            <div className="sheet-answer-actions">
              <div className="sheet-answer-action" onClick={onEditSheetAnswer}>
                <i className="fe fe-edit-2" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-copy" />
              </div>
              <div
                className="sheet-answer-action"
                onClick={onRemoveSheetAnswer}
              >
                <i className="fe fe-trash-2" />
              </div>
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder={attrs.placeholder}
          />
        </div>
      );
    case "answer_long_text":
      return (
        <div className="sheet-answer-field">
          <div className="sheet-answer-header">
            <div className="sheet-answer-title">{attrs.label}</div>
            <div className="sheet-answer-actions">
              <div className="sheet-answer-action" onClick={onEditSheetAnswer}>
                <i className="fe fe-edit-2" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-copy" />
              </div>
              <div
                className="sheet-answer-action"
                onClick={onRemoveSheetAnswer}
              >
                <i className="fe fe-trash-2" />
              </div>
            </div>
          </div>
          <textarea
            type="text"
            className="form-control"
            placeholder={attrs.placeholder}
          />
        </div>
      );
    case "email":
      return (
        <div className="sheet-answer-field">
          <div className="sheet-answer-header">
            <div className="sheet-answer-title">{attrs.label}</div>
            <div className="sheet-answer-actions">
              <div className="sheet-answer-action" onClick={onEditSheetAnswer}>
                <i className="fe fe-edit-2" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-copy" />
              </div>
              <div
                className="sheet-answer-action"
                onClick={onRemoveSheetAnswer}
              >
                <i className="fe fe-trash-2" />
              </div>
            </div>
          </div>
          <input
            type="email"
            className="form-control"
            placeholder={attrs.placeholder}
          />
        </div>
      );
    case "file":
      return (
        <div className="sheet-answer-field">
          <div className="sheet-answer-header">
            <div className="sheet-answer-title">{attrs.label}</div>
            <div className="sheet-answer-actions">
              <div className="sheet-answer-action" onClick={onEditSheetAnswer}>
                <i className="fe fe-edit-2" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-copy" />
              </div>
              <div
                className="sheet-answer-action"
                onClick={onRemoveSheetAnswer}
              >
                <i className="fe fe-trash-2" />
              </div>
            </div>
          </div>
          <input
            type="file"
            className="form-control"
            placeholder={attrs.placeholder}
          />
        </div>
      );
    case "drop_down_list":
      return (
        <div className="sheet-answer-field">
          <div className="sheet-answer-header">
            <div className="sheet-answer-title">{attrs.label}</div>
            <div className="sheet-answer-actions">
              <div className="sheet-answer-action" onClick={onEditSheetAnswer}>
                <i className="fe fe-edit-2" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-copy" />
              </div>
              <div
                className="sheet-answer-action"
                onClick={onRemoveSheetAnswer}
              >
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
        </div>
      );
    case "one_option":
      return (
        <div className="sheet-answer-field">
          <div className="sheet-answer-header">
            <div className="sheet-answer-title">{attrs.label}</div>
            <div className="sheet-answer-actions">
              <div className="sheet-answer-action" onClick={onEditSheetAnswer}>
                <i className="fe fe-edit-2" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-copy" />
              </div>
              <div
                className="sheet-answer-action"
                onClick={onRemoveSheetAnswer}
              >
                <i className="fe fe-trash-2" />
              </div>
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder={attrs.placeholder}
          />
        </div>
      );
    case "several_variants":
      return (
        <div className="sheet-answer-field">
          <div className="sheet-answer-header">
            <div className="sheet-answer-title">{attrs.label}</div>
            <div className="sheet-answer-actions">
              <div className="sheet-answer-action" onClick={onEditSheetAnswer}>
                <i className="fe fe-edit-2" />
              </div>
              <div className="sheet-answer-action">
                <i className="fe fe-copy" />
              </div>
              <div
                className="sheet-answer-action"
                onClick={onRemoveSheetAnswer}
              >
                <i className="fe fe-trash-2" />
              </div>
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder={attrs.placeholder}
          />
        </div>
      );
    default:
      return <div />;
  }
}
