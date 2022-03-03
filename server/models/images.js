const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
});

module.exports = model("ImageBase", imageSchema);
