import * as React from "react";
import { Breadcrumb } from "antd";
import { getRouterByPath } from "./routes";
import { useLocation, useNavigate } from "react-router-dom";

export const BreadcrumbContent = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const routerItem = getRouterByPath(pathname);

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        {routerItem && <Breadcrumb.Item>{routerItem.label}</Breadcrumb.Item>}
      </Breadcrumb>
    </>
  );
};
