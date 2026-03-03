const mongoose = require("mongoose");
const schema = mongoose.Schema;
const objectId = schema.ObjectId;

const userSchema = new schema({
    email : {type: String, unique: true},
    password: String,
    firstName : String,
    lastName : String,
})

const adminSchema = new schema({
    email : {type: String, unique: true},
    password: String,
    firstName : String,
    lastName : String,
})

const courseSchema = new schema({
    title: String,
    description: String,
    price: Number,
    imageURL: String,
    creatorId: objectId
})

const purchaseSchema = new schema({
    userId: objectId,
    courseId: objectId
})

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}