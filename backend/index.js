const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const cors = require('cors');
const apiRouter = require('./routes/api');

const app = express();
require('./db/db');

const corsOptions = { origin: "http://localhost:8080/" }
app.use(cors({
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

app.listen(port, () => {
    console.log("Server initialized in port ",port)
})