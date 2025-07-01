import React, { useContext, useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Link from "next/link";
import ActiveLink from "@/components/ActiveLink";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Context/AuthContext";
const { Header, Sider, Content } = Layout;
const LayoutsAdmin = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  // Router
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        {/* <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <ActiveLink href="/product"> Product </ActiveLink>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <ActiveLink href="/category"> Category </ActiveLink>,
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: <ActiveLink href="/order"> Order </ActiveLink>,
            },
          ]}
        /> */}

        <Menu theme="dark" mode="inline" selectedKeys={[router.pathname]}>
          <Menu.Item key="/product">
            <ActiveLink href="/product" icon={<UserOutlined />}>
              Product
            </ActiveLink>
          </Menu.Item>
          <Menu.Item key="/category">
            <ActiveLink href="/category" icon={<VideoCameraOutlined />}>
              Category
            </ActiveLink>
          </Menu.Item>
          <Menu.Item key="/order">
            <ActiveLink href="/order" icon={<UploadOutlined />}>
              Order
            </ActiveLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            // minHeight: 280,
            maxHeight: 700,
            // background: "#000",
            // borderRadius: borderRadiusLG,
            // overflow: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutsAdmin;
