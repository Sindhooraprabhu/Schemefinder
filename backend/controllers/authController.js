const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!role || (role !== 'farmer' && role !== 'entrepreneur')) {
      return res.status(400).json({ message: 'Invalid role. Role must be "farmer" or "entrepreneur".' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // The password will be hashed by the pre-save hook in the User model
    user = new User({
      name,
      email,
      password,
      role,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      console.error("JWT_SECRET is not configured.");
      return res.status(500).json({ message: "Server configuration error." });
    }

    const token = jwt.sign(
      { user: { id: user._id, role: user.role } },
      secretKey, // Uses the secret from .env
      { expiresIn: "1h" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
