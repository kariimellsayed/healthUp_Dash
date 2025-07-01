"use client";

import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Select, Row, Col, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Context/AuthContext";
import onAxios from "../../../utils/axiosIntstance";

const { Option } = Select;

const Register = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    console.log(values);
    onAxios
      .post("/api/auth/register", {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirm,
        role: values.role,
        phone: values.phone,
        gender: values.gender,
      })
      .then((res) => {
        message.success("A new account has been created.");
        router.push("/");
      })
      .catch((err) => {
        message.error("Error creating a new account.");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <div className="wrapperRegister">
      <div className="register">
        <h1>Register</h1>
        <Form
          form={form}
          name="registerForm"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="example@example.com" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Role"
                name="role"
                initialValue="client"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select>
                  <Option value="client">Client</Option>
                  <Option value="doctor">Doctor</Option>
                  <Option value="admin">Admin</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  { required: true, message: "Please select your gender" },
                ]}
              >
                <Select placeholder="Select gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern: /^[0-9+\-() ]+$/,
                message: "Phone number must not contain letters",
              },
            ]}
          >
            <Input placeholder="+123456789" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Confirm Password"
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Register
            </Button>
          </Form.Item>

          <Form.Item>
            <p style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-500 transition-all duration-200 hover:text-blue-600"
              >
                Login here
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

Register.layout = "auth";

export default Register;
