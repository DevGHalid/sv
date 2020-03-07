import React from "react";

const FormListElementsContext = React.createContext({
 allFormListElements: [],
 loading: false,
 error: null
});

export default FormListElementsContext;
