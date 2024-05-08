const nodemailer = require('../config/nodemailer')

const mailXl = (user = null, file, filename) => {
    console.log('Inside exportdata')
    console.log(user.email)
    //let stringHtml = nodemailer.renderTemlate({ user: user }, '/loginEmail.ejs')

    nodemailer.transporter.sendMail({
        from: 'team.weTrishul@gmail.com',
        to: user.email,
        subject: 'Testing Successful!',
        html: '<h1>Here is your data sheet.Please Note that this is just a POC app.Charges will be applied for full production version!</h1>',
        attachments: [
            {
                filename,
                content: file,
                contentType:
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        ],
    }, (err, info) => {
        if (err) {
            console.log(user.email)
            console.log('Error in sending Mail', err)
            return
        }
        console.log('Messge successfully delivered!', info)
        return
    })
}

module.exports = {
    mailXl
}