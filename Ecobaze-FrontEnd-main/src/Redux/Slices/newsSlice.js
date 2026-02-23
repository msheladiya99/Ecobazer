 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNews = createAsyncThunk(
  "fetchNews",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const responce = await axios.get(
        "https://newsapi.org/v2/top-headlines?q=food&apiKey=e029de8405d141769b4a0e2507d91426"
      );
    //   console.log(responce?.data?.articles);
      return responce?.data?.articles;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    loading: false,
    error: null,
  },

  //   Get All news
  extraReducers: (bulder) => {
    bulder.addCase(fetchNews.pending, (state) => {
      state.loading = true;
    });
    bulder.addCase(fetchNews.fulfilled, (state, action) => {
      state.news = action.payload;
      state.loading = false;
    });
    bulder.addCase(fetchNews.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default newsSlice.reducer;
