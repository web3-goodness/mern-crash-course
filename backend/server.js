import express from "express";
import dotenv from "dotenv";
import path from "path";


import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express(); // ✅ define app before using it
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); 

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
}


app.use(express.json());  // parse JSON request bodies

// Routes
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB(); // connect to DB when server starts
  console.log("Server started at http://localhost:" + PORT);
});




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


