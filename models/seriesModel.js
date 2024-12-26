const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema({
  series_id: { type: Number, required: true },
  series_name: { type: String, required: true },
  status: { type: String, required: false, default: "Not Available" }, // Make status optional
  season: { type: String, required: true }
});

const Series = mongoose.model("Series", seriesSchema);
module.exports = Series;
