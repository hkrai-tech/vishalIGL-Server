const nodemailer = require('nodemailer')
const path = require('path');
const { realpath } = require('fs');

let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'team.wetrishul@gmail.com',
        pass: 'tszxvuqtfjzitgdc',
    },
},);

module.exports = {
    transporter
}