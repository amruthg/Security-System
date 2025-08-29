const express = require('express')
const routes = require('./userRoutes')

const cors = require('cors');

const {DBConnection} = require("./database/db");
DBConnection();

const app = express();
// app.use(cors());
app.use(express.json());
app.use(cors());

app.use("/",routes);

app.listen(process.env.PORT, ()=>{
        console.log(`Serever is running on port ${process.env.PORT}!`);
    });

module.exports = app;