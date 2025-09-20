// frontend/src/store/product.js
// frontend/src/store/product.js
import { create } from "zustand";

// Define backend base URL
const BASE_URL = "http://localhost:5000";

export const useProductStore = create((set) => ({
  products: [],

  // Fetch all products (public route)
  fetchProducts: async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/products`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch products");

      set({ products: data.data || [] });
    } catch (err) {
      console.error("❌ Fetch products error:", err.message);
    }
  },

  // Create a new product (protected)
  createProduct: async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const res = await fetch(`${BASE_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify({
          ...product,
          price: parseFloat(product.price) || 0, // ensure price is a number
        }),
      });

      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message || "Server error" };

      set((state) => ({ products: [...state.products, data.data] }));

      return { success: true, message: "Product created successfully" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  // Delete a product (protected)
  deleteProduct: async (pid) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const res = await fetch(`${BASE_URL}/api/products/${pid}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token || ""}` },
      });

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: "Product deleted successfully" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  // Update a product (protected)
  updateProduct: async (pid, updatedProduct) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const res = await fetch(`${BASE_URL}/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify({
          ...updatedProduct,
          price: parseFloat(updatedProduct.price) || 0, // ensure price is a number
        }),
      });

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: "Product updated successfully" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },
}));




// import {create} from "zustand";

// export const useProductStore = create((set) => ({
//   products: [],
//   setProducts: (products) => set({ products }),
//   createProduct: async (newProduct) => {
//     if(!newProduct.name || !newProduct.price || !newProduct.image) {
//        return {success:false, message:"Please fill in all fields"}
//     }
//     const res = await fetch("/api/products", {
//         method:"POST",
//         headers:{
//             "content-Type":"application/json"
//         },
//         body:JSON.stringify(newProduct)
//     });
//     const data = await res.json();
//     set((state) => {{products:[...state.products, data.data]}});
//     return {success:true, message:"Product created successfully"}
//   }
// }));


