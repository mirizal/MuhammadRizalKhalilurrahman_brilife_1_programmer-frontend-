const Joi = require('joi');
const express = require('express');
const { object, date, func } = require('joi');
const app = express();
const connection = require("./connection");
const getRoute = require('./routes/ngeget');
const postRoute = require('./routes/ngepost');
var cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req , res) => {
    res.send("This is BRILifeTest-API");
});

app.use("/get", getRoute);
app.use("/post", postRoute);

const port = process.env.PORT || 3123;
app.listen(port, () => {
    console.log(`Listening on port ${port}.....`);
});