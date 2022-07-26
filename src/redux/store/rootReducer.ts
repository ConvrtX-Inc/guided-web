import { combineReducers } from "@reduxjs/toolkit";

import { reducer as transactionReducer } from "../slices/transaction";

const rootReducer = combineReducers({
  transaction: transactionReducer,
});

export default rootReducer;
