import React, { useReducer, useContext } from "react";
import SheetsContext from "../contexts/SheetsContext";
import sheetsReducer, {
 SHEETS_FAIL,
 SHEETS_REQUEST
} from "../reducers/sheetsReducer";

export default function SheetsProvider({ children }) {
 const initialState = useContext(SheetsContext);
 const [sheets, dispatch] = useReducer(sheetsReducer, initialState);

 function setSheets(sheets) {
  dispatch({
   type: SHEETS_SUCCESS,
   allSheets: sheets
  });
 }

 function fetchSheetsByFormListIdFromApi(formListId) {
  return new Promise((resolve, reject) => {
   dispatch({
    type: SHEETS_REQUEST
   });

   axios
    .get(`${BASE_URL}/api/sheets?form_list_id=${formListId}`)
    .then(response => {
     setSheets(response.data);
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

 return (
  <SheetsContext.Provider value={{ sheets, fetchSheetsByFormListIdFromApi }}>
   {children}
  </SheetsContext.Provider>
 );
}
