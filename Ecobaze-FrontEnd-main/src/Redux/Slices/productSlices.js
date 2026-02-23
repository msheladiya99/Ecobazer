import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Product Create
export const addProduct = createAsyncThunk(
  "addProduct",
  async ({ data, imageFile }, { rejectWithValue }) => {
    // console.log(imageFile);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("user", data.user);
      formData.append("image", imageFile);
      const response = await axios.post(
        "http://localhost:5000/api/product/createproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: JSON.parse(localStorage.getItem("userInfo")).token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get All Product
export const fetchAllProduct = createAsyncThunk(
  "fetchAllProduct",
  async (params, { rejectWithValue }) => {
    try {
      const { name, category, sort } = params || {};
      let url = "http://localhost:5000/api/product/getallproduct";
      const queryParams = new URLSearchParams();
      if (name) queryParams.append("name", name);
      if (category) queryParams.append("category", category);
      if (sort) queryParams.append("sort", sort);

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }

      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get Single Product

export const fetchSingleProduct = createAsyncThunk(
  "fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/product/getsingleproduct/${id}`
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/product/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: JSON.parse(localStorage.getItem("userInfo")).token,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (payload, { rejectWithValue }) => {
    const { data, imageFile, productId } = payload;
    console.log(data.category);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("image", imageFile);
      const response = await axios.put(
        `http://localhost:5000/api/product/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: JSON.parse(localStorage.getItem("userInfo")).token,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlices = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
    isError: null,
    isLoading: false,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
  },
  extraReducers: (builder) => {
    // Product Addes
    builder.addCase(addProduct.pending, (state) => {
      state.product = {};
      state.isError = null;
      state.isLoading = true;
      state.isAdded = false;
    });
    builder.addCase(addProduct.fulfilled, (state) => {
      state.isLoading = false;
      state.isAdded = true;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.isAdded = false;
    });

    // Get all product
    builder.addCase(fetchAllProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchAllProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.isAdded = false;
    });

    // Get Single Product
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.isAdded = false;
    });

    // Delete Category
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
      state.isDeleted = false;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.isLoading = false;
      state.isDeleted = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.isDeleted = false;
    });

    // Update Category
    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
      state.isUpdated = false;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.isLoading = false;
      state.isUpdated = true;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.isUpdated = false;
    });
  },
});

export default productSlices.reducer;
