const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require('../../config/server');
const User = require("../models/User");

exports.register = async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({
                status: false,
                message: "Username already exists."
            });
        } else {
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: req.body.password,
                type: 'user',
                status: req.body.status
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.status(200).json({
                            status: true,
                            message: "User Created.",
                            data: user
                        }))
                        .catch(err => console.log(err));
                });
            });
        }
    } catch (error) {
        return next(error)
    }
};

exports.login = async (req, res) => {
    if (req.body.username != "" && req.body.password != "") {
        try {
            const user = await User.find({ "username": req.body.username })
            if (user.length < 1) {
                res.status(400).json({ status: false, message: "Username or Password incorrect." });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    res.status(400).json({ status: false, message: "Incorrect Password." });
                }
                if (result == false) {
                    res.status(400).json({ status: false, message: "Incorrect Password." });
                }
                if (user[0].status === 0) {
                    res.status(400).json({ status: false, message: "Account Blocked." });
                }
                if (result) {
                    const token = jwt.sign({
                        username: user[0].username,
                        userId: user[0]._id,
                        type: user[0].type
                    },
                        config.JWT_KEY, {
                            expiresIn: config.JWT_EXPIRES
                        }
                    );
                    res.status(200).json({ status: true, message: "", data: token });
                }
            })
        } catch (error) {
            return next(error)
        }
    }
    else {
        res.status(400).json({ status: false, message: "Username or Password incorrect." });
    }
};

exports.add = async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({
                status: false,
                message: "Username already exists."
            });
        } else {
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: req.body.password,
                type: req.body.type,
                status: req.body.status
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.status(200).json({
                            status: true,
                            message: "User Created.",
                            data: user
                        }))
                        .catch(err => console.log(err));
                });
            });
        }
    } catch (error) {
        return next(error)
    }
};

exports.edit = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body);
        if(user)
        {
            res.status(200).json({
                status: true,
                message: "User updated.",
                data: user
            });
        }
        else
        {
            res.status(500).json({
                status: false,
                message: "Failed to update."
            })
        }
    } catch (error) {
        return next(error)
    }
};

exports.delete = async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(
            req.params.id,
            req.body);
        if (user) {
            res.status(200).json({
                status: true,
                message: "User deleted.",
                data: user
            });
        }
        else {
            res.status(500).json({
                status: false,
                message: "Failed to delete."
            })
        }
    } catch (error) {
        return next(error)
    }
};