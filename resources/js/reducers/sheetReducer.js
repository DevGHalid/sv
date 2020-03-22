export const SHEET_REQUEST = "SHEET_REQUEST";
export const SHEET_SUCCESS = "SHEET_SUCCESS";
export const SHEET_FAIL = "SHEET_FAIL";

export default function sheetReducer(state, action) {
  switch (action.type) {
    case SHEET_REQUEST:
      return {
        ...state,
        loading: true
      };

    case SHEET_SUCCESS:
      return {
        ...state,
        loading: false,
        sheetItem: action.sheetItem
      };

    case SHEET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}
