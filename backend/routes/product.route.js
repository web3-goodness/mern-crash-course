// backend/routes/product.route.js
import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public route: fetch all products
router.get("/", getProducts);

// Protected routes: only logged-in users
router.post("/", protect, createProduct);

// Update product by ID (frontend uses /api/products/:pid)
router.put("/:pid", protect, updateProduct);

// Delete product by ID (frontend uses /api/products/:pid)
router.delete("/:pid", protect, deleteProduct);

export default router;



// import express from "express";
// import {
//   getProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from "../controllers/product.controllers.js";
// import { protect } from "../middleware/auth.js";


// const router = express.Router();

// router.get("/", getProducts);           // public
// router.post("/", protect, createProduct); // logged-in users
// router.put("/:id", protect, updateProduct); // owner or admin
// router.delete("/:id", protect, deleteProduct); // owner or admin

// export default router;


// import express from "express";

// import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

// import { protect, admin } from "../middleware/auth.js";

// const router = express.Router();


// router.get("/", getProducts);
// router.post("/", protect, createProduct);
// router.put("/:id", protect, updateProduct);
// router.delete("/:id", protect, admin, deleteProduct)


// export default router;





