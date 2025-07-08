import React, { useEffect, useState } from "react";
import { Breadcrumb, Table, Spin, Modal, Button, message } from "antd";
import onAxios from "../../../utils/axiosIntstance";
import Image from "next/image";
import AddProduct from "./addProduct";
import EditProduct from "./UpdateProduct";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  const [imgError, setImgError] = useState({});

  // GetProducts
  const getProducts = () => {
    setLoading(true);
    onAxios
      .get("/api/e-commerce/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteProduct = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      okText: "Sure",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setLoading(true);
        onAxios
          .delete(`/api/e-commerce/products/destroy/${id}`)
          .then(() => {
            message.success("Product deleted successfully!");
            getProducts(); // refresh
          })
          .catch((err) => {
            console.error(err);
            message.error("Failed to delete product.");
          })
          .finally(() => {
            setLoading(false);
          });
      },
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div className="wrapperTitle">
          <Image
            src={record.image_url}
            alt={name}
            width={40}
            height={40}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid #eee",
            }}
            onError={() =>
              setImgError((prev) => ({ ...prev, [record.id]: true }))
            }
          />
          {/* {record.image_url && !imgError[record.id] ? (
            <Image
              src={record.image_url}
              alt={name}
              width={40}
              height={40}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid #eee",
              }}
              onError={() =>
                setImgError((prev) => ({ ...prev, [record.id]: true }))
              }
            />
          ) : (
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                color: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: 14,
                border: "1px solid #eee",
              }}
            >
              {name?.charAt(0).toUpperCase()}
            </div>
          )} */}
          <h6 style={{ fontSize: "12px" }}>{name}</h6>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      //   render: (price) => `$${price}`, // عرض السعر بالدولار
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
            onClick={() => handleDeleteProduct(record.id)}
          >
            Delete
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setEditProductData(record);
              setEditModalOpen(true);
            }}
          >
            Update
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: "Product",
          },
        ]}
      />
      <div
        className="product_page"
        style={{ minHeight: "60vh", paddingTop: 20 }}
      >
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
            <Button
              type="primary"
              style={{ marginBottom: 20 }}
              onClick={() => setIsModalOpen(true)}
            >
              Add Product
            </Button>

            <Table
              columns={columns}
              dataSource={products}
              rowKey="id"
              scroll={{ x: "max-content" }}
              pagination={{ pageSize: 8 }}
            />
          </>
        )}

        {/* Add Product Modal */}
        <AddProduct
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refreshProducts={getProducts}
        />

        {/* Edit Product Modal */}
        <EditProduct
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setEditProductData(null);
          }}
          product={editProductData}
          refreshProducts={getProducts}
        />
      </div>
    </div>
  );
};

Product.layout = "admin";

export default Product;
