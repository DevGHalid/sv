export const FORM_LIST_REQUEST = "FORM_LIST_REQUEST";
export const FORM_LIST_SUCCESS = "FORM_LIST_SUCCESS";
export const FORM_LIST_FAIL = "FORM_LIST_FAIL";

export default function formListReducer(state, action) {
 switch (action.type) {
  case FORM_LIST_REQUEST:
   return {
    ...state,
    loading: true
   };
  case FORM_LIST_SUCCESS:
   return {
    ...state,
    loading: false,
    formListItem: action.formListItem
   };
  case FORM_LIST_FAIL:
   return {
    ...state,
    loading: false,
    error: action.error
   };
  default:
   return state;
 }
}
