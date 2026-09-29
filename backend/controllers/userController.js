import User from '../models/User.js';
import jwt from 'jsonwebtoken';

/**
 * @desc    Generate a secure JSON Web Token
 * @param   {string} id - The user's database document ID
 * @returns {string} Signed JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * @route   POST /api/users/register
 * @desc    Register a new customer/user account
 * @access  Public
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Basic body validation (Defensive Programming)
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists',
      });
    }

    // 3. Create the user in MongoDB
    // (Our Mongoose pre-save hook will automatically hash the password here!)
    const user = await User.create({
      name,
      email,
      password,
    });

    // 4. Generate token and send success response
    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'Registration successful!',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(`❌ Registration Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Server error. Registration failed.',
    });
  }
};
