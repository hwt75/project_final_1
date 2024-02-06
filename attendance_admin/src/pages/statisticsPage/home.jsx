import React, { useEffect, useState } from "react";


import "./index.scss";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Alert, Space } from 'antd';
import { getStaticsData, loadStatus} from "../../redux/dataSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(
    {
      countStudent: 0,
      countAttendance: 0,
      countStudentAttendance: 0,
    }
  );
  const curentTime = new Date();
  const curentDate = `day: ${curentTime.getDate()}, month: ${curentTime.getMonth()}, year: ${curentTime.getFullYear()}`;
  console.log(curentDate);
  const dataState = useSelector((state) => state.dataSlice);

  useEffect(()=>{
    dispatch(getStaticsData())
  },[])
  useEffect(()=>{
    if(dataState.loadGetStaticsStatus === loadStatus.Success)
    {
      setData(dataState.static)
    }
  },[dataState.loadGetStaticsStatus])

  return (  
    <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message={`Number of student: ${data.countStudent}`} type="success" />
    <Alert message={`Number of attendance records in ${curentDate}: ${data.countAttendance}`} type="info" />
    <Alert message={`Number of student that attendance in ${curentDate} : ${data.countStudentAttendance}`} type="warning" />
  </Space>
  );
};

export const StatisticPage = Home;
