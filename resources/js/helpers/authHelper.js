export const saveUserDataToLocalStorage = ({ id, name, accessToken }) => {
 localStorage.setItem("userId", id);
 localStorage.setItem("username", name);
 localStorage.setItem("accessToken", accessToken);
};

export const removeUserDataFromLocalStorage = () => {
 localStorage.removeItem("userId");
 localStorage.removeItem("username");
 localStorage.removeItem("accessToken");
};
