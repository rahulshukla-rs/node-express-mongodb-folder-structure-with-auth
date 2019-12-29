const mongoose = require("mongoose");

const TestSchema = mongoose.Schema({
    name: { type: String }
})

module.exports = mongoose.model("Test", TestSchema, "test");