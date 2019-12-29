/* require npm package */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

/* require config and routes */
const config = require("./config/server");

/* Object Created */
const app = express();
/* loading routes. */
const testRoutes = require("./api/routes/Test");
const userRoutes = require("./api/routes/User");

/* Handel POST Request */
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/* Entry Point Start */
app.all("/", (req, res) => {
    res.status(200).json({
        status: true,
        message: "Welcome to SM-ADMIN-API"
    })
})

app.use("/test", testRoutes);
app.use("/user", userRoutes);
/* Entry Point End */

/* No Route Found Start */
app.use((req, res, next) => {
    const error = new Error("NO Route Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            status: false,
            message: error.message
        }
    });
});
/* No Route Found End */

/* Server Start */
app.listen(config.SERVER_PORT, () =>
    console.log(`server running on port ${config.SERVER_PORT}`)
);

/* Connect To MongoDB */
mongoose.connect(
    config.mongodb.MONGO_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, db) => {
        if (err) throw err;
        console.log(`MongoDB connected on port ${config.mongodb.MONGO_PORT}`);
    }
);
mongoose.Promise = global.Promise;