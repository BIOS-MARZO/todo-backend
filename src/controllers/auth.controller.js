const bcrypt = require('bcrypt');

const { getUserByEmail, createUser } = require("../models/user.model");
const { generateToken } = require('../config/jwt');
const { transporter } = require('../config/nodemailer');
const EMAIL_USER_SENDER = process.env.EMAIL_USER_SENDER;

const registerController = async (request, response) => {
    const { fullName, email, password } = request.body;

    try {
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return response.status(400).json({
            error: 'El usuario ya esta registrado!'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser(fullName, email, hashedPassword)

        const token = generateToken(newUser.id, newUser.email);

        const mailOptions = {
            from: EMAIL_USER_SENDER,
            to: email,
            subject: 'Bienvenido a nuestra plataforma de TODOS',
            text: `Hola ${fullName}, Gracias por registrarte en nuestra plataforma.`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo', error);
            } else {
                console.log('Correo envíando exitosamente', info.response);
            }
        })

        response.status(201).json({
            status: 'OK',
            message: 'Usuario registrado existosamente',
            user: newUser,
            token
        })

    } catch (error) {
        console.error(error);
        response.status(500).json({
            error: 'Error al registrar el usuario'
        })
    }
}

const loginController = async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await getUserByEmail(email);

        if(!user) {
            return response.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return response.status(401).json({
                message: 'Credenciales invalidas'
            })
        }

        const token = generateToken(user.id, user.email)

        response.json({
            user: {
                userId: user.id,
                email: user.email
            },
            token,
        })

    } catch (error) {
        console.error(error);
        response.status(500).json({
            status: 'error',
            message: 'Error al iniciar sesion'
        })
    }
}

module.exports = {
    registerController,
    loginController
}