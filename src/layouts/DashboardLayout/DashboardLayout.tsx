import { Outlet } from "react-router";
import { Header, Sidebar } from "@layouts";
import { Layout } from "antd";
import { styled } from "styled-components";
const { Content } = Layout;

export const DashboardLayout = () => {
  return (
    <Layout style={{ overflow: "hidden" }}>
      <Header />
      <Layout>
        <Sidebar />
        <Content
          style={{
            padding: "1rem",
            minHeight: "100vh",
          }}
        >
          <MainContainer>
            <Outlet />
          </MainContainer>
        </Content>
      </Layout>
    </Layout>
  );
};

const MainContainer = styled.div`
  position: relative;
  width: calc(100% - 200px);
  margin-left: auto;
  margin-top: 125px;
`;

export default DashboardLayout;
