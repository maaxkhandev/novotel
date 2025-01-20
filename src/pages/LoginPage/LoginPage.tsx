import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router";
import { COLORS, ROUTES } from "@constants";
import { SizedBox } from "@components";
import { authService } from "@services";
import { useState } from "react";

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      await authService.logIn(values.email, values.password);
      setIsLoading(false);
      navigate(ROUTES.home);
      message.success("Login successful! Redirecting to home");
    } catch (error) {
      setIsLoading(false);
      message.error(error?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "50px" }}>
      <h1 className="large-title">Login</h1>
      <SizedBox height={20} />
      <Form name="login" onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button
            style={{
              backgroundColor: COLORS.primary,
              color: "#fff",
              fontWeight: "700",
            }}
            htmlType="submit"
            block
            loading={isLoading}
            disabled={isLoading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
      {/* <GoogleButton /> */}

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Don't have an account?{" "}
        <Button
          type="link"
          onClick={() => navigate(ROUTES.signup)}
          style={{ padding: 0 }}
        >
          Signup
        </Button>
      </p>
    </div>
  );
};

export default LoginPage;
