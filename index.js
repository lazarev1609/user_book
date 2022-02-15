const express = require('express');
const router = require('./routes/routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json()); 
app.use('/api', router);
app.use(cors());

function start(){
    try{
      app.listen(PORT,"localhost", () => console.log("Server has been started"));
    }
    catch(e){
      console.log(e);
    }
  }

  start();