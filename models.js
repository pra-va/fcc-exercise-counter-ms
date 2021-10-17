const {Schema, model} = require("mongoose");
const {USER_MODEL} = require("./constants");

const userSchema = new Schema({
    username: {type: String, required: true}
});

model(USER_MODEL, userSchema);