const mysql = require("mysql2");
const dbConfig = require("../config/config.js");

class UserHistory {
  constructor() {
    // En el constructor, creamos una conexión a la base de datos
    // y la guardamos en la propiedad connection de la clase

    // 1.Declaramos la conexión
    let connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB
    });

    // 2.Abrimos la conexión
    connection.connect(error => {
      if (error) throw error;
      console.log("Successfully connected to the database.");
    });

    // 3.Dejamos la conexión en la propiedad connection, promisificada
    // (para poder utilizarlas más cómodamente en el resto de métodos de la clase)
    this.connection = connection.promise();
  }

  close = () => {
    this.connection.end();
  }

  // Métodos de la clase Library

  // Listar todos los libros
  listAll = async () => {
    const [results] = await this.connection.query("SELECT * FROM user_history");
    return results;
  }
  // Crear un nuevo libro
  create = async (newItem) => {
    try {
      const [results] = await this.connection.query("INSERT INTO user_history SET ?", newItem);
      return results.affectedRows;
    }
    catch (error) {
      return error;
    }
  };
  // Actualizar un libro
  update = async (updatedItem, itemId) => {
    try {
      const [results] = await this.connection.query("UPDATE user_history SET ? WHERE id = ?",
        [updatedItem, itemId]
      );
      return results.affectedRows;
    }
    catch (error) {
      return error;
    }
  };
  // Eliminar un libro
  delete = async (itemId) => {
    try {
      const [results] = await this.connection.query("DELETE FROM user_history WHERE id = ?",[itemId]);
      return results.affectedRows;
    }
    catch (error) {
      return error;
    }
  }
}

module.exports = UserHistory;
