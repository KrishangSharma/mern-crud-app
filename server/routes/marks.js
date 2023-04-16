const express = require('express')
const router = express.Router();
const verifyToken = require("../authMiddleware/verifyToken")
const checkRole = require("../authMiddleware/checkRole")
// Import Marks model
const Marks = require("../models/Marks");

//! @route /api/marks/
//! @desc GET marks
//! @access Protected(only accessed with an auth token)
router.get('/', verifyToken, async (req, res) => {
    try {
      // Get the marks
      const marks = await Marks.find().select(
        "name maths data_structures dbms web_based_programming"
      );
      res.status(200).json(marks);
    } catch(err) {
        res.status(500).json({message: "Server error"});
    }
})


//! @route /api/marks/upload
//! @desc TEachers can upload marks of students
//! @access Protected(only accessed by the users with the role of "Teacher")
router.post('/upload', verifyToken, checkRole, async (req, res) => {
    // Upload Marks
    const studentMarks = new Marks({
        name: req.body.name,
        maths: req.body.maths,
        data_structures: req.body.data_structures,
        dbms: req.body.dbms,
        web_based_programming: req.body.web_based_programming
    });

    try {
        // Save marks to database
        const savedMarks = await studentMarks.save();
        res.send({studentMarks: savedMarks});
    } catch(err) {
        res.status(400).send(err)
    }
})

//! @route /api/marks/:id
//! @desc Delete marks of a student by id
//! @access Protected(only accessed by the users with the role of "Teacher")
router.delete("/delete/:id", verifyToken, checkRole, async (req, res) => {
  try {
    const deletedMark = await Marks.findByIdAndDelete(req.params.id);
    if (!deletedMark) {
      return res.status(404).json({ message: "Mark not found" });
    }
    res.status(200).json({ message: "Mark deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;