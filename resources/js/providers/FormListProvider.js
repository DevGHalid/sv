import React, { useContext, useReducer } from "react";
import FormListContext from "../contexts/FormListContext";
import formListReducer, {
  FORM_LIST_REQUEST,
  FORM_LIST_SUCCESS,
  FORM_LIST_FAIL
} from "../reducers/formListReducer";

export default function FormListProvider({ children }) {
  const initialState = useContext(FormListContext);
  const [formList, dispatch] = useReducer(formListReducer, initialState);

  function fetchFormListFromApi(formListId) {
    return new Promise((resolve, reject) => {
      dispatch({
        type: FORM_LIST_REQUEST
      });

      axios
        .get(`${BASE_URL}/api/form-lists/${formListId}/edit`)
        .then(response => {
          dispatch({
            type: FORM_LIST_SUCCESS,
            formListItem: response.data
          });
          resolve(response);
        })
        .catch(error => {
          dispatch({
            type: FORM_LIST_FAIL,
            error
          });
          reject(error);
        });
    });
  }

  return (
    <FormListContext.Provider value={{ formList, fetchFormListFromApi }}>
      {children}
    </FormListContext.Provider>
  );
}
