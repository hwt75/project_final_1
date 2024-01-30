import * as React from "react";
import { useNavigate } from "react-router-dom";
import { routerMapping } from "./routes";
import { Menu } from "antd";

const Home = () => {
  const navigate = useNavigate();

  const convertObjectToArray = (obj) => {
    return Object.values(obj || {}).map((item) => ({
      key: item.key,
      label: (
        <div
          onClick={() => {
            navigate(item.url);
          }}
        >
          {item.label}
        </div>
      ),
      icon: item.icon,
    }));
  };

  const menuItem = convertObjectToArray(routerMapping);
  return (
    <>
      <Menu
        theme="dark"
        defaultSelectedKeys={["user"]}
        mode="inline"
        items={menuItem}
      />
    </>
  );
};

export const MenuPage = Home;
