import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadStatus } from './dataSlice';


export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        loginStatus: loadStatus.Failed
    },
    reducers: {
      login: (state, action) =>{
        console.log("login");
        localStorage.setItem('token', "loginadmin")
        state.loginStatus = loadStatus.Success;
      },
      logout: (state, action) =>{
        localStorage.removeItem('token');
        state.loginStatus = loadStatus.Failed;
      }
    },
    
})
export const { login, logout } = dataSlice.actions; 
export default dataSlice.reducer;
