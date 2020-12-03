const mailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const { config } = require('../config');

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
            defaultLayout: 'layout',
            layoutsDir: `${process.cwd()}/views/layouts`,
            partialsDir: `${process.cwd()}/views/partials`,
        },
        viewPath: 'views',
        extname: '.hbs',
    }));

    const mailOptions = {
        from: config.EMAIL_NAME,
        to: user.email,
        subject,
        template,
        context: {
            data
        }
    };

    // WHat should i return here????
    await transport.sendMail(mailOptions,
        (error) => {
            if (error) {
                // eslint-disable-next-line no-console
                console.log('Error occurs');
                // eslint-disable-next-line no-console
                console.log(error);
            }
            // eslint-disable-next-line no-console
            console.log('Email sent!!!');
        });
};
