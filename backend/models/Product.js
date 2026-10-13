import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 120,
    },

    department: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Traditional", "Home"],
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Suiting",
        "Shirting",
        "Suit Fabric",
        "Semi-Stitched Party Wear",
        "Casual Suit",
        "Dupatta",
        "Pagri Rubia",
        "Bed Sheet",
        "Towel",
      ],
    },

    brand: {
      type: String,
      default: "Local",
      trim: true,
    },

    material: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      required: true,
      trim: true,
    },

    size: {
      type: String,
      default: "N/A",
    },

    sellingUnit: {
      type: String,
      enum: ["meter", "piece", "set"],
      default: "piece",
    },

    purchasePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    supplier: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: "text", brand: "text" });
productSchema.index({ category: 1 });
productSchema.index({ department: 1 });

const Product = mongoose.model("Product", productSchema);

export default Product;