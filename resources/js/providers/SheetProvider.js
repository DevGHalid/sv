import React, { useContext, useReducer } from "react";
import SheetContext from "../contexts/SheetContext";
import sheetReducer, {
  SHEET_REQUEST,
  SHEET_SUCCESS,
  SHEET_FAIL
} from "../reducers/sheetReducer";

export default function SheetProvider({ children }) {
  const initialState = useContext(SheetContext);
  const [sheet, dispatch] = useReducer(sheetReducer, initialState);

  function fetchSheetItemFromApi(sheetId) {
    return new Promise((resolve, reject) => {
      dispatch({
        type: SHEET_REQUEST
      });

      axios
        .get(`${BASE_URL}/api/sheets/${sheetId}`)
        .then(({ data }) => {
          dispatch({
            type: SHEET_SUCCESS,
            sheetItem: data
          });
        })
        .catch(error => dispatch({ type: SHEET_FAIL, error }));
    });
  }

  return (
    <SheetContext.Provider value={{ sheet, fetchSheetItemFromApi }}>
      {children}
    </SheetContext.Provider>
  );
}
