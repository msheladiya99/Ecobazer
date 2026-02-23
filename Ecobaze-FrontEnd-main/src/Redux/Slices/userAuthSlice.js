import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// User Login Slice
export const userLogin = createAsyncThunk(
  "login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/userlogin",
        {
          email: email,
          password: password,
        }
      );
      // localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// User Register Slice
export const userRegister = createAsyncThunk(
  "userRegister",
  async (
    { firstName, lastName, email, password },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/createuser",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get User
export const getUser = createAsyncThunk(
  "getUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/profile",
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            authorization: JSON.parse(localStorage.getItem("userInfo"))?.token,
          },
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Billing Address
export const updateBillingAddress = createAsyncThunk(
  "updateBillingAddress",
  async (payload, { rejectWithValue }) => {
    // console.log(payload);
    try {
      const response = await axios.put(
        "http://localhost:5000/api/user/updateaddress",
        payload,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            authorization: JSON.parse(localStorage.getItem("userInfo"))?.token,
          },
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Password
export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await axios.put(
        "http://localhost:5000/api/user/updatepassword",
        payload,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            authorization: JSON.parse(localStorage.getItem("userInfo"))?.token,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
); 

// Update Profile

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (payload, { rejectWithValue }) => {
    // console.log(payload);
    try {
      const response = await axios.put(
        "http://localhost:5000/api/user/updateprofile",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: JSON.parse(localStorage.getItem("userInfo"))?.token,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  })

const userAuthSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: false || localStorage.getItem("userInfo") ? true : false,
    user: null,
    isError: null,
    isLodding: false,
    isUpdated: false,
    isAdded: false,
    isDeleted: false,
  },
  extraReducers: (builder) => {
    // User Login
    builder.addCase(userLogin.pending, (state) => {
      state.isLoggedIn = false;
      state.isLodding = true;
      state.user = null;
      state.isError = null;
      state.isUpdated = false;
      state.isAdded = false;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.isLodding = false;
      state.isError = null;
      state.isUpdated = false;
      state.isAdded = false;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.isError = action.payload;
      state.isLodding = false;
      state.user = null;
      state.isUpdated = false;
      state.isAdded = false;
    });

    // User Register
    builder.addCase(userRegister.pending, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isError = null;
      state.isUpdated = false;
      state.isAdded = false;
      state.isDeleted = false;
      state.isLodding = true;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.isLodding = false;
      state.isError = null;
      state.isUpdated = false;
      state.isAdded = false;
      state.isDeleted = false;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.isError = action.payload;
      state.isLodding = false;
      state.user = null;
      state.isUpdated = false;
      state.isAdded = false;
      state.isDeleted = false;
    });

    // Get User
    builder.addCase(getUser.pending, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isError = null;
      state.isUpdated = false;
      state.isAdded = false;
      state.isDeleted = false;
      state.isLodding = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.isError = null;
      state.isUpdated = false;
      state.isAdded = false;
      state.isDeleted = false;
      state.isLodding = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.isError = action.payload;
      state.user = null;
      state.isUpdated = false;
      state.isAdded = false;
      state.isDeleted = false;
      state.isLodding = false;
    });

    // Update Billing Address
    builder.addCase(updateBillingAddress.pending, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isError = null;
      state.isUpdated = false;
      state.isAdded = false;
      state.isDeleted = false;
      state.isLodding = true;
    });
    builder.addCase(updateBillingAddress.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.isError = null;
      state.isUpdated = true;
      state.isAdded = false;
      state.isDeleted = false;
      state.isLodding = false;
    });
    builder.addCase(updateBillingAddress.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.isError = action.payload;
      state.user = null;
      state.isUpdated = false;
      state.isAdded = false;
      state.isDeleted = false;
      state.isLodding = false;
    });

    // Update Password
    builder.addCase(updatePassword.pending, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isError = null;
      state.isUpdated = false;
      state.isAdded = false;
      state.isDeleted = false;
      state.isLodding = true;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.isError = null;
      state.isUpdated = true;
      state.isAdded = false;
      state.isDeleted = false;
      state.isLodding = false;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.isError = action.payload;
      state.user = null;
      state.isUpdated = false;
      state.isAdded = false;
      state.isDeleted = false;
      state.isLodding = false;
    })

    // Update Profile
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isError = null;
      state.isUpdated = false;
      state.isAdded = false;
      state.isDeleted = false;
      state.isLodding = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.isError = null;
      state.isUpdated = true;
      state.isAdded = false;
      state.isDeleted = false;
      state.isLodding = false;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.isError = action.payload;
      state.user = null;
      state.isUpdated = false;
      state.isAdded = false;
      state.isDeleted = false;
      state.isLodding = false;
    })
  },
});

export default userAuthSlice.reducer;
