const express = require("express");
const router = express.Router();
const {model} = require("mongoose");
const {USER_MODEL} = require("./constants");
const {USERS_URL, HELLO_URL} = require("./urls");

const UserModel = model(USER_MODEL);

router
    .get("/hello", (req, res) => {
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
        // user.save((err, savedUser) => {
        //     if (err) console.error(err);
        //     console.log(`**** Saved user ${username} successfully.`);
        //     res.json({
        //         username: savedUser._doc.username,
        //         _id: savedUser._doc._id
        //     });
        // });
    });

const error = res => {
    res.json({
        error: "Encountered error"
    });
}

module.exports = router;