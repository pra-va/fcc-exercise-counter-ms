const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./models");
const router = require("./router");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'))

// Logger
app.use((req, res, next) => {
  console.log(`**** ${req.method} ${req.path} ${JSON.stringify(req.body)} ${JSON.stringify(req.params)} ${JSON.stringify(req.query)}`);
  next();
});

app.use("/api", router);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
