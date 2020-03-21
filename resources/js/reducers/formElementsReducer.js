export const FORM_ELEMENTS_REQUEST = "FORM_ELEMENTS_REQUEST";
export const FORM_ELEMENTS_SUCCESS = "FORM_ELEMENTS_SUCCESS";
export const FORM_ELEMENTS_FAIL = "FORM_ELEMENTS_FAIL";

export default function formElementsReducer(state, action) {
  switch (action.type) {
    case FORM_ELEMENTS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case FORM_ELEMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        elements: action.elements
      };

    case FORM_ELEMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}
