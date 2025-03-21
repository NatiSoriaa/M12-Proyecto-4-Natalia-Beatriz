// Importamos el modelo de datos
const userHistory= require('../models/userHistory');
// const Library = require('../models/LibraryMongo');

// Declaración de controladores 

const getHistory = async (req, res) => {
    try {
        // Instanciamos un modelo Library
        let user_history = new userHistory();
        // Lo usamos para listar libros
        let history_items = await user_history.listAll();
        res.json(history);
        library.close();
    }
    catch (err) {
        console.log("Error getting user history...", err);
        res.status(500).json("Error getting user history...");
    }
}

const createItem = async (req, res) => {
    try {
        let user_history = new userHistory();

        let history_items = await user_history.listAll();

            // Creamos un libro nuevo
            const newItem = {
                id: user_history.length + 1,
                name: req.body.name,
                date: req.body.date,
                favorite: req.body.favorite
            };

            // Usamos el modelo Library para crear libro
            let created = await user_history.create(newBook);

            if (created) {
                console.log("History item created successfully");
                res.json("History item created successfully");
            } else {
                console.log("Error creating new book...");
                res.status(400).json("Error creating new book...");
            }
            library.close();
        
    }
    catch (err) {
        console.log("Error creating new book...", err);
        res.status(500).json("Error creating new book...");
    }
}

const updateItem = async (req, res) => {
    try {
        let user_history = new userHistory();

            // const bookID = req.body._id;
            const itemId = req.body.id;
            const updateItem = {
                name: req.body.name,
                date: req.body.date,
                favorite: req.body.favorite
            };

            let updated = await user_history.update(updateItem, itemId);

            if (updated) {
                console.log("History item updated successfully");
                res.json("History item updated successfully");
            } else {
                console.log("Error updating book...");
                res.status(400).json("Error updating book...");
            }
            library.close();
        
    }
    catch (err) {
        console.log("Error updating book...", err);
        res.status(500).json("Error updating book...");
    }
}

const deleteItem = async (req, res) => {
    try {
            let user_history= new userHistory();

            // let deleted = await library.delete(req.body._id);
            let deleted = await user_history.delete(req.body.id);

            if (deleted) {
                console.log("Book deleted successfully");
                res.json("Book deleted successfully");
            } else {
                console.log("Error deleting book...");
                res.status(400).json("Error deleting book...");
            }
            library.close();
    }
    catch (err) {
        console.log("Error deleting book...", err);
        res.status(500).json("Error deleting book...");
    }
}

module.exports = {
    getHistory: getHistory,
    createItem: createItem,
    updateItem: updateItem,
    deleteItem: deleteItem
}
