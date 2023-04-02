const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");
const session = require('express-session')
const dotenv = require("dotenv").config();
const port = 3001;

connectDB();

const app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.routes"));
app.use("/user", require("./routes/user.routes"));

app.listen(port, () => {
    console.log('Connecté au port: ' + port);
});