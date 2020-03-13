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
    updateIndexesForElements
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

  const handleDrop = sheetId => item => {
    const { removedIndex, addedIndex, payload } = item;
    if (removedIndex === null && addedIndex === null) return;

    // add element to sheets
    if (addedIndex !== null && removedIndex === null) {
      const element = Object.assign(payload, { index: addedIndex });

      addElementToSheet(element, sheetId);
    }

    // swap places 
    if (removedIndex !== null && addedIndex !== null) {
      updateIndexesForElements({ oldIndex: removedIndex, newIndex: addedIndex}, sheetId); 
    }
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
          {sheets.allSheets.map((sheet, idx) => {
            return (
              <div className="sheet" key={sheet.id}>
                <div className="sheet-content">
                  <Container
                    groupName="elements"
                    getChildPayload={i => sheet.answers[i]}
                    onDrop={handleDrop(sheet.id)}
                  >
                    {sheet.answers.map(answer => (
                      <Draggable
                        className="sheet-item action"
                        key={answer.index}
                      >
                        <div className="sheet-item-text">
                          <span className="mr-2">
                            <i className={answer.icon}></i>
                          </span>
                          {answer.title}
                        </div>
                        <div>
                          <i className="fe fe-x"></i>
                        </div>
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

function Loader() {
  return <div className="loader m-auto mt-lg-9"></div>;
}
