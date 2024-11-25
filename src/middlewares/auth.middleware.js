const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

const verifyToken = (request, response, next) => {
    const token = request.headers['authorization']?.split(' ')[1]; //Bearer abc123
    console.log('token', token)
    if (!token) {
        return response.status(403).json({
            message: 'Token no proporcionado'
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        request.user = decoded;
        next();
    } catch (error) {
        response.status(401).json({
            message: 'Token invalido'
        })
    }
}

module.exports = {
    verifyToken
};