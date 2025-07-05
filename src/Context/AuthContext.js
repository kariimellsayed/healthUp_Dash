import React, { createContext, useState, useEffect } from "react";
// import { message } from "antd";
// import onAxios from "../../utils/axiosIntstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   const getCarts = () => {
  //     onAxios
  //       .get("/api/e-commerce/cart/")
  //       .then((res) => {
  //         setDataCarts(res.data.data);
  //         setCartMeta(res.data.meta);
  //         // console.log("Cart fetched:", res.data);
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching cart:", err);
  //       });
  //   };

  //   const getProducts = () => {
  //     setProductsLoading(true);
  //     onAxios
  //       .get("/api/e-commerce/products")
  //       .then((res) => {
  //         setDataProducts(res.data.data);
  //       })
  //       .catch((err) => {
  //         console.log("Error fetching products:", err);
  //       })
  //       .finally(() => {
  //         setProductsLoading(false);
  //       });
  //   };

  useEffect(() => {
    const token = localStorage.getItem("token-healthUp-admin");

    if (token) {
      setIsLoggedIn(true);
      //   getCarts();
      //   getProducts();
    } else {
      setIsLoggedIn(false);
      //   setDataCarts([]);
      //   setCartMeta({ total_items: 0, total_price: 0 });
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        // dataCarts,
        // setDataCarts,
        // setCartMeta,
        // cartMeta,
        // getCarts,
        // getProducts,
        // productsLoading,
        // dataProducts,
        // setDataProducts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
