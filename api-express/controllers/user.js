const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require('../mw/auth.js');

const createUser = async (req, res) => {
    try {
        const { username, email, password, date } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            username,
            email,
            password: hashedPassword,
            date: date || new Date()
        };

        const userModel = new User();
        const userId = await userModel.create(newUser);

        res.status(201).json({ userId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const userModel = new User();
        const users = await userModel.listAll();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
     try {
        const token = generateToken(user);
        
        res.status(200).json({ auth: true, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getUsers,
    login
};
