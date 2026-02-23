import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create Category
export const createCategory = createAsyncThunk(
  "createCategory",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, image } = payload;
    try {
      const responce = await axios.post(
        "http://localhost:5000/api/category/createcategory",
        { name, image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: JSON.parse(localStorage.getItem("userInfo")).token,
          },
        }
      );

      return responce.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get All Category
export const fetchAllCategory = createAsyncThunk(
  "fetchAllCategory",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const responce = await axios.get(
        "http://localhost:5000/api/category/getallcategory",
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return responce.data.categories;
    } catch (error) {
      return rejectWithValue(error.responce.data);
    }
  }
);

// Delete category
export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const responce = await axios.delete(
        `http://localhost:5000/api/category/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: JSON.parse(localStorage.getItem("userInfo")).token,
          },
        }
      );

      return responce.data;
    } catch (error) {
      return rejectWithValue(error.responce.data);
    }
  }
);

// Update Category
export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { categoryId, categoryData } = payload;

    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("image", categoryData.image);
    try {
      const responce = await axios.put(
        `http://localhost:5000/api/category/${categoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: JSON.parse(localStorage.getItem("userInfo")).token,
          },
        }
      );

      return responce.data;
    } catch {
      return rejectWithValue(error.responce.data);
    }
  }
);

const categorySlices = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    category: {},
    isError: null,
    isLoading: false,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
  },
  extraReducers: (builder) => {
    // Category create
    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAdded = true;
      state.category = action.payload;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    // Get All Categpry
    builder.addCase(fetchAllCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchAllCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    // Deleted Category
    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isDeleted = true;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    // Update Category
    builder.addCase(updateCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isUpdated = true;
      state.category = action.payload;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export default categorySlices.reducer;
