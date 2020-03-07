import React from "react";

const FormListsContext = React.createContext({
 formListItem: null,
 loading: false,
 error: null
});

export default FormListsContext;
