require('dotenv').config();

const nodemailer = require('nodemailer')

const EMAIL_USER_SENDER = process.env.EMAIL_USER_SENDER;
const EMAIL_PASS_SENDER = process.env.EMAIL_PASS_SENDER;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER_SENDER,
        pass: EMAIL_PASS_SENDER,
    }
})

module.exports = {
    transporter
}