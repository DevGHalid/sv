export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

export default function authReducer(state, action) {
 switch (action.type) {
  case LOGIN_REQUEST:
   return {
    ...state,
    loading: true
   };
  case LOGIN_SUCCESS:
   return {
    ...state,
    user: {
     id: action.user.id,
     name: action.user.name,
     accessToken: action.user.accessToken
    },
    loading: false,
    error: null,
    loggedIn: true
   };
  case LOGIN_FAIL:
   return {
    user: {},
    loading: false,
    error: action.error,
    loggedIn: false
   };
  case LOGOUT:
   return {
    user: {},
    loading: false,
    error: null,
    loggedIn: false
   };
 }
}
