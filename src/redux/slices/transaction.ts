import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TransactionUserFilter } from "../../shared/enums/TransactionUserFIlter";
import TransactionHistoryService from "../../services/transaction-history/TrasanctionHistory.Service";
import { AxiosResponse } from "axios";
import { TransactionHistory } from "../../shared/interfaces/transaction-history.interface";
export const fetchTransactionHistory = createAsyncThunk(
  "transaction/fetchTransactionHistory",
  async () => {
    const res: AxiosResponse =
      await TransactionHistoryService.getTransactions();
    if (res.status === 200) return res.data;
    return [];
  }
);

interface InitState {
  userFilter: TransactionUserFilter;
  transactionHistory: TransactionHistory[];
  isLoading: boolean;
}

const initialState: InitState = {
  userFilter: TransactionUserFilter.GUIDES_AND_PARTNERS,
  transactionHistory: [],
  isLoading: false,
};

const slice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    onUserFilterChange: (state: InitState, action: any) => {
      state.userFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactionHistory.fulfilled, (state, action) => {
      state.transactionHistory = [...action.payload];
      state.isLoading = false;
    });
  },
});

export const { reducer } = slice;

export const { onUserFilterChange } = slice.actions;

export default slice;
