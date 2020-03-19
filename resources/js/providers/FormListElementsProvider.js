import React, { useContext, useReducer } from "react";
import FormListElementsContext from "../contexts/FormListElementsContext";
import formListElementsReducer, {
  FORM_LIST_ELEMENTS_REQUEST,
  FORM_LIST_ELEMENTS_SUCCESS,
  FORM_LIST_ELEMENTS_FAIL
} from "../reducers/formListElementsReducer";

export default function FormListElementsProvider({ children }) {
  const initialState = useContext(FormListElementsContext);
  const [formListElements, dispatch] = useReducer(
    formListElementsReducer,
    initialState
  );

  function setFormListElements(formListElements) {
    dispatch({
      type: FORM_LIST_ELEMENTS_SUCCESS,
      formListElements
    });
  }

  function fetchAllFormListElementsFromApi() {
    return new Promise((resolve, reject) => {
      dispatch({
        type: FORM_LIST_ELEMENTS_REQUEST
      });

      axios
        .get(`${BASE_URL}/api/form-list-elements`)
        .then(response => {
          setFormListElements(response.data);

          resolve(response);
        })
        .catch(error => {
          dispatch({
            type: FORM_LIST_ELEMENTS_FAIL,
            error
          });

          reject(error);
        });
    });
  }

  return (
    <FormListElementsContext.Provider
      value={{
        formListElements,
        fetchAllFormListElementsFromApi,
        setFormListElements
      }}
    >
      {children}
    </FormListElementsContext.Provider>
  );
}
