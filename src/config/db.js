import sequelize from "./database.js";

const startDB = async() => {
    try {
        await sequelize.authenticate();
        console.log("conectado a la base de datos");
        await sequelize.sync();
    } catch (error) {
        console.log("Error al conectarse a la base de datos", error);
    }
}

export default startDB;