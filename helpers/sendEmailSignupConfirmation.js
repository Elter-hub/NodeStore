const mailer = require('nodemailer');
const {config} = require('../config')
const hbs = require('nodemailer-handlebars')

module.exports = async (user, data, subject, template) => {
    const transport = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.EMAIL_NAME,
            pass: config.EMAIL_PASSWORD
        }
    });


    transport.use('compile', hbs({
        viewEngine: {
            defaultLayout: "layout",
            layoutsDir: "/home/ihor/beverages/views/layouts",
            partialsDir: "/home/ihor/beverages/views/partials",
        },
        viewPath: 'views',
        extname: ".hbs",
    }))

    const mailOptions = {
        from: config.EMAIL_NAME,
        to: user.email,
        subject: subject,
        template: template,
        context: {
            data: data
        }
    };

    const info = await transport.sendMail(mailOptions,
        (err, data) => {
            if (err) {
                console.log(err)
                return console.log('Error occurs');
            }
            return console.log('Email sent!!!');
        });
}