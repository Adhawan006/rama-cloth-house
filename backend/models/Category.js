import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
      maxlength: [50, 'Category name cannot exceed 50 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Category slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Category description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    isActive: {
      type: Boolean,
      default: true,
      comment: 'Allows admin to temporarily hide a category from the frontend',
    },
  },
  {
    timestamps: true,
  }
);

// 🔍 Create indexes for high-speed searches
categorySchema.index({ slug: 1 });

const Category = mongoose.model('Category', categorySchema);

export default Category;
