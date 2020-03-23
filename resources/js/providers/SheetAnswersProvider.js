import React, { useContext, useReducer } from "react";
import SheetAnswersContext from "../contexts/SheetAnswersContext";
import sheetAnswersReducer, {
  SHEET_ANSWERS_REQUEST,
  SHEET_ANSWERS_SUCCESS,
  SHEET_ANSWERS_FAIL,
  ADD_SHEET_ANSWER,
  UPDATE_INDEX_TO_SHEET_ANSWER,
  UPDATE_SHEET_ANSWER
} from "../reducers/sheetAnswersReducer";

export default function SheetAnswersProvider({ children }) {
  const initialState = useContext(SheetAnswersContext);
  const [sheetAnswers, dispatch] = useReducer(
    sheetAnswersReducer,
    initialState
  );

  const setSheetAnswersRequest = () => {
    dispatch({
      type: SHEET_ANSWERS_REQUEST
    });
  };

  const setSheetAnswersSuccess = answers => {
    dispatch({
      type: SHEET_ANSWERS_SUCCESS,
      answers
    });
  };

  const setSheetAnswersFail = error => {
    dispatch({
      type: SHEET_ANSWERS_FAIL,
      error
    });
  };

  const fetchSheetAnswersBySheetIdFromApi = async sheetId => {
    setSheetAnswersRequest();

    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/sheets/${sheetId}/answers`
      );

      setSheetAnswersSuccess(data);
    } catch (erro) {
      setSheetAnswersFail(error);
    }
  };

  const addSheetAnswerToSheet = (elementId, attrs, index, sheetId) => {
    return new Promise((resolve, reject) => {
      setSheetAnswersRequest();

      axios
        .post(`${BASE_URL}/api/sheets/${sheetId}/answers/add`, {
          form_element_id: elementId,
          attributes: attrs,
          index
        })
        .then(response => {
          dispatch({
            type: ADD_SHEET_ANSWER,
            answer: response.data
          });

          resolve(response);
        })
        .catch(reject);
    });
  };

  const updateAllSheetAnswers = async sheetAnswers => {
    try {
      return await axios.put(`${BASE_URL}/api/sheet-answers`, sheetAnswers);
    } catch (error) {}
  };

  const updateAttributesToSheetAnswer = async (sheetAnswer, answerId) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/sheet-answers/${answerId}/attributes`,
        sheetAnswer
      );

      dispatch({
        type: UPDATE_SHEET_ANSWER,
        answer: data
      });
    } catch (error) {}
  };

  const updateIndexToSheetAnswer = async (oldIndex, newIndex, sheetId) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/sheets/${sheetId}/answers/index`,
        {
          old_index: oldIndex,
          new_index: newIndex
        }
      );

      if (data.updated) {
        dispatch({
          type: UPDATE_INDEX_TO_SHEET_ANSWER,
          payload: {
            oldIndex,
            newIndex
          }
        });
      }
    } catch (error) {}
  };

  return (
    <SheetAnswersContext.Provider
      value={{
        sheetAnswers,
        setSheetAnswersSuccess,
        fetchSheetAnswersBySheetIdFromApi,
        addSheetAnswerToSheet,
        updateAllSheetAnswers,
        updateAttributesToSheetAnswer,
        updateIndexToSheetAnswer
      }}
    >
      {children}
    </SheetAnswersContext.Provider>
  );
}
