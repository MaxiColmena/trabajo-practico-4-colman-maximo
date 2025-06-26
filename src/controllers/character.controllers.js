import { where } from "sequelize";
import Character from "../models/character.model.js";

//Esta funcionalidad crea los personajes en nuestra base de datos
export const createCharacter = async(req, res) => {

    //Esta funcionalidad elimina los espacios al principio y al final de las cadenas de texto(string)
    if(req.body){
        for (let value in req.body){
            if (typeof req.body[value] === "string"){
                req.body[value] = req.body[value].trim();
            }
        }
    }

    const {name, ki, race, gender, description} = req.body;

    try {
        //Validacion para que los datos no se reciban vacios.
        if(name === undefined || name === "") return res.status(400).json({errorMessage: "Debe completar el campo 'name', no puede estar vacio."})
        if(ki === undefined || name === "") return res.status(400).json({errorMessage: "Debe completar el campo'ki ', no puede estar vacio."})
        if(race === undefined || name === "") return res.status(400).json({errorMessage: "Debe completar el campo 'race', no puede estar vacio."})
        if(gender === undefined || name === "") return res.status(400).json({errorMessage: "Debe completar el campo 'gender', no puede estar vacio."})

        //Validación para que los nombres sean únicos y no se repitan para que no haya incongruencias
        const nameUnique = await Character.findOne({where: {name}});

        if(nameUnique) return res.status(400).json({errorMessage: "'name' el nombre debe ser único por personaje."});
        
        //Validación para que el ki sea un número entero y no un número con decimales
        const kiInt = Math.floor(ki);
        if(ki !== kiInt) return res.status(400).json({Message: "el ki debe de ser un número entero."});

        //Validación para que el género sea solo Female o Male si o si y que no tenga dos generos.
        if(!(gender === "Female" || gender === "Male")) return res.status(400).json({errorMessage: "'gender' el genero debe ser 'Femenino' o 'Masculino'."});

        //Si la descripción no viene vacia se valida que sea un string para que se coloque como cadena de texto en la información del personaje
        if(description !== undefined){
            if(typeof description !== "string"){
                return res.status(400).json({errorMessage: "La 'description' debe de ser cadena de texto(caracteres)."});
            }
        }

        const character = await Character.create({name, ki, race, gender, description});
        res.status(200).json({Message: "Personaje creado con éxito: ", character});
    } catch (error) {
        console.log("Error en la creación del personaje: ", error)
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad trae a todos los personajes

export const getAllCharacters = async(req, res) => {
    try {
        const characters = await Character.findAll();
        if(characters.length === 0) return res.json({Message: "No existen personajes en la base de datos"});
        res.json(characters)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Esta funcionalidad trae a los personajes por Id estrictamente

export const getCharacterById = async(req, res) => {
    try {
        const character = await Character.findByPk(req.params.id);
        if(character) return res.status(200).json(character);

        return res.status(404).json({Message: "El personaje no existe en la base de datos."});

    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad actualiza la información de los personajes por Id

export const updateCharacter = async(req, res) =>{
    
    const {name, ki, race, gender, description} = req.body;
    
    //quita los espacios al principio y al final
    if(req.body){
        for (let value in req.body){
            if (typeof req.body[value] === "string"){
                req.body[value] = req.body[value].trim();
            }
        }
    }
    
    try {
        //Validacion para que los campos no esten vacios
        // if(name === undefined || name === "") return res.status(400).json({errorMessage: "Debe completar el campo 'name', no puede estar vacio."})
        // if(ki === undefined || name === "") return res.status(400).json({errorMessage: "Debe completar el campo'ki ', no puede estar vacio."})
        // if(race === undefined || name === "") return res.status(400).json({errorMessage: "Debe completar el campo 'race', no puede estar vacio."})
        // if(gender === undefined || name === "") return res.status(400).json({errorMessage: "Debe completar el campo 'gender', no puede estar vacio."})
    
        //validación para que el nombre sea unico
        if (name){
        const nameUnique = await Character.findOne({where: {name}})
        if(nameUnique) return res.status(400).json({errorMessage: "El nombre debe ser único por personaje."});
        }


        //Validación para que el ki sea un número entero y no un número con decimales
        if (ki){
        const kiInt = Math.floor(ki);
        if(ki !== kiInt) return res.status(400).json({Message: "el ki debe de ser un número entero."});
        }
        

        //Validación para que el género sea solo Female o Male si o si y que no tenga dos generos.
        if (gender){
        if(!(gender === "Female" || gender === "Male")) return res.status(400).json({errorMessage: "'gender' el genero debe ser 'Femenino' o 'Masculino'."});
        }

        //Validación para que el género sea solo Female o Male si o si y que no tenga dos generos.
        if(description !== undefined){
            if(typeof description !== "string") return res.status(400).json({errorMessage: "La descripción debe ser un texto"});
        }

        const [updated] = await Character.update({name, ki, race, gender, description}, {where: {id: req.params.id}});
    //si las filas afectadas son mayores a 0, el personaje se va a actualiar con éxito
    if (updated === 0) res.status(400).json({Message: "El personaje no existe o no fue encontrado"})

    return res.status(200).json({Message: "El personaje fue actualizado con éxito"});

    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad elimina a los personajes por Id estrictamente

export const deleteCharacter = async(req, res) =>{
    try {
        const deleted = await Character.destroy({where: {id: req.params.id}});
        //es para hacer un delete al personaje que coincida con el id del personaje que deseamos eliminar

        if(deleted = 0) return res.status(404).json({Message: "El personaje no fue encontrado"});
    } catch (error) {
    res.status(500).json({Message: error.message});  
    }
}