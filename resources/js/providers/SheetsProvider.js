import React, { useReducer, useContext } from "react";
import SheetsContext from "../contexts/SheetsContext";
import sheetsReducer, {
  SHEETS_SUCCESS,
  SHEETS_REQUEST,
  SHEETS_FAIL,
  ADD_ELEMENT_TO_SHEET,
  UPDATE_INDEXES_FOR_ELEMENTS
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
    axios.post(`${BASE_URL}/api/sheets/${sheetId}/elements/add`, { element }).then(response => {
      const { data } = response;

      const sheet = sheets.allSheets.find(sheet => sheet.id === sheetId);
      
      // replace the data
      sheet.answers.splice(data.index, 1, data);
    });

    dispatch({
      type: ADD_ELEMENT_TO_SHEET,
      payload: {
        sheetId,
        index: element.index,
        element,
      }
    });
  }

  function updateIndexesForElements(idxs, sheetId) {
    axios.post(`${BASE_URL}/api/sheets/${sheetId}/elements/update-index`, idxs).then(response => {

    });

    dispatch({
      type: UPDATE_INDEXES_FOR_ELEMENTS,
      payload: Object.assign(idxs, { sheetId })
    })
  }

 return (
  <SheetsContext.Provider
   value={{
    sheets,
    fetchSheetsByFormListIdFromApi,
    addElementToSheet,
    updateIndexesForElements
   }}
  >
   {children}
  </SheetsContext.Provider>
 );
}
