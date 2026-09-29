import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [120, 'Product name cannot exceed 120 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    // 🏷️ Fabric Specific Fields
    brand: {
      type: String,
      default: 'Unbranded', // e.g., Raymond, OCM, or Local Artisan
      trim: true,
    },
    sellingUnit: {
      type: String,
      enum: {
        values: ['meter', 'piece', 'set'],
        message: '{VALUE} is not a valid selling unit',
      },
      default: 'piece', // Sarees & Suits are pieces; loose cloth is meters
    },
    color: {
      type: String,
      required: [true, 'Color is required'],
      trim: true,
    },
    material: {
      type: String, // e.g., Cotton, Silk, Linen, Wool, Georgette
      required: [true, 'Material composition is required'],
      trim: true,
    },
    // 🚚 Relationship Reference to Category
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product must belong to a category'],
    },
    // 🖼️ Cloudinary Image Array
    images: [
      {
        url: {
          type: String,
          required: [true, 'Image URL is required'],
        },
        public_id: {
          type: String,
          required: [true, 'Cloudinary public ID is required'],
        },
      },
    ],
    // 📦 Inventory Management
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    // ⭐ Customer Feedback (Averages updated automatically later)
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// 🔍 Create Indexes for Performance
// Indexing category facilitates filter queries; indexing price assists sorting; indexing text allows keyword search
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
