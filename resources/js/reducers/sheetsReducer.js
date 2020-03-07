export const SHEETS_REQUEST = "SHEETS_REQUEST";
export const SHEETS_SUCCESS = "SHEETS_SUCCESS";
export const SHEETS_FAIL = "SHEETS_FAIL";

export default function sheetsReducer(state, action) {
 switch (action.type) {
  case SHEETS_REQUEST:
   return {
    ...state,
    loading: true
   };
  case SHEETS_SUCCESS:
   return {
    ...state,
    loading: false
   };
  case SHEETS_FAIL:
   return {
    ...state,
    loading: false,
    error: action.error
   };
  default:
   return state;
 }
}
