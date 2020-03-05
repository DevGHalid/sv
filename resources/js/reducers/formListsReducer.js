export const FORM_LISTS_REQUEST = "FORM_LISTS_REQUEST";
export const FORM_LISTS_SUCCESS = "FORM_LISTS_SUCCESS";
export const FORM_LISTS_FAIL = "FORM_LISTS_FAIL";

export default function formListsReducer(state, action) {
 switch (action.type) {
  case FORM_LISTS_REQUEST:
   return {
    ...state,
    loading: true
   };
   break;
  case FORM_LISTS_SUCCESS:
   return {
    ...state,
    allFormLists: action.formLists,
    loading: false,
    error: null
   };
  case FORM_LISTS_FAIL:
     return {
       ...state,
       loading: false,
       error: action.error
     }
 }
}
