const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passposrtLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passposrtLocalMongoose);    //Automatically implements username, hashing, salting and hashed pwd

module.exports = mongoose.model("User", userSchema);