const NOTES = require("../models/notesmodel")
//===================================== 
// create notes
//====================================
const createnotes = async(req,res) => {
try{
  const{title,description}=req.body
  const notes=new NOTES({
    title,
    description,
    access: req.user.id
  })
  await notes.save()
  res.status(201).json({message:"Notes created successfully"})
}
catch(err){
  console.log(err);
  res.status(500).json({message:err.message});
          }
        }


// =====================================================
// 🔵 GET USERS (Pagination) :to read pages 10 at a time
// =====================================================
const getnotesUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5

    const total = await NOTES.countDocuments()

    const notes = await NOTES.find()
    
      .skip((page - 1) * limit)
      .limit(limit)

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      notes
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

// ============================
// 🟠 UPDATE notes (PATCH)
// ============================
const updatenotesUser = async (req, res) => {
  try {
    const { title, description,access } = req.body

    const updateData = {}

    if (title) {
      updateData.title=title //any title
    }
    if(description){
        updateData.description=description
    }

    if (access) {
      updateData.access = access //anyuser
    }

    const resultingnotes = await NOTES.updateOne(
      {_id:req.params.id},
      {$set: updateData } //update any depending on the one you have mentioned
    )

    if (resultingnotes.matchedCount === 0) {
      return res.status(404).json({ message: "NOTES not found" })
    }

    res.status(200).json({ message: "NOTES updated" })

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.mesage});
  }
}

// ============================
// 🔴 DELETE USER
// ============================
const deletenotesUser = async (req, res) => {
  try {
    const notes = await NOTES.findByIdAndDelete(req.params.id)

    

    if (!notes) {
      return res.status(404).json({ message: "NOTES not found" })
    }
    

    res.status(200).json({ message: "NOTES deleted" })

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}


module.exports = {
  createnotes,
  getnotesUsers,
  updatenotesUser,
  deletenotesUser
}