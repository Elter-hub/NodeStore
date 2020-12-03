const mailer = require('nodemailer'),
      {config} = require('../config'),
      hbs = require('nodemailer-handlebars')

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
            layoutsDir: process.cwd() + "/views/layouts",
            partialsDir: process.cwd() + "/views/partials",
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

    //WHat should i return here????
    const info = await transport.sendMail(mailOptions,
        (error, data) => {
            if (error) {
                console.log('Error occurs');
                console.log(error)
            }
             console.log('Email sent!!!');
        });
}