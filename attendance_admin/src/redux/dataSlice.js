import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosRequest, axiosGetRequest } from '../utils/util';

export const loadStatus = {
    None: 0,
    Loading: 1,
    Success: 2,
    Failed: 3
  }

  export const getData = createAsyncThunk('/user', async (params, { rejectWithValue }) => {
    try {
      const response = await axiosGetRequest();
      return response.data;
    } 
    catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  });
  export const getUserById = createAsyncThunk('/get-user-by-id', async (params, { rejectWithValue }) => {
    try {
      const response = await axiosGetRequest(params);
      return response.data;
    } 
    catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  });
  export const deleteUser = createAsyncThunk('/delete-user', async (params, { rejectWithValue }) => {
    try {
      const response = await axiosGetRequest(true,params);
      return response.data;
    } 
    catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  });
  export const addUser = createAsyncThunk('/add-user', async (params, { rejectWithValue }) => {
    try{
      const response = await axiosRequest('/add', params);
      return response.data;
    }
    catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  })
  export const updateUser = createAsyncThunk('/update-user', async (params, { rejectWithValue }) => {
    try{
      const response = await axiosRequest('/update', params);
      return response.data;
    }
    catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  })
 
export const dataSlice = createSlice({
    name: 'data',
    initialState: {
      data: [],
      loadDataStatus: loadStatus.None,
      loadAddUserStatus: loadStatus.None,
      loadUpdateUserStatus: loadStatus.None,
      loadGetUserByIdStatus: loadStatus.None,
      loadDeleteUserStatus: loadStatus.None,
    },
    reducers: {
      resetLoadDataStatus: (state,action)=>{
        state.data = [];
        state.loadDataStatus = loadStatus.None
      },
      resetAddUserStatus: (state,action)=>{
        state.loadAddUserStatus = loadStatus.None
      },
      resetUpdateUserStatus: (state,action)=>{
        state.loadUpdateUserStatus = loadStatus.None
      },
      resetGetUserByIdStatus: (state,action)=>{
        state.loadGetUserByIdStatus = loadStatus.None
      },
      resetDeleteUserStatus: (state,action)=>{
        state.loadDeleteUserStatus = loadStatus.None
      }
    },
    extraReducers:(builder) => {
      builder
      .addCase(getData.pending, (state,action)=>{
        console.log("failed");
        state.loadDataStatus = loadStatus.Loading;
      })
      .addCase(getData.fulfilled, (state,action)=>{
        console.log(action.payload);
        state.data = action.payload;
        state.loadDataStatus = loadStatus.Success;
      })
      .addCase(getData.rejected,(state,action)=>{
        state.data = [];
        state.loadDataStatus = loadStatus.Failed
      })
      .addCase(addUser.pending, (state,action) => {
        state.loadAddUserStatus = loadStatus.Loading;
      })
      .addCase(addUser.fulfilled, (state,action) => {
        state.loadAddUserStatus = loadStatus.Success;
      })
      .addCase(addUser.rejected, (state,action)=>{
        state.loadAddUserStatus = loadStatus.Failed;
      })
      .addCase(updateUser.pending, (state,action) => {
        state.loadUpdateUserStatus = loadStatus.Loading;
      })
      .addCase(updateUser.fulfilled, (state,action) => {
        state.loadUpdateUserStatus = loadStatus.Success;
      })
      .addCase(updateUser.rejected, (state,action)=>{
        state.loadUpdateUserStatus = loadStatus.Failed;
      })
      .addCase(deleteUser.pending, (state,action) => {
        state.loadDeleteUserStatus = loadStatus.Loading;
      })
      .addCase(deleteUser.fulfilled, (state,action) => {
        state.loadDeleteUserStatus = loadStatus.Success;
      })
      .addCase(deleteUser.rejected, (state,action)=>{
        state.loadDeleteUserStatus = loadStatus.Failed;
      })
      .addCase(getUserById.pending, (state,action) => {
        state.loadGetUserByIdStatus = loadStatus.Loading;
      })
      .addCase(getUserById.fulfilled, (state,action) => {
        state.loadGetUserByIdStatus = loadStatus.Success;
      })
      .addCase(getUserById.rejected, (state,action)=>{
        state.loadGetUserByIdStatus = loadStatus.Failed;
      })
    }
})
// export const {resetLoadDataStatus, resetAddUserStatus, resetUpdateUserStatus,resetGetUserByIdStatus,resetDeleteUserStatus} = dataSlice.actions;
export default dataSlice.reducer;