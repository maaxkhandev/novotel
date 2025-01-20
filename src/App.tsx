import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ROUTES } from "@constants";
import {
  DashboardPage,
  DealPage,
  FrontDeskPage,
  GuestPage,
  RatePage,
  RoomPage,
  LoginPage,
  SignupPage,
} from "@pages";
import { CombinedProvider } from "@providers";
import { ProtectedRoute } from "layouts/ProtectedRoute/ProtectedRoute";

import AuthLayout from "layouts/AuthLayout/AuthLayout";

function App() {
  return (
    <CombinedProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path={ROUTES.login} element={<LoginPage />}></Route>
            <Route path={ROUTES.signup} element={<SignupPage />}></Route>
          </Route>
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<DashboardPage />} />
            <Route path={ROUTES.deals} element={<DealPage />} />
            <Route path={ROUTES.frontDesk} element={<FrontDeskPage />} />
            <Route path={ROUTES.guest} element={<GuestPage />} />
            <Route path={ROUTES.room} element={<RoomPage />} />
            <Route path={ROUTES.rate} element={<RatePage />} />
          </Route>
        </Routes>
      </Router>
    </CombinedProvider>
  );
}

export default App;
