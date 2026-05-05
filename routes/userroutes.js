const express = require("express")
const router = express.Router()

// Controllers
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUsers
} = require("../controller/usercontroller")

// Middleware
const checkAuth = require("../middleware/auth")
const validateUser = require("../middleware/validateUser")

// Public Routes
router.post("/register", validateUser, registerUser)
router.post("/login", validateUser, loginUser)

// Protected Routes
router.get("/users", checkAuth, getUsers)
router.patch("/updateuser", checkAuth, updateUser)
router.delete("/deleteuser", checkAuth, deleteUser)

module.exports = router