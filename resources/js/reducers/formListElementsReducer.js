export const FORM_LIST_ELEMENTS_REQUEST = "FORM_LIST_ELEMENTS_REQUEST";
export const FORM_LIST_ELEMENTS_SUCCESS = "FORM_LIST_ELEMENTS_SUCCESS";
export const FORM_LIST_ELEMENTS_FAIL = "FORM_LIST_ELEMENTS_FAIL";

export default function formListElementsReducer(state, action) {
  switch (action.type) {
    case FORM_LIST_ELEMENTS_REQUEST:
      return {
        ...state,
        loading: true
      };
      break;
    case FORM_LIST_ELEMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        allFormListElements: action.formListElements
      };
    case FORM_LIST_ELEMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
