require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET || 'supersecreto123',
  databases: {
    earth_explorer_history: {
      HOST: "localhost",
      USER: "root",
      PASSWORD: "",
      DB: "user_history"
  },
    earth_explorer_users: {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "",
        DB: "users"
    } 
  }
};
