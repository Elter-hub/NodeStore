const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const db = require('./config/db');
const { userRoutes, authRoutes, contentRoutes } = require('./routes');
const { config } = require('./config');

const app = express();
const corsOptions = {
    origin: config.ALLOWED_ORIGIN.split('; ')
};
const PORT = config.PORT || 3000;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('common'));
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/content', contentRoutes);

db.mongoose
    .connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })

    .then(() => {
        console.log('Successfully connect to MongoDB.');
    })
    .catch((err) => {
        console.error('Connection error', err);
        process.exit(1);
    });

app.use('*', (err, req, res, next) => {
    res
        .status(err.code)
        .json({
            message: err.message,
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
