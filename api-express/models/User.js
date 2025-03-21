const mysql = require("mysql2");
const dbConfig = require('../config/mysql.config');

class User {
    constructor() {
        this.connection = mysql.createPool({ 
            host: dbConfig.usersDB.HOST,
            user: dbConfig.usersDB.USER,
            password: dbConfig.usersDB.PASSWORD,
            database: dbConfig.usersDB.DB
        }).promise(); 
    }

    close = () => {
        this.connection.end();
    }

    async create(user) {
        try {
            const [result] = await this.connection.query(
                'INSERT INTO users (username, email, password, date) VALUES (?, ?, ?, ?)',
                [user.username, user.email, user.password, user.date || new Date()]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error creating user', error);
            throw error;
        }
    }

    async listAll() {
        try {
            const [rows, fields] = await this.connection.query('SELECT * FROM users');
            return rows;
        } catch (error) {
            console.error('Error listing all users', error);
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            const [rows] = await this.connection.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0];
        } catch (error) {
            console.error('Error finding user by email', error);
            throw error;
        }
    }
}

module.exports = User;
