export const SHEET_ANSWERS_REQUEST = "SHEET_ANSWERS_REQUEST";
export const SHEET_ANSWERS_SUCCESS = "SHEET_ANSWERS_SUCCESS";
export const SHEET_ANSWERS_FAIL = "SHEET_ANSWERS_FAIL";

export const ADD_SHEET_ANSWER = "ADD_SHEET_ANSWER";
export const UPDATE_SHEET_ANSWER = "UPDATE_SHEET_ANSWER";
export const UPDATE_INDEX_TO_SHEET_ANSWER = "UPDATE_INDEX_TO_SHEET_ANSWER";

export default function sheetAnswersReducer(state, action) {
  switch (action.type) {
    case SHEET_ANSWERS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case SHEET_ANSWERS_SUCCESS:
      return {
        ...state,
        loading: false,
        answers: action.answers
      };

    case SHEET_ANSWERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case ADD_SHEET_ANSWER:
      const newAnswers = [];
      let isLast = true;

      for (const answer of state.answers) {
        if (answer.index === action.answer.index) {
          newAnswers.push(action.answer);
          isLast = false;
        }

        newAnswers.push(answer);
      }

      if (isLast) {
        newAnswers.push(action.answer);
      }

      for (const answer of state.answers) {
        if (answer.index >= action.answer.index) {
          answer.index++;
        }
      }

      return {
        ...state,
        loading: false,
        answers: newAnswers
      };

    case UPDATE_SHEET_ANSWER:
      return {
        ...state,
        answers: state.answers.map(answer => {
          if (answer.id === action.answer.id) {
            return { ...answer, ...action.answer };
          }

          return { ...answer };
        })
      };

    case UPDATE_INDEX_TO_SHEET_ANSWER:
      const oldAnswer = state.answers.find(
        answer => answer.index === action.payload.oldIndex
      );

      if (action.payload.oldIndex < action.payload.newIndex) {
        for (const answer of state.answers) {
          if (
            answer.index > action.payload.oldIndex &&
            answer.index <= action.payload.newIndex
          ) {
            answer.index--;
          }
        }
      } else {
        for (const answer of state.answers) {
          if (
            answer.index < action.payload.oldIndex &&
            answer.index >= action.payload.newIndex
          ) {
            answer.index++;
          }
        }
      }

      oldAnswer.index = action.payload.newIndex;

      return {
        ...state,
        loading: false,
        answers: state.answers.sort((answer1, answer2) => {
          if (answer1.index > answer2.index) {
            return 1;
          }

          if (answer1.index < answer2.index) {
            return -1;
          }

          return 0;
        })
      };

    default:
      return state;
  }
}
