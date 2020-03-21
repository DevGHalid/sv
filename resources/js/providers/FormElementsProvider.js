import React, { useContext, useReducer } from "react";
import FormElementsContext from "../contexts/FormElementsContext";
import formElementsReducer, {
  FORM_ELEMENTS_REQUEST,
  FORM_ELEMENTS_SUCCESS,
  FORM_ELEMENTS_FAIL
} from "../reducers/formElementsReducer";

export default function FormElementsProvider({ children }) {
  const initialState = useContext(FormElementsContext);
  const [formElements, dispatch] = useReducer(
    formElementsReducer,
    initialState
  );

  const fetchFormElementsFromApi = () => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: FORM_ELEMENTS_REQUEST
      });
      axios
        .get(`${BASE_URL}/api/form-elements`)
        .then(({ data }) => {
          dispatch({
            type: FORM_ELEMENTS_SUCCESS,
            elements: data
          });
        })
        .catch(error =>
          dispatch({
            type: FORM_ELEMENTS_FAIL,
            error
          })
        );
    });
  };

  return (
    <FormElementsContext.Provider
      value={{ formElements, fetchFormElementsFromApi }}
    >
      {children}
    </FormElementsContext.Provider>
  );
}
