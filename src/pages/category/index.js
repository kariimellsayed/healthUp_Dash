"use client";

import React, { useEffect, useState } from "react";
import { Breadcrumb, Table, Spin, Button, Modal, Input, message } from "antd";
import onAxios from "../../../utils/axiosIntstance";

const Category = () => {
  /* ========== States ========== */
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  /* مودال */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null); // null = إضافة، رقم = تعديل

  /* ========== CRUD functions ========== */

  // جلب التصنيفات
  const getCategories = () => {
    setLoading(true);
    onAxios
      .get("/api/e-commerce/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  // إضافة أو تعديل
  const handleSubmitCategory = () => {
    if (!name.trim()) return message.warning("Please enter a category name");

    setLoading(true);

    const request = editId
      ? onAxios.put(`/api/e-commerce/categories/update/${editId}`, { name })
      : onAxios.post("/api/e-commerce/categories/store", { name });

    request
      .then(() => {
        message.success(editId ? "Category updated!" : "Category added!");
        handleCancel();
        getCategories();
      })
      .catch(() =>
        message.error(
          editId ? "Failed to update category." : "Failed to add category."
        )
      )
      .finally(() => setLoading(false));
  };

  // حذف
  const handleDeleteCategory = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      okText: "Sure",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setLoading(true);
        onAxios
          .delete(`/api/e-commerce/categories/destroy/${id}`)
          .then(() => {
            message.success("Category deleted successfully!");
            getCategories();
          })
          .catch(() => message.error("Failed to delete category."))
          .finally(() => setLoading(false));
      },
    });
  };

  /* ========== Modal helpers ========== */

  // Add Category
  const showAddModal = () => {
    setEditId(null);
    setName("");
    setIsModalOpen(true);
  };

  // Update Category
  const openEditModal = (record) => {
    setEditId(record.id);
    setName(record.name);
    setIsModalOpen(true);
  };

  // Cancel Modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setName("");
    setEditId(null);
  };

  /* ========== Table columns ========== */
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "",
      key: "id",
      dataIndex: "id",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteCategory(record.id)}
          >
            Delete
          </Button>
          <Button type="primary" onClick={() => openEditModal(record)}>
            Update
          </Button>
        </div>
      ),
    },
  ];

  /* ========== Lifecycle ========== */
  useEffect(() => {
    getCategories();
  }, []);

  /* ========== Render ========== */
  return (
    <div>
      {/* Modal */}
      <Modal
        title={editId ? "Update Category" : "Add New Category"}
        open={isModalOpen}
        onOk={handleSubmitCategory}
        onCancel={handleCancel}
        confirmLoading={loading}
        okText="Ok"
      >
        <Input
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>

      {/* Breadcrumb */}
      <Breadcrumb items={[{ title: "Category" }]} />

      {/* Page content */}
      <div className="category_page" style={{ minHeight: "60vh" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "60vh",
            }}
          >
            <Spin tip="Loading Categories..." size="large" />
          </div>
        ) : (
          <>
            <Button
              type="primary"
              onClick={showAddModal}
              style={{ marginBottom: 20 }}
            >
              + Add Category
            </Button>

            <Table
              columns={columns}
              dataSource={categories}
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

Category.layout = "admin";

export default Category;
