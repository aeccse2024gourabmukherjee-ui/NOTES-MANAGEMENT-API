const express=require("express")
const router=express.Router()
const {
    createnotes,
    getnotesUsers,
    updatenotesUser,
    deletenotesUser
} = require("../controller/notescontroller")


// Middleware
const checknAuth = require("../middleware/auth")

// Public Routes
router.post("/notes",checknAuth,createnotes) //used rest api here one api path names for all the methods

// Protected Routes
router.get("/notes", checknAuth, getnotesUsers)
router.patch("/notes/:id", checknAuth, updatenotesUser)
router.delete("/notes/:id", checknAuth, deletenotesUser)

module.exports = router













