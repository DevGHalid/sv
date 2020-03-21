export const SHEETS_REQUEST = "SHEETS_REQUEST";
export const SHEETS_SUCCESS = "SHEETS_SUCCESS";
export const SHEETS_FAIL = "SHEETS_FAIL";

export const DELETE_SHEET = "DELETE_SHEET";

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
        loading: false,
        allSheets: action.sheets
      };

    case SHEETS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case DELETE_SHEET:
      return {
        ...state,
        allSheets: state.allSheets.filter(sheet => sheet.id !== action.sheetId)
      };

    default:
      return state;
  }
}
