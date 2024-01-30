import * as React from "react";

import "./index.scss";

import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate()


  React.useEffect(()=>{
    window.scrollTo(0, 0)

  },[])
  return (
    <>
      home pagesddsfdssfsdsfdssf
    </>
  );
};

export const StatisticPage = Home;
