import React, { useState } from "react";
import { HeaderContent } from "./header";
import { FooterContent } from "./footer";
import { Layout, theme } from "antd";
import "./layout.scss";
import { MenuPage } from "./menu";
import { BreadcrumbContent } from "./breadcrumb";
import { Routes } from "./routes";
const { Header, Content, Footer, Sider } = Layout;

const AppLayout = ({onLogout}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo"> Sparc Lab </div>
        <MenuPage />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <HeaderContent logout={onLogout}/>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <BreadcrumbContent />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <FooterContent />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
