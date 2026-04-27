const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (username, password, confirmPassword) => {
    try {
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match!");
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error("Username already exists!");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPassword
        });

        return {
            status: "true",
            comment: "User registered successfully!"
        };
    } catch (err) {
        throw err;
    }
};

exports.login = async (username, password) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error("Invalid username or password!");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid username or password!");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        return {
            status: "true",
            comment: "Login successfully!",
            token
        };
    } catch (err) {
        throw err;
    }
};

exports.addAppeniD = async (id, appenid) => {
    try {
        const user = await User.findByIdAndUpdate(id, { appenid }, { new: true });
        return {
            status: "true",
            comment: "Appen ID added successfully!",
            data: user
        };
    } catch (err) {
        throw err;
    }
};

exports.me = async (id) => {
    try {
        const user = await User.findById(id).select('-password');
        return {
            status: "true",
            comment: "User profile fetched successfully!",
            data: user
        };
    } catch (err) {
        throw err;
    }
};