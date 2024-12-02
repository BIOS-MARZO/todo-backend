// consultUser
// showUserWhereEmail
// getUser

const { connectDb } = require("../config/connectDb");

const getUserByEmail = async (email) => {
    const result = await connectDb.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
}

const getUsers = async () => {
    const result = await connectDb.query('SELECT full_name, email FROM users');
    return result.rows;
}

const createUser = async (fullName, email, hashedPassword) => {
    const result = await connectDb.query(
        'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING id, full_name, email', [fullName, email, hashedPassword]
    );
    return result.rows[0];
}

module.exports = {
    getUserByEmail,
    getUsers,
    createUser
}