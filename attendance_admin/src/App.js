import React, { useState } from "react";
import { BrowserRouter} from "react-router-dom";
import  AppLayout  from "./layouts/layout";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ConfigProvider } from 'antd';
import { LoginPage } from "./pages/loginPage/home";
export const App = () => {
  const [istoken,setToken] = useState(false)
  React.useEffect(()=>{

  const token = localStorage.getItem('token');
    if(token)
    {
      setToken(true)
    } 
  },[])
  const login = () =>{
    const token = "token";
    localStorage.setItem('token', token);
    setToken(true);
  }
  const logout = () =>{
    localStorage.removeItem('token');
    setToken(false);
  }
  return (
    <Provider store={store}>
      <BrowserRouter>
      <ConfigProvider>
        { istoken  ? <AppLayout onLogout = {logout}/> : <LoginPage onLogin={login}/>}
      </ConfigProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
