import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Query, GitState } from "../store/inderfaces";

export const fetchRepo = createAsyncThunk(
  "git/fetchGit",
  async (data: Query) => {
    console.log("--perSlice-", data.page);
    const result = await axios
      .get(
        `https://api.github.com/search/repositories?q=${data.query}%20in:name&per_page=${data.perPage}&sort=${data.sort}&page=${data.page}`
      )
      .then(function (response) {
        return response;
      });

    return result.data;
  }
);

const initialState: GitState = {
  data: [],
  loading: false,
  error: "",
  count: 0,
};

export const gitSlice = createSlice({
  name: "git",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRepo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchRepo.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.items;
      state.count = action.payload.total_count;
    });
    builder.addCase(fetchRepo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default gitSlice.reducer;
