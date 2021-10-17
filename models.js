const {Schema, model} = require("mongoose");
const {USER_MODEL, LOG_MODEL} = require("./constants");

const UserSchema = new Schema({
    username: {type: String, required: true}
});

const ExerciseSchema = new Schema({
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: String, required: true, default: new Date().toDateString()}
})

const LogSchema = new Schema({
    username: {type: String, required: true},
    count: {type: Number, required: true, default: 0},
    log: [ExerciseSchema]
})

model(USER_MODEL, UserSchema);
model(LOG_MODEL, LogSchema);