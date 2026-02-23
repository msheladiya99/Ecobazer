import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/order",
        order,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getMyOrders = createAsyncThunk(
  "getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/order/myorders",
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "getOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/order/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    success: false,
    order: null,
    orders: [],
    error: null,
  },
  reducers: {
    resetOrder: (state) => {
      state.success = false;
      state.order = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
