const validateUser = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" })
  }

  if (password.length < 4) {
    return res.status(400).json({ message: "Password too short" })
  }

  next()
}

module.exports = validateUser