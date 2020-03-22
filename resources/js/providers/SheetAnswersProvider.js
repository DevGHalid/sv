import React, { useContext, useReducer } from "react";
import SheetAnswersContext from "../contexts/SheetAnswersContext";
import sheetAnswersReducer, {
  SHEET_ANSWERS_REQUEST,
  SHEET_ANSWERS_SUCCESS,
  SHEET_ANSWERS_FAIL,
  ADD_SHEET_ANSWER,
  UPDATE_INDEX_SHEET_ANSWER
} from "../reducers/sheetAnswersReducer";

export default function SheetAnswersProvider({ children }) {
  const initialState = useContext(SheetAnswersContext);
  const [sheetAnswers, dispatch] = useReducer(
    sheetAnswersReducer,
    initialState
  );

  const sheetAnswersRequest = () => {
    dispatch({
      type: SHEET_ANSWERS_REQUEST
    });
  };

  const sheetAnswersSuccess = answers => {
    dispatch({
      type: SHEET_ANSWERS_SUCCESS,
      answers
    });
  };

  const sheetAnswersFail = error => {
    dispatch({
      type: SHEET_ANSWERS_FAIL,
      error
    });
  };

  const fetchSheetAnswersBySheetIdFromApi = sheetId => {
    sheetAnswersRequest();

    axios
      .get(`${BASE_URL}/api/sheets/${sheetId}/answers`)
      .then(({ data }) => {
        sheetAnswersSuccess(data);
      })
      .catch(error => {
        sheetAnswersFail(error);
      });
  };

  const addSheetAnswerToSheet = (elementId, attrs, index, sheetId) => {
    sheetAnswersRequest();

    axios
      .post(`${BASE_URL}/api/sheets/${sheetId}/answers/add`, {
        form_element_id: elementId,
        attributes: attrs,
        index
      })
      .then(({ data }) => {
        dispatch({
          type: ADD_SHEET_ANSWER,
          answer: data
        });
      });
  };

  const updateIndexToSheetAnswer = (oldIndex, newIndex, sheetId) => {
    sheetAnswersRequest();

    axios
      .put(`${BASE_URL}/api/sheets/${sheetId}/answers/index`, {
        old_index: oldIndex,
        new_index: newIndex
      })
      .then(({ data }) => {
        if (data.updated) {
          dispatch({
            type: UPDATE_INDEX_SHEET_ANSWER,
            payload: {
              oldIndex,
              newIndex
            }
          });
        }
      });
  };

  return (
    <SheetAnswersContext.Provider
      value={{
        sheetAnswers,
        fetchSheetAnswersBySheetIdFromApi,
        addSheetAnswerToSheet,
        updateIndexToSheetAnswer
      }}
    >
      {children}
    </SheetAnswersContext.Provider>
  );
}
