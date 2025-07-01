"use client";

import React, { useEffect, useState } from "react";
import { Breadcrumb, Table, Spin, Button, Modal, Input, message } from "antd";
import onAxios from "../../../utils/axiosIntstance";

const Order = () => {
  /* ========== States ========== */
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  /* مودال */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  /* ========== CRUD functions ========== */

  // جلب التصنيفات
  const getOrders = () => {
    setLoading(true);
    onAxios
      .get("/api/e-commerce/orders/all")
      .then((res) => setOrders(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  // Delete
  const handleDeleteOrder = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this order?",
      okText: "Sure",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setLoading(true);
        onAxios
          .delete(`/api/e-commerce/orders/destroy/${id}`)
          .then(() => {
            message.success("Order deleted successfully!");
            getOrders();
          })
          .catch(() => message.error("Failed to delete order."))
          .finally(() => setLoading(false));
      },
    });
  };

  /* ========== Table columns ========== */
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Total Price (EGP)",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // render: (status) => (
      //   <span
      //     style={{
      //       color: status === "pending" ? "#faad14" : "#52c41a",
      //       fontWeight: "bold",
      //     }}
      //   >
      //     {status.charAt(0).toUpperCase() + status.slice(1)}
      //   </span>
      // ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) =>
        new Date(date).toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteOrder(record.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  /* ========== Lifecycle ========== */
  useEffect(() => {
    getOrders();
  }, []);

  /* ========== Render ========== */
  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb items={[{ title: "Orders" }]} />

      {/* Page content */}
      <div className="category_page">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "60vh",
            }}
          >
            <Spin tip="Loading Products..." size="large" />
          </div>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={orders}
              rowKey="id"
              scroll={{ x: "max-content" }}
              pagination={{ pageSize: 8 }}
            />
          </>
        )}
      </div>
    </div>
  );
};

Order.layout = "admin";

export default Order;
