import type { MenuProps } from "antd";
import { Menu, Layout } from "antd";
import styled from "styled-components";
import { COLORS, ROUTES } from "@constants";
import logo from "@assets/images/Logo.png";
import { SizedBox } from "@components";
import { useLocation, useNavigate } from "react-router";
import {
  Dashboard,
  FrontDesk,
  Guest,
  Rooms,
  Deals,
  Rate,
} from "@assets/icons/svg";
import { useState } from "react";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export const Sidebar = () => {
  const location = useLocation(); // To track current path
  const navigate = useNavigate(); // For programmatic navigation
  const path = location.pathname; // Current path
  const [selectedKey, setSelectedKey] = useState(path); // Set initial key to current path

  const items: MenuItem[] = [
    {
      key: ROUTES.home,
      icon: (
        <Dashboard
          color={selectedKey === ROUTES.home ? COLORS.primary : COLORS.grey}
        />
      ),
      label: "Dashboard",
    },
    {
      key: ROUTES.frontDesk,
      icon: (
        <FrontDesk
          color={
            selectedKey === ROUTES.frontDesk ? COLORS.primary : COLORS.grey
          }
        />
      ),
      label: "Front Desk",
    },
    {
      key: ROUTES.guest,
      icon: (
        <Guest
          color={selectedKey === ROUTES.guest ? COLORS.primary : COLORS.grey}
        />
      ),
      label: "Guest",
    },
    {
      key: ROUTES.room,
      icon: (
        <Rooms
          color={selectedKey === ROUTES.room ? COLORS.primary : COLORS.grey}
        />
      ),
      label: "Room",
    },
    {
      key: ROUTES.deals,
      icon: (
        <Deals
          color={selectedKey === ROUTES.deals ? COLORS.primary : COLORS.grey}
        />
      ),
      label: "Deals",
    },
    {
      key: ROUTES.rate,
      icon: (
        <Rate
          color={selectedKey === ROUTES.rate ? COLORS.primary : COLORS.grey}
        />
      ),
      label: "Rate",
    },
  ];

  return (
    <SidebarDiv>
      <img src={logo} alt="Logo" />
      <SizedBox height={10} />
      <Menu
        onClick={(e) => {
          setSelectedKey(e.key);
          navigate(e.key);
        }}
        selectedKeys={[selectedKey]}
        mode="inline"
        items={items}
      />
    </SidebarDiv>
  );
};

export default Sidebar;
const SidebarDiv = styled(Sider)`
  border-right: 1px solid rgb(234, 231, 231);
  overflow: auto;
  padding-top: 1.5em;
  background: #fff !important;
  height: 100vh; /* Full viewport height */
  font-family: "Source Sans Pro";
  position: fixed; /* Make it fixed to the viewport */
  top: 0; /* Align to the top */
  left: 0; /* Align to the left */
  z-index: 1000; /* Ensure it stays above other content */

  .ant-layout .ant-layout-sider {
    border-radius: 1em 1em 0 0;
  }

  .ant-menu {
    padding: 1em;
  }

  .ant-menu .ant-menu-item {
    border-radius: 0.8em;
    color: ${COLORS.grey};
    font-weight: 600;
    font-family: "Manrope", sans-serif;
    padding: 1.8em 1em !important;
    .ant-menu-title-content {
      margin-left: 1em;
    }

    &:hover {
      color: ${COLORS.primary}; /* Change text color on hover */
    }
  }

  .ant-menu .ant-menu-item-selected {
    background-color: ${COLORS.primary}26 !important; /* Add transparency */
    color: ${COLORS.primary} !important;
    font-weight: 600;
  }
`;
