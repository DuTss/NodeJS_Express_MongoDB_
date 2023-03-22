const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = 3001;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.routes"));

app.listen(port, () => {
    console.log('Connecté au port: ' + port);
});