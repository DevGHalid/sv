import React, { useReducer, useContext } from "react";
import FormListsContext from "../contexts/FormListsContext";
import formListsReducer, {
 FORM_LISTS_REQUEST,
 FORM_LISTS_SUCCESS,
 FORM_LISTS_FAIL
} from "../reducers/formListsReducer";

export default function FormListsProvider({ children }) {
 const formListContext = useContext(FormListsContext);
 const [formLists, dispatch] = useReducer(formListsReducer, formListContext);

 function fetchAllFormListsFromApi() {
  dispatch({
   type: FORM_LISTS_REQUEST
  });

  axios
   .get(`${BASE_URL}/api/form-lists`)
   .then(response => {
    dispatch({
     type: FORM_LISTS_SUCCESS,
     formLists: response.data
    });
   })
   .catch(error => {
    dispatch({
     type: FORM_LISTS_ERROR,
     error: error.response.data.errors
    });
   });
 }

 return (
  <FormListsContext.Provider value={{ formLists, fetchAllFormListsFromApi }}>
   {children}
  </FormListsContext.Provider>
 );
}
