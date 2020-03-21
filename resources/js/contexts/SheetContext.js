import React from "react";

const SheetContext = React.createContext({
  sheetItem: null,
  loading: false,
  error: null
});

export default SheetContext;
