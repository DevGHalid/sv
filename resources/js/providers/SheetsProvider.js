import React, { useReducer, useContext } from "react";
import SheetsContext from "../contexts/SheetsContext";
import sheetsReducer, {
  SHEETS_SUCCESS,
  SHEETS_REQUEST,
  SHEETS_FAIL,
  ADD_SHEET_TO_FORM_LIST,
  ADD_ELEMENT_TO_SHEET,
  UPDATE_INDEX_FOR_ELEMENT,
  CHANGE_COLUMN_TO_ELEMENT,
  REMOVE_ELEMENT_FROM_SHEET
} from "../reducers/sheetsReducer";

export default function SheetsProvider({ children }) {
  const initialState = useContext(SheetsContext);
  const [sheets, dispatch] = useReducer(sheetsReducer, initialState);

  function fetchSheetsByFormListIdFromApi(formListId) {
    return new Promise((resolve, reject) => {
      dispatch({
        type: SHEETS_REQUEST
      });

      axios
        .get(`${BASE_URL}/api/sheets?form_list_id=${formListId}`)
        .then(response => {
          dispatch({
            type: SHEETS_SUCCESS,
            allSheets: response.data
          });

          resolve(response);
        })
        .catch(error => {
          dispatch({
            type: SHEETS_FAIL,
            error: error
          });
        });
    });
  }

  function addElementToSheet(element, sheetId) {
    axios
      .post(`${BASE_URL}/api/sheets/${sheetId}/elements/add`, { element })
      .then(response => {
        const { data } = response;

        const sheet = sheets.allSheets.find(sheet => sheet.id === sheetId);

        // replace the data
        sheet.answers = sheet.answers.map(answer => {
          if (answer.index === data.index) {
            return data;
          }

          return answer;
        });

        dispatch({
          type: SHEETS_SUCCESS,
          allSheets: sheets.allSheets
        });
      });

    // add element to sheet
    dispatch({
      type: ADD_ELEMENT_TO_SHEET,
      payload: {
        sheetId,
        element
      }
    });
  }

  function updateIndexForElement(idxs, sheetId) {
    axios.post(`${BASE_URL}/api/sheets/${sheetId}/elements/update-index`, idxs);

    dispatch({
      type: UPDATE_INDEX_FOR_ELEMENT,
      payload: {
        sheetId,
        oldIndex: idxs.oldIndex,
        newIndex: idxs.newIndex
      }
    });
  }

  function changeColumnToElement(from, to) {
    axios.post(`${BASE_URL}/api/sheets/${to.sheetId}/elements/change-column`, {
      fromSheetId: from.sheetId,
      fromIndex: from.index,
      toIndex: to.index
    });

    dispatch({
      type: CHANGE_COLUMN_TO_ELEMENT,
      payload: {
        from: {
          sheetId: from.sheetId,
          index: from.index
        },
        to: {
          sheetId: to.sheetId,
          index: to.index
        }
      }
    });
  }

  function removeElementFromSheet(answerId, sheetId) {
    axios
      .delete(`${BASE_URL}/api/sheets/${sheetId}/elements/${answerId}/delete`)
      .then(response => {
        if (response.data.deleted) {
          dispatch({
            type: REMOVE_ELEMENT_FROM_SHEET,
            payload: {
              sheetId,
              answerId
            }
          });
        }
      });
  }

  function addSheetToFormList(formListId) {
    axios.post(`${BASE_URL}/api/form-lists/${formListId}/add/sheet`).then(response => {
      dispatch({
        type: ADD_SHEET_TO_FORM_LIST,
        sheet: response.data
      })
    }).catch(error => error);
  }

  return (
    <SheetsContext.Provider
      value={{
        sheets,
        fetchSheetsByFormListIdFromApi,
        addElementToSheet,
        updateIndexForElement,
        changeColumnToElement,
        removeElementFromSheet,
        addSheetToFormList
      }}
    >
      {children}
    </SheetsContext.Provider>
  );
}
