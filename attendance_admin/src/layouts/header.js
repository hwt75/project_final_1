import * as React from "react";
import { useState, useEffect } from "react";
import { Breadcrumb } from 'antd';

import "./header.scss";

export const HeaderContent = ({logout}) => {
  

  return (
    <a className="header-content" onClick={logout}>
     Đăng xuất
    </a>
  );
};
