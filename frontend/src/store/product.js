// frontend/src/store/product.js
import { create } from "zustand";

// Base URL: use localhost in development, relative path in production
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : ""; // relative path works on Render since frontend + backend are together

const getToken = () => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return "";
    const parsed = JSON.parse(raw);
    return parsed.token || parsed?.data?.token || "";
  } catch {
    return "";
  }
};

const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

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

  fetchProducts: async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/products`);
      const data = await safeJson(res);
      if (!res.ok) throw new Error(data.message || "Failed to fetch products");
      set({ products: Array.isArray(data.data) ? data.data : [] });
    } catch (err) {
      console.error("Fetch products error:", err.message);
      set({ products: [] });
    }
  },

  createProduct: async (product) => {
    try {
      const res = await fetch(`${BASE_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ ...product, price: parseFloat(product.price) || 0 }),
      });
      const data = await safeJson(res);
      if (!res.ok) return { success: false, message: data.message || "Server error" };
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${pid}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
      });
      const data = await safeJson(res);
      if (!res.ok) return { success: false, message: data.message || "Delete failed" };
      set((state) => ({ products: state.products.filter((p) => p._id !== pid) }));
      return { success: true, message: "Product deleted" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ ...updatedProduct, price: parseFloat(updatedProduct.price) || 0 }),
      });
      const data = await safeJson(res);
      if (!res.ok) return { success: false, message: data.message || "Update failed" };
      set((state) => ({ products: state.products.map((p) => (p._id === pid ? data.data : p)) }));
      return { success: true, message: "Product updated" };
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


