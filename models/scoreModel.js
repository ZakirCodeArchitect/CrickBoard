const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  Sid: String,
  Snm: String,
  Sds: String,
  Scd: String,
  Cnm: String,
  CnmT: String,
  Ccd: String,
  Cid: String,
  Scu: Number
});

const score = mongoose.model("score", scoreSchema);
module.exports = score;
