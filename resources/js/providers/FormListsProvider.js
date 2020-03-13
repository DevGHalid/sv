import React, { useReducer, useContext } from "react";
import FormListsContext from "../contexts/FormListsContext";
import formListsReducer, {
 FORM_LISTS_REQUEST,
 FORM_LISTS_SUCCESS,
 FORM_LISTS_FAIL,
 ADD_FORM_LIST,
 REMOVE_FORM_LIST
} from "../reducers/formListsReducer";

export default function FormListsProvider({ children }) {
 const initialState = useContext(FormListsContext);
 const [formLists, dispatch] = useReducer(formListsReducer, initialState);

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

 function addFormList(title) {
  return new Promise((resolve, reject) => {
   axios
    .post(`${BASE_URL}/api/form-lists/create`, { title })
    .then(response => {
     dispatch({
      type: ADD_FORM_LIST,
      formList: response.data
     });
     resolve(response);
    })
    .catch(error => reject(error));
  });
 }

 function removeFormList(formListId) {
  return new Promise((resolve, reject) => {
   axios
    .delete(`${BASE_URL}/api/form-lists/${formListId}/delete`)
    .then(response => {
     if (response.data.deleted) {
      dispatch({
       type: REMOVE_FORM_LIST,
       formListId
      });

      resolve(response);
     }
    })
    .catch(error => {});
  });
 }

 return (
  <FormListsContext.Provider
   value={{ formLists, fetchAllFormListsFromApi, addFormList, removeFormList }}
  >
   {children}
  </FormListsContext.Provider>
 );
}
