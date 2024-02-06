import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest, axiosGetRequest, axiosGetStatic } from "../utils/util";

export const loadStatus = {
  None: 0,
  Loading: 1,
  Success: 2,
  Failed: 3,
};

export const getData = createAsyncThunk(
  "/user",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosGetRequest();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
export const getUserById = createAsyncThunk(
  "/get-user-by-id",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosGetRequest(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
export const deleteUser = createAsyncThunk(
  "/delete",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosGetRequest(true, params);
      console.log("delete");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
export const addUser = createAsyncThunk(
  "/add-user",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosRequest("/add", params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
export const getStaticsData = createAsyncThunk(
  "/statics",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosGetStatic();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    static: {
      countStudent: 0,
      countAttendance: 0,
      countStudentAttendance: 0,
    },
    loadDataStatus: loadStatus.None,
    loadAddUserStatus: loadStatus.None,
    loadGetStaticsStatus: loadStatus.None,
    loadGetUserByIdStatus: loadStatus.None,
    loadDeleteUserStatus: loadStatus.None,
  },
  reducers: {
    resetLoadDataStatus: (state, action) => {
      state.data = [];
      state.loadDataStatus = loadStatus.None;
    },
    resetAddUserStatus: (state, action) => {
      state.loadAddUserStatus = loadStatus.None;
    },
    resetGetStatics: (state, action) => {
      state.loadGetStaticsStatus = loadStatus.None;
    },
    resetGetUserByIdStatus: (state, action) => {
      state.loadGetUserByIdStatus = loadStatus.None;
    },
    resetDeleteUserStatus: (state, action) => {
      state.loadDeleteUserStatus = loadStatus.None;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state, action) => {
        state.loadDataStatus = loadStatus.Loading;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadDataStatus = loadStatus.Success;
      })
      .addCase(getData.rejected, (state, action) => {
        state.data = [];
        state.loadDataStatus = loadStatus.Failed;
      })
      .addCase(addUser.pending, (state, action) => {
        state.loadAddUserStatus = loadStatus.Loading;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loadAddUserStatus = loadStatus.Success;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loadAddUserStatus = loadStatus.Failed;
      })
      .addCase(getStaticsData.pending, (state, action) => {
        state.loadGetStaticsStatus = loadStatus.Loading;
      })
      .addCase(getStaticsData.fulfilled, (state, action) => {
        state.static = action.payload;
        state.loadGetStaticsStatus = loadStatus.Success;
      })
      .addCase(getStaticsData.rejected, (state, action) => {
        state.loadGetStaticsStatus = loadStatus.Failed;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loadDeleteUserStatus = loadStatus.Loading;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loadDeleteUserStatus = loadStatus.Success;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loadDeleteUserStatus = loadStatus.Failed;
      })
      .addCase(getUserById.pending, (state, action) => {
        state.loadGetUserByIdStatus = loadStatus.Loading;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loadGetUserByIdStatus = loadStatus.Success;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loadGetUserByIdStatus = loadStatus.Failed;
      });
  },
});
export const {
  resetLoadDataStatus,
  resetAddUserStatus,
  resetGetStatics,
  resetUpdateUserStatus,
  resetGetUserByIdStatus,
  resetDeleteUserStatus,
} = dataSlice.actions;
export default dataSlice.reducer;
