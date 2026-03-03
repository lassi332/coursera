const mongoose = require("mongoose");
const schema = mongoose.Schema;
const objectId = schema.ObjectId;

const user = new schema({
    name : String,
    email : String,
    password: String
})