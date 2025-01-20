import { Navigate } from "react-router";
import { DashboardLayout } from "@layouts";
import { ROUTES } from "@constants";
import { useAuthContext } from "@hooks";
import { Spin } from "antd";

export const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useAuthContext();
  const content = <div>Loading user data...</div>;

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      </div>
    );

  return isLoggedIn ? <DashboardLayout /> : <Navigate to={ROUTES.login} />;
};
