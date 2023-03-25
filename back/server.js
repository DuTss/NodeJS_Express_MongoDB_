const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = 3001;

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.routes"));

app.listen(port, () => {
    console.log('Connecté au port: ' + port);
});