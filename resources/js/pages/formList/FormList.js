import React, { useState, useEffect, useContext } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { Container, Draggable } from "react-smooth-dnd";
import Master from "../../layouts/Master";
import FormListContext from "../../contexts/FormListContext";
import FormListElementsContext from "../../contexts/FormListElementsContext";
import SheetsContext from "../../contexts/SheetsContext";

export default function FormList() {
  const history = useHistory();
  const params = useParams();
  const { formList, fetchFormListFromApi } = useContext(FormListContext);
  const { formListItem } = formList;

  useEffect(() => {
    fetchFormListFromApi(params.id);
  }, []);

  return (
    <Master>
      {!formListItem ? (
        <Loader />
      ) : (
        <FormListContent formListItem={formListItem} />
      )}
    </Master>
  );
}

function FormListContent({ formListItem }) {
  const {
    sheets,
    fetchSheetsByFormListIdFromApi,
    addElementToSheet,
    updateIndexForElement,
    changeColumnToElement,
    removeElementFromSheet
  } = useContext(SheetsContext);

  useEffect(() => {
    fetchSheetsByFormListIdFromApi(formListItem.id);
  }, []);

  const { formListElements, fetchAllFormListElementsFromApi } = useContext(
    FormListElementsContext
  );

  useEffect(() => {
    fetchAllFormListElementsFromApi();
  }, []);

  const handleDrop = sheetIdx => item => {
    const sheet = sheets.allSheets[sheetIdx];
    const { removedIndex, addedIndex, payload } = item;

    if (removedIndex === null && addedIndex === null) return;

    // add element to sheets
    if (addedIndex !== null && payload !== null && removedIndex === null) {
      if ("sheet_id" in payload) {
        const answer = sheet.answers[addedIndex];
        const answerIndex = answer ? answer.index : null;

        changeColumnToElement(
          {
            sheetId: payload.sheet_id,
            index: payload.index
          },
          {
            sheetId: sheet.id,
            index: answerIndex
          }
        );
      } else {
        const answer = sheet.answers[addedIndex];
        const answerIndex = answer ? answer.index : null;
        const element = Object.assign(payload, { index: answerIndex });

        addElementToSheet(element, sheet.id);
      }

      return;
    }

    // swap places
    if (removedIndex !== null && addedIndex !== null) {
      const { index: oldIndex } = sheet.answers[removedIndex];
      const { index: newIndex } = sheet.answers[addedIndex];

      updateIndexForElement({ oldIndex, newIndex }, sheet.id);
    }
  };

  const handleRemoveElement = (answerId, sheetId) => () => {
    removeElementFromSheet(answerId, sheetId);
  };

  return (
    <div className="sheets">
      {sheets.loading ? (
        <Loader />
      ) : (
        <div className="sheets-content">
          <div className="sheet">
            <div className="sheet-content">
              <Container
                groupName="elements"
                behaviour="copy"
                getChildPayload={i => formListElements.allFormListElements[i]}
              >
                {formListElements.allFormListElements.map(element => {
                  return (
                    <Draggable className="sheet-item action" key={element.id}>
                      <div className="sheet-item-text">
                        <span className="mr-2">
                          <i className={element.icon}></i>
                        </span>
                        {element.title}
                      </div>
                    </Draggable>
                  );
                })}
              </Container>
            </div>
          </div>
          {sheets.allSheets.map((sheet, sheetIdx) => {
            return (
              <div className="sheet" key={sheet.id}>
                <div className="sheet-content">
                  <Container
                    groupName="elements"
                    getChildPayload={i => sheet.answers[i]}
                    onDrop={handleDrop(sheetIdx)}
                  >
                    {sheet.answers.map(answer => (
                      <Draggable
                        className="sheet-item action"
                        key={answer.index}
                      >
                        <SheetItem
                          {...answer}
                          onRemoveElement={handleRemoveElement(answer.id, sheet.id)}
                        />
                      </Draggable>
                    ))}
                  </Container>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SheetItem({ icon, title, onRemoveElement }) {
  const [isRemoving, setIsRemoving] = useState(
    false
  );

  const handleConfirmRemoveElement = () => {
    setIsRemoving(false);
    onRemoveElement();
  }

  return (
    <>
      <div className="sheet-item-text">
        <span className="mr-2">
          <i className={icon}></i>
        </span>
        {title}
      </div>
      <div className="sheet-item-actions">
        {isRemoving ? (
          <>
            <span className="sheet-item-action" onClick={handleConfirmRemoveElement}>
              <i className="fe fe-check"></i>
            </span>
            <span className="sheet-item-action" onClick={() => setIsRemoving(false)}>
              <i className="fe fe-x"></i>
            </span>
          </>
        ) : (
          <span className="sheet-item-action" onClick={() => setIsRemoving(true)}>
            <i className="fe fe-trash"></i>
          </span>
        )}
      </div>
    </>
  );
}

function Loader() {
  return <div className="loader m-auto mt-lg-9"></div>;
}
