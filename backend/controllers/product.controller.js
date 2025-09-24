// backend/controllers/product.controller.js
import Product from "../models/Product.js";
import mongoose from "mongoose";

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("owner", "username email role");
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    if (!name || price == null || !image) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!req.user || !req.user._id) {
      // If protect middleware malfunctioned
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const product = await Product.create({
      name,
      price,
      image,
      owner: req.user._id,
    });

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/products/:pid
export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
      return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Admin can always edit. Owner can edit if product.owner exists.
    if (!(product.owner && product.owner.toString() === req.user._id.toString()) && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const { name, price, image } = req.body;
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (image !== undefined) product.image = image;

    const updatedProduct = await product.save();
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/products/:pid
export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
      return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (!(product.owner && product.owner.toString() === req.user._id.toString()) && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// import Product from "../models/product.model.js";
// import mongoose from "mongoose";

// // Get all products (public)
// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({}).populate("owner", "username email");
//     res.status(200).json({ success: true, data: products });
//   } catch (error) {
//     console.log("error in fetching product:", error.message);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Create product (only logged-in users)
// export const createProduct = async (req, res) => {
//   const product = req.body;

//   if (!product.name || !product.price || !product.image) {
//     return res.status(400).json({ success: false, message: "Please fill in all fields" });
//   }

//   const newProduct = new Product({
//     ...product,
//     owner: req.user._id, // link product to logged-in user
//   });

//   try {
//     await newProduct.save();
//     res.status(201).json({ success: true, data: newProduct });
//   } catch (error) {
//     console.error("Error in create product", error.message);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Update product (owner or admin)
// export const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const product = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ success: false, message: "Invalid Product Id" });
//   }

//   try {
//     const existingProduct = await Product.findById(id);
//     if (!existingProduct) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     // Only owner or admin can update
//     if (existingProduct.owner.toString() !== req.user._id.toString() && req.user.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
//     res.status(200).json({ success: true, data: updatedProduct });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Delete product (owner or admin)
// export const deleteProduct = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ success: false, message: "Invalid Product Id" });
//   }

//   try {
//     const existingProduct = await Product.findById(id);
//     if (!existingProduct) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     // Only owner or admin can delete
//     if (existingProduct.owner.toString() !== req.user._id.toString() && req.user.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }

//     await existingProduct.remove();
//     res.status(200).json({ success: true, message: "Product deleted" });
//   } catch (error) {
//     console.log("error in deleting product:", error.message);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };



// import Product from "../models/product.model.js";
// import mongoose from "mongoose";

// export const getProducts = async (req,res) => {
//     try {
//         const products = await Product.find({});
//         res.status(200).json({ success: true, data: products });
//     } catch (error) {
//         console.log("error in fetching product:", error.message);
//         res.status(500).json({ success: false, messgae: "Server Error" });
//     }
// };

// export const createProduct = async (req,res) => {
//     const product = req.body;

//     if(!product.name || !product.price || !product.image) {
//         return res.status(400).json({ success: false, message: "Please fill in all fields" });
//     }

//     const newProduct = new Product(product);

//     try {
//         await newProduct.save();
//         res.status(201).json({ success: true, data: newProduct });
//     } catch (error) {
//        console.error("Error in create product", error.message);
//        res.status(500).json({success: false, message: "Server Error" });    
//     }

// };

// export const updateProduct = async (req,res) => {
//    const { id }  = req.params;

//    const product = req.body;

//    if(!mongoose.Types.ObjectId.isValid(id)){
//     return res.status(404).json({ success: false, message:"Invalid Product Id"});
//    }

//    try {
//       const updatedProduct = await Product.findByIdAndUpdate(id, product,{new:true});
//       res.status(200).json({ success: true, data: updatedProduct })
//    } catch (error) {
//     res.status(500).json({ success: false, meessage: "Server Error" });
//    }

// };

// export const deleteProduct = async (req,res) => {
//     const { id } = req.params;
   
//     if(!mongoose.Types.ObjectId.isValid(id)){
//     return res.status(404).json({ success: false, message:"Invalid Product Id"});
//    }

//     try {
//       await Product.findByIdAndDelete(id);  
//       res.status(200).json({ success: true, message: "Product deleted" })
//    } catch (error) {
//     console.log("error in deleting product:", error.message);
//     res.status(500).json({ success: false, message: "Server Error" })
//    }
// };