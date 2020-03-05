import React from "react";

const FormListsContext = React.createContext({
 allFormLists: [],
 error: null,
 loading: false
});

export default FormListsContext;
