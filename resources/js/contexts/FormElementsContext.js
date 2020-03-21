import React from "react";

const FormElementsContext = React.createContext({
  elements: [],
  loading: false,
  error: null
});

export default FormElementsContext;
