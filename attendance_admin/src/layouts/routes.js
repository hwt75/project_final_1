import * as React from "react";
import {Route, Routes as ReactRouterRoutes } from "react-router-dom";
import { UserManagementPage } from "../pages/userManagement";
import { ErrorPage } from "../pages/errorPage/errorPage";
import { StatisticPage } from "../pages/statisticsPage/home";
import { DevelopmentComponent } from "../components/developmentComponent/home";
import {

    StarFilled,
    PieChartOutlined,
    SettingFilled,
    UserOutlined,
  } from '@ant-design/icons';

export const routerMapping = {
    UserManagement: {
        key: 'user',
        label: 'Quản lý người dùng',
        icon: <UserOutlined />,
        url: '/user'
    },
    Statistics:{
        key: 'statistics',
        label: 'Thống kê',
        icon: <PieChartOutlined />,
        url: '/statics'
    },
    Settings: {
        key: 'settings',
        label: 'Cài đặt',
        icon: <SettingFilled />,
        url: '/setting'
    },
    Helps:{
        key: 'helps',
        label: 'Trợ giúp',
        icon: <StarFilled />,
        url: '/help'
    },
    
}

export const getRouterByPath = (path) => {
    const key =  Object.keys(routerMapping || {}).find(key => routerMapping[key].url === path)
    return key ? routerMapping[key] : ""
}

export const Routes = () => {
    return (
        <ReactRouterRoutes>
            <Route path= {routerMapping.UserManagement.url} element={<UserManagementPage/>} />
            <Route path= {routerMapping.Statistics.url} element={<StatisticPage/>} />
            <Route path= {routerMapping.Settings.url} element={<DevelopmentComponent/>} />
            <Route path= {routerMapping.Helps.url} element={<DevelopmentComponent/>} />

            <Route path= '/error' element={<ErrorPage/>} />
            <Route path="*" element={<UserManagementPage/>} />
        </ReactRouterRoutes>
    )
}