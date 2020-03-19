export const SHEETS_REQUEST = "SHEETS_REQUEST";
export const SHEETS_SUCCESS = "SHEETS_SUCCESS";
export const SHEETS_FAIL = "SHEETS_FAIL";

export const ADD_SHEET_TO_FORM_LIST = "ADD_SHEET_TO_FORM_LIST";

export const ADD_ELEMENT_TO_SHEET = "ADD_ELEMENT_TO_SHEET";
export const UPDATE_INDEX_FOR_ELEMENT = "UPDATE_INDEX_FOR_ELEMENT";
export const CHANGE_COLUMN_TO_ELEMENT = "CHANGE_COLUMN_TO_ELEMENT";
export const REMOVE_ELEMENT_FROM_SHEET = "REMOVE_ELEMENT_FROM_SHEET";

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

    case ADD_SHEET_TO_FORM_LIST:
      return {
        ...state,
        allSheets: state.allSheets.concat(action.sheet)
      };
    case ADD_ELEMENT_TO_SHEET:
      if (action.payload === undefined) {
        throw new Error(`[${ADD_ELEMENT_TO_SHEET}]: no payload!`);
      }

      if (
        action.payload.sheetId === undefined ||
        action.payload.element === undefined
      ) {
        throw new Error(`[${ADD_ELEMENT_TO_SHEET}]: bad payload data!`);
      }

      return {
        ...state,
        allSheets: state.allSheets.map(sheet => {
          if (sheet.id === action.payload.sheetId) {
            const { answers } = sheet;
            const { element } = action.payload;
            const { index } = element;

            if (index !== null) {
              const newAnswers = answers.reduce((newAnswers, answer) => {
                if (answer.index === index) {
                  newAnswers.push(element);
                }

                newAnswers.push(answer);
                return newAnswers;
              }, []);

              for (let answer of answers) {
                if (answer.index >= index) {
                  answer.index++;
                }
              }

              sheet.answers = newAnswers;
            } else {
              const lastAnswer = answers[answers.length - 1];
              element.index = lastAnswer != null ? lastAnswer.index + 1 : 0;

              sheet.answers = sheet.answers.concat(element);
            }
          }

          return sheet;
        })
      };
    case UPDATE_INDEX_FOR_ELEMENT:
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
            const { oldIndex, newIndex } = action.payload;
            const { answers } = sheet;

            const oldAnswer = answers.find(answer => answer.index === oldIndex);

            if (oldIndex < newIndex) {
              for (const answer of answers) {
                if (answer.index > oldIndex && answer.index <= newIndex) {
                  answer.index--;
                }
              }
            } else {
              for (const answer of answers) {
                if (answer.index < oldIndex && answer.index >= newIndex) {
                  answer.index++;
                }
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
          }

          return sheet;
        })
      };
    case CHANGE_COLUMN_TO_ELEMENT:
      const { to, from } = action.payload;
      return {
        ...state,
        allSheets: state.allSheets.map(sheet => {
          if (sheet.id === to.sheetId) {
            const fromSheet = state.allSheets.find(
              sheet => sheet.id === from.sheetId
            );
            const fromAnswerIndex = fromSheet.answers.findIndex(
              answer => answer.index === from.index
            );
            const fromAnswer = fromSheet.answers.splice(fromAnswerIndex, 1)[0];

            for (const fromItem of fromSheet.answers) {
              if (fromItem.index > fromAnswer.index) {
                fromItem.index--;
              }
            }

            if (to.index === null) {
              const lastAnswer = sheet.answers[sheet.answers.length - 1];

              fromAnswer.sheet_id = to.sheetId;
              fromAnswer.index =
                lastAnswer !== undefined ? lastAnswer.index + 1 : 1;

              sheet.answers.push(fromAnswer);
            } else {
              const toAnswerIndex = sheet.answers.findIndex(
                answer => answer.index === to.index
              );

              for (const toItem of sheet.answers) {
                if (toItem.index >= to.index) {
                  toItem.index++;
                }
              }

              fromAnswer.sheet_id = to.sheetId;
              fromAnswer.index = to.index;

              sheet.answers.splice(toAnswerIndex, 0, fromAnswer);
            }
          }

          return sheet;
        })
      };
    case REMOVE_ELEMENT_FROM_SHEET:
      return {
        ...state,
        allSheets: state.allSheets.map(sheet => {
          if (sheet.id === action.payload.sheetId) {
            const answer = sheet.answers.find(
              answer => answer.id === action.payload.answerId
            );

            for (const item of sheet.answers) {
              if (item.index > answer.index) {
                item.index--;
              }
            }

            sheet.answers = sheet.answers.filter(item => item.id !== answer.id);
          }
          return sheet;
        })
      };
    default:
      return state;
  }
}
