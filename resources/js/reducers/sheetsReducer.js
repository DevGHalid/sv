export const SHEETS_REQUEST = "SHEETS_REQUEST";
export const SHEETS_SUCCESS = "SHEETS_SUCCESS";
export const SHEETS_FAIL = "SHEETS_FAIL";

export const ADD_ELEMENT_TO_SHEET = "ADD_ELEMENT_TO_SHEET";
export const UPDATE_INDEXES_FOR_ELEMENTS = "UPDATE_INDEXES_FOR_ELEMENTS";

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
        allSheets: action.allSheets,
        loading: false
      };
    case SHEETS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case ADD_ELEMENT_TO_SHEET:
      if (action.payload === undefined) {
        throw new Error(`[${ADD_ELEMENT_TO_SHEET}]: no payload!`);
      }

      if (
        action.payload.sheetId === undefined ||
        action.payload.index === undefined ||
        action.payload.element === undefined
      ) {
        throw new Error(`[${ADD_ELEMENT_TO_SHEET}]: bad payload data!`);
      }

      return {
        ...state,
        allSheets: state.allSheets.map(sheet => {
          if (sheet.id === action.payload.sheetId) {
            const { answers } = sheet;

            let i = action.payload.index;
            while (answers[i]) {
              answers[i++].index++;
            }

            answers.splice(action.payload.index, 0, action.payload.element);
          }

          return sheet;
        })
      };
    case UPDATE_INDEXES_FOR_ELEMENTS:
      if (action.payload === undefined) {
        throw new Error(`[${ADD_ELEMENT_TO_SHEET}]: no payload!`);
      }

      if (
        action.payload.oldIndex === undefined ||
        action.payload.newIndex === undefined
      ) {
        throw new Error(`[${UPDATE_INDEXES_FOR_ELEMENTS}]: bad payload data!`);
      }

      return {
        ...state,
        allSheets: state.allSheets.map(sheet => {
          if (sheet.id === action.payload.sheetId) {
            const { answers } = sheet;
            const { oldIndex, newIndex } = action.payload;

            const oldAnswer = answers[oldIndex];

            if (oldIndex < newIndex) {
              let i = newIndex;

              while (i > oldIndex) {
                answers[i--].index--;
              }
            } else {
              let i = oldIndex;

              while (i >= newIndex) {
                answers[i--].index++;
              }
            }

            oldAnswer.index = newIndex;

            answers.sort((a, b) => {
              if (a.index > b.index) {
                return 1;
              }

              if (a.index < b.index) {
                return -1;
              }

              return 0;
            });

            return sheet;
          }

          return sheet;
        })
      };

    default:
      return state;
  }
}
