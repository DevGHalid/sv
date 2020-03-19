export const USERS_REQUEST = "USERS_REQUEST";
export const USERS_SUCCESS = "USERS_SUCCESS";
export const USERS_FAIL = "USERS_FAIL";

export default function usersReducer(state, action) {
  switch (action.type) {
    case USERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case USERS_SUCCESS:
      return {
        ...state,
        allUsers: action.users,
        loading: false,
        error: null
      };
    case USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
  }
}
