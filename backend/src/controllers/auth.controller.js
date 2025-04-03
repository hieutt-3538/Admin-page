const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  let conn = null;

  try {
    // Get connection and start transaction
    conn = await User.getDB();
    await User.beginTransaction(conn);

    // Check if user exists
    const userExists = await User.findByEmail(email);
    if (userExists) {
      await User.rollbackTransaction(conn);
      return res.status(400).json({ message: "Exist Email" });
    }

    // Create user
    await User.createUser(name, email, password, conn);
    
    // Commit transaction
    await User.commitTransaction(conn);
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    // Rollback on error
    if (conn) await User.rollbackTransaction(conn);
    console.error('Registration error:', error);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "email Or password Incorrect !" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
};

exports.me = async (req, res) => {
  try {
    // Get token after decrypt
    const userId = req.user.id;

    // Query database to get user infor
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "non-existent User" });
    }

    // Respon user infor (hidden password)
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = (req, res) => {
  res.json({ message: "Logout successful" });
};
