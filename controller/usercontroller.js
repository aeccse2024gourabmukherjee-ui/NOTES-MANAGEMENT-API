const User = require("../models/usermodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// ============================
// 🟢 REGISTER
// ============================
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email }) //find mail from mongo and check
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      email,
      password: hashedPassword
    })

    await user.save()

    res.status(201).json({ message: "User registered" })

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}

// ============================
// 🟡 LOGIN
// ============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET,
      { expiresIn: "1h" }
    )

    res.status(200).json({
      message: "Login success",
      token
    })

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}

// ============================
// 🔵 GET USERS (Pagination) :to read pages 10 at a time
// ============================
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5

    const total = await User.countDocuments()

    const users = await User.find()
      .select("-password") // hide password
      .skip((page - 1) * limit)
      .limit(limit)

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      users
    })

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}

// ============================
// 🟠 UPDATE USER (PATCH)
// ============================
const updateUser = async (req, res) => {
  try {
    const { email, newPassword, role } = req.body

    const updateData = {}

    if (newPassword) {
      updateData.password = await bcrypt.hash(newPassword, 10)
    }

    if (role) {
      updateData.role = role
    }

    const result = await User.updateOne(
      { email },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ message: "User updated" })

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}

// ============================
// 🔴 DELETE USER
// ============================
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id)

    c

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ message: "User deleted" })

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}


module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUsers
}