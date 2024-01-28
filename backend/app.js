require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const app = express()

// Imports
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const authRouter = require('./routes/auth');
const errorHandler = require('./middlewares/error-handler');

// Stock middlewares
app.use([express.json(), express.urlencoded(), cors()]);

app.get('/', (req, res) => {
    const tagLines = ["ja ta chele", "fasfsf sdflsafj aljfs adlfjsdfsdafja", "safjksjhfi skjfsafhi fdakshdfka"]
    res.json({msg: "Hello world"});
})

// routes
app.use("/api/v1/auth", authRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000;
console.log(process.env.MONGO_URI)
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI).then(() => console.log("Successfully connected to db ..."));
        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start()