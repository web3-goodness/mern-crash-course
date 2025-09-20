import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ For ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Connect to MongoDB
connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ✅ Middleware
app.use(express.json());

// ✅ Enable CORS (dev + prod)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// ✅ Test route
app.get("/api/test", (req, res) => res.send("Backend is running"));

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Catch-all route for React SPA
  app.get("", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});


// // backend/server.js
// import express from "express";
// import dotenv from "dotenv";
// import path from "path";
// import cors from "cors"; // ✅ import cors
// import { connectDB } from "./config/db.js";
// import productRoutes from "./routes/product.route.js";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

// // Connect to MongoDB
// connectDB()
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err.message);
//     process.exit(1);
//   });

// // Middleware
// app.use(express.json());

// // ✅ Enable CORS
// app.use(
//   cors({
//     origin: "http://localhost:5173", // frontend URL
//     credentials: true, // allow cookies if needed
//   })
// );

// // API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);

// // Test route
// app.get("/api/test", (req, res) => res.send("Backend is running"));

// // Serve frontend in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   // Catch-all route for SPA
//   app.use((req, res) => {
//     res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
//   });
// }

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server started at http://localhost:${PORT}`);
// });


// import express from "express";
// import dotenv from "dotenv";
// import path from "path";


// import { connectDB } from "./config/db.js";
// import productRoutes from "./routes/product.route.js";

// dotenv.config();

// const app = express(); // ✅ define app before using it
// const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve(); 

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   app.get("", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   })
// }


// app.use(express.json());  // parse JSON request bodies

// // Routes
// app.use("/api/products", productRoutes);

// app.listen(PORT, () => {
//   connectDB(); // connect to DB when server starts
//   console.log("Server started at http://localhost:" + PORT);
// });




// import express from "express";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";

// import productRoutes from "./routes/product.route.js"
// import cors from "cors";

// app.use(cors());    

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());

// app.use("/api/products", productRoutes)


// app.listen(5000, () => {
//     connectDB();
//     console.log("Server started at http://localhost:" + PORT);
// });


