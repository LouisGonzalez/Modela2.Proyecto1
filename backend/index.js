const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const cors = require('cors');

const app = express();

const corsOptions = { origin: "http://localhost:8080/" }
app.use(cors({
    origin: "http://localhost:8080/",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log("Server initialized in port ",port)
})