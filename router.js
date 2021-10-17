const express = require("express");
const router = express.Router();
const {model} = require("mongoose");
const {USER_MODEL} = require("./constants");
const {USERS_URL, HELLO_URL} = require("./urls");

const UserModel = model(USER_MODEL);

router
    .get(HELLO_URL, (req, res) => {
        res.json({hello: "Hello, world"});
    })
    .post(USERS_URL, ({body: {username}}, res) => {
        const user = new UserModel({username});
        if (!username) error(res);
        user
            .save()
            .then(savedUser => {
                console.log(`**** Saved user ${username} successfully.`);
                res.json({
                    username: savedUser._doc.username,
                    _id: savedUser._doc._id
                })
            })
            .catch(err => console.error(err));
    })
    .get(USERS_URL, (req, res) => {
        UserModel
            .find()
            .then(users => res.json(users))
            .catch(err => console.error(err));
    });

const error = res => {
    res.json({
        error: "Encountered error"
    });
}

module.exports = router;