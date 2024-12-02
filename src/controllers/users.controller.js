const { getUsers } = require("../models/user.model")

const getAllUsersController = async (request, response) => {
    try {
        const users = await getUsers();
        response.status(200).json({ users })
    } catch (error) {
        console.error('Error al trear los usuarios.', error)
        response.status(500).json({
            status: 'error',
            message: 'Error al intentar traer la lista de usuarios.'
        })
    }
}

module.exports = {
    getAllUsersController
}