import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);


// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//      price: {
//         type: Number,
//         required: true
//     },
//      image: {
//         type: String,
//         required: true
//     }
// }, {
//     timestamps: true
// });

// const Product = mongoose.model("Product", productSchema);

// export default Product;