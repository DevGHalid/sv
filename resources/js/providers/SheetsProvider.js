import React, { useContext, useReducer } from "react";
import SheetsContext from "../contexts/SheetsContext";
import sheetsReducer, {
  SHEETS_REQUEST,
  SHEETS_SUCCESS,
  SHEETS_FAIL
} from "../reducers/sheetsReducer";

export default function SheetsProvider({ children }) {
  const intialState = useContext(SheetsContext);
  const [sheets, dispatch] = useReducer(sheetsReducer, intialState);

  const fetchSheetsFromApi = () => {
    dispatch({
      type: SHEETS_REQUEST
    });

    axios
      .get(`${BASE_URL}/api/sheets`)
      .then(response => {
        dispatch({
          type: SHEETS_SUCCESS,
          sheets: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: SHEETS_SUCCESS,
          error
        });
      });
  };

  return (
    <SheetsContext.Provider value={{ sheets, fetchSheetsFromApi }}>
      {children}
    </SheetsContext.Provider>
  );
}
