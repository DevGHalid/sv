import React from 'react';

const SheetAnswersContext = React.createContext({
  answers: [],
  loading: false,
  error: null
});

export default SheetAnswersContext;
