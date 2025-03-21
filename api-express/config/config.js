require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET || 'supersecreto123',
  earth_explorer: {
      HOST: "localhost",
      USER: "root",
      PASSWORD: "",
      DB: "user_history"
  },
  earth_explorer: {
      HOST: "localhost",
      USER: "root",
      PASSWORD: "",
      DB: "users"
  }
};
  PASSWORD: "",
  DB: "users"
};
