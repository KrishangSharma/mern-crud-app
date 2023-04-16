const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  maths: {
    type: Number,
    required: true
  },
  data_structures: {
    type: Number,
    required: true
  },
  dbms: {
    type: Number,
    required: true
  },
  web_based_programming: {
    type: Number,
    required: true
  },
});

const Marks = mongoose.model("Marks", marksSchema);

module.exports = Marks;
