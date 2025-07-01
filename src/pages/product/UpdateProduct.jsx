import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import onAxios from "../../../utils/axiosIntstance";

const EditProduct = ({ open, onClose, refreshProducts, product }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  // جلب الكاتيجوريز
  const getCategories = () => {
    onAxios
      .get("/api/e-commerce/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (open) {
      getCategories();

      // حط قيم الفورم
      if (product) {
        console.log(product);
        form.setFieldsValue({
          name: product.name,
          price: product.price,
          description: product.description,
          stock: product.stock,
          category_id: Number(product.category.id),
        });

        // جهّز صورة حالية داخل upload
        if (product.image_url) {
          setFileList([
            {
              uid: "-1",
              name: "current.jpg",
              status: "done",
              url: product.image_url,
            },
          ]);
        }
      }
    }

    // عند غلق المودال نفضى القائمة
    if (!open) {
      setFileList([]);
      setImageFile(null);
    }
  }, [open, product]);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("stock", values.stock);
    formData.append("category_id", values.category_id);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    setLoading(true);
    onAxios
      .post(`/api/e-commerce/products/${product.id}/update`, formData)
      .then(() => {
        message.success("Product updated successfully!");
        form.resetFields();
        setImageFile(null);
        onClose();
        refreshProducts();
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to update product.");
      })
      .finally(() => setLoading(false));
  };

  // console.log(categories);

  // const categoryOptions = categories.map((cat) => ({
  //   label: cat.name,
  //   value: cat.id,
  // }));

  return (
    <Modal
      title="Edit Product"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okText="Save"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Please enter product name" }]}
        >
          <Input placeholder="Product Name" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <Input placeholder="Price" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea placeholder="Description" rows={4} />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Stock"
          rules={[{ required: true, message: "Please enter stock" }]}
        >
          <Input placeholder="Stock" />
        </Form.Item>

        <Form.Item
          name="category_id"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select Category">
            {categories.map((cat) => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* <Form.Item label="Product Image">
          <Upload
            beforeUpload={(file) => {
              setImageFile(file);
              return false;
            }}
            showUploadList={
              imageFile
                ? [{ name: imageFile.name }]
                : product?.image_url
                ? [{ name: "Current Image", url: product.image_url }]
                : false
            }
            maxCount={1}
            onRemove={() => setImageFile(null)}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item> */}
        <Form.Item label="Product Image" required>
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={(file) => {
              setImageFile(file); // نمسك الملف لارساله
              setFileList([
                {
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  url: URL.createObjectURL(file), // معاينة فورية
                },
              ]);
              return false;
            }}
            onRemove={() => {
              setImageFile(null);
              setFileList([]);
            }}
            maxCount={1}
          >
            {fileList.length === 0 ? "+ Upload" : null}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProduct;
