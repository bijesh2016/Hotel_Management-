const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../../config/database.config");
const userService = require("../../services/user.service");

const register = async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    // Validate input
    if (!full_name || !email || !password) {
      return res.status(400).json({ 
        message: "Full name, email, and password are required" 
      });
    }

    // 1. Check if user exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(409).json({ 
        message: "User already exists with this email" 
      });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create user
    const user = await userService.createUser(
      full_name,
      email,
      hashedPassword,
      role || "customer"
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ 
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email and password are required" 
      });
    }

    // 1. Find user
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ 
        message: "Invalid credentials" 
      });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ 
        message: "Invalid credentials" 
      });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getModuleInfo = (req, res) => {
  res.json({ message: 'Auth module' });
};

const logout = (req, res) => {
  res.json({ message: 'User logout endpoint' });
};

module.exports = {
  getModuleInfo,
  register,
  login,
  logout,
};