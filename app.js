const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const {userRoutes, authRoutes} = require('./routes');
const {config} = require('./config')

const app = express();
const corsOptions = {
    origin: ["http://localhost:8081", "http://localhost:4200"]
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userRoutes)
app.use('/auth', authRoutes)

db.mongoose
    .connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit(1);
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to beverages store" });
});

// set port, listen for requests
const PORT = config.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;