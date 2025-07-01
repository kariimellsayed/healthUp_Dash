"use client";

import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Context/AuthContext";
import onAxios from "../../../utils/axiosIntstance";

const Login = () => {
  const router = useRouter();

  const { setIsLoggedIn, isLoggedIn } = useContext(AuthContext);

  const onFinish = (values) => {
    onAxios
      .post("/api/auth/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        message.success("You have been successfully logged in.");
        window.localStorage.setItem("token-healthUp", res.data.data.token);
        setIsLoggedIn(true);
        router.push("/product");
      })
      .catch((err) => {
        message.error("An error occurred while logging in, Please try again.");
        console.log(err);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/product");
    }
  }, [isLoggedIn]);

  return (
    <div className="wrapperLogin">
      <div className="login">
        <h1>
          Login |{" "}
          <span className="text-xl font-bold text-blue-500">
            HealthUp Store
          </span>
        </h1>
        <Form name="loginForm" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="admin@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>

          <Form.Item>
            <p style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-blue-500 hover:text-blue-600 transition-all duration-200"
              >
                Register here
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

Login.layout = "auth";

export default Login;
