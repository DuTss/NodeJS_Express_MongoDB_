const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");
const session = require('express-session');
const bodyParser = require('body-parser');
const mime = require('mime');

// Définir le type MIME pour les fichiers CSS
mime.define({'text/css': ['css']});

const dotenv = require("dotenv").config();
const io = require('socket.io')({
  cors: {
    origin: 'http://localhost:4201',
    allowedHeaders:["Access-Control-Allow-Origin",'Content-Type', 'Authorization'],
    credentials:true,
    transports: ['websocket']
  }});
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
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.routes"));
app.use("/commentaire", require("./routes/commentaire.routes"));
app.use("/user", require("./routes/user.routes"));

const server = app.listen(port, () => {
    console.log('Connecté au port: ' + port);
});

// Permet d'écouter les connexions socket.io sur le même port
io.attach(server);

io.on('connection', (socket) => {
  console.log(`Un client est connecté avec l'ID : ${socket.id}`);

  // server-side code
  socket.on('message', (data) => {
    console.log(`Le message reçu est le suivant : ${data.text}`);
    io.to(data.roomId).emit('message', {
      senderId: socket.id,
      text: data.text
    });
  });
});
