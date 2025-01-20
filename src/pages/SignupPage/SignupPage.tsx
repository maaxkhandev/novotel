import { Form, Input, Button, message, InputNumber } from "antd";
import { useNavigate } from "react-router";
import { COLORS, ROUTES } from "@constants";
import { SizedBox } from "@components";
import { authService } from "@services";
import { useState } from "react";

export const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values: {
    name: string;
    totalRooms: number;
    totalFloors: number;
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      await authService.signUp(
        values.name,
        values.totalRooms,
        values.totalFloors,
        values.email,
        values.password
      );
      setIsLoading(false);
      navigate(ROUTES.home);
      message.success("Signup successful! Redirecting to home");
    } catch (error) {
      setIsLoading(false);
      message.error(error?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "50px" }}>
      <h1 className="large-title">Signup</h1>
      <SizedBox height={20} />
      <Form name="signup" onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          label="Total Rooms"
          name="totalRooms"
          rules={[
            { required: true, message: "Please input total number of rooms" },
          ]}
        >
          <InputNumber
            min={1}
            style={{ width: "100%" }}
            placeholder="total rooms"
          />
        </Form.Item>
        <Form.Item
          label="Total Floors"
          name="totalFloors"
          rules={[
            { required: true, message: "Please input total number of floors" },
          ]}
        >
          <InputNumber
            min={1}
            style={{ width: "100%" }}
            placeholder="total floors"
          />
        </Form.Item>

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
            Signup
          </Button>
        </Form.Item>
      </Form>

      {/* <GoogleButton /> */}

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Already have an account?{" "}
        <Button
          type="link"
          onClick={() => navigate(ROUTES.login)}
          style={{ padding: 0 }}
        >
          Login
        </Button>
      </p>
    </div>
  );
};

export default SignupPage;
