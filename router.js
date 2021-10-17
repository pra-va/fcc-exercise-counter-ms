const express = require("express");
const router = express.Router();
const {model} = require("mongoose");
const {USER_MODEL, LOG_MODEL} = require("./constants");

const UserModel = model(USER_MODEL);
const LogModel = model(LOG_MODEL);

const HELLO_URL = "/hello";
const USERS_URL = "/users";
const USERS_EXERCISE_LOG_URL = "/users/:_id/exercises";


router
    .get(HELLO_URL, (req, res) => {
        res.json({hello: "Hello, world"});
    })
    .post(USERS_URL, ({body: {username: requestUsername}}, res) => {
        const user = new UserModel({username: requestUsername});
        if (!requestUsername) error(res);

        user
            .save()
            .then(({_doc: {username, _id}}) => {
                console.log(`**** Saved user ${username} successfully.`);

                const log = new LogModel({
                    _id,
                    username,
                    log: []
                });

                log
                    .save()
                    .catch(err => console.error(err));

                res.json({
                    username,
                    _id
                })
            })
            .catch(err => console.error(err));
    })
    .get(USERS_URL, (req, res) => {
        UserModel
            .find()
            .then(users => res.json(users))
            .catch(err => console.error(err));
    })
    .post(USERS_EXERCISE_LOG_URL, ({body, params}, res) => {
        LogModel
            .findById(params._id)
            .then(foundLog => {
                const logDate = body.date
                    ? parseDate(body.date).toDateString()
                    : new Date().toDateString();

                const newLog = {
                    description: body.description,
                    duration: body.duration,
                    date: logDate
                };

                LogModel
                    .findOneAndUpdate(
                        {_id: params._id},
                        {
                            log: foundLog._doc.log.concat(newLog),
                            count: ++foundLog._doc.log.length
                        })
                    .then(savedLog => {
                        res.json({
                            _id: savedLog._id,
                            username: savedLog.username,
                            date: logDate,
                            duration: body.duration,
                            description: body.description
                        })
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    });

const error = res => {
    res.json({
        error: "Encountered error"
    });
}

const parseDate = date => {
    try {
        return new Date(date);
    } catch (err) {
        throw new Error(`Unable to parse date ${date}.`)
    }
}

module.exports = router;