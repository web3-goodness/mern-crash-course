// frontend/src/store/product.js
import { create } from "zustand";

// ✅ Use backend depending on environment
const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://your-backend.onrender.com" // ⬅️ replace with your actual Render backend URL
    : "http://localhost:5000";

// ✅ Helper: get token safely
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token || "";
  return {
    Authorization: `Bearer ${token}`,
  };
};

// ✅ Helper: safely parse JSON (avoids crash on non-JSON responses)
const safeJson = async (res) => {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { message: text || "Unexpected server response" };
  }
};

export const useProductStore = create((set) => ({
  products: [],

  // Fetch all products (public)
  fetchProducts: async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/products`);
      const data = await safeJson(res);

      if (!res.ok) throw new Error(data.message || "Failed to fetch products");

      set({ products: data.data || [] });
    } catch (err) {
      console.error("❌ Fetch products error:", err.message);
    }
  },

  // Create product (protected)
  createProduct: async (product) => {
    try {
      const res = await fetch(`${BASE_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          ...product,
          price: parseFloat(product.price) || 0,
        }),
      });

      const data = await safeJson(res);
      if (!res.ok)
        return { success: false, message: data.message || "Server error" };

      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  // Delete product (protected)
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${pid}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
      });

      const data = await safeJson(res);
      if (!res.ok)
        return { success: false, message: data.message || "Delete failed" };

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: "Product deleted successfully" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  // Update product (protected)
  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          ...updatedProduct,
          price: parseFloat(updatedProduct.price) || 0,
        }),
      });

      const data = await safeJson(res);
      if (!res.ok)
        return { success: false, message: data.message || "Update failed" };

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


