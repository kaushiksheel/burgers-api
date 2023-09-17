const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const burgers = require("./data/burgers");
const { json } = require("express");

dotenv.config({ path: "./.env" });

app.use(cors());
app.use(express.json());

app.get("/burgers", (req, res) => {
  return res.status(200).json(burgers);
});

// find burgers with their id

app.get("/burgers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const burger = burgers.find((burger) => burger.id === id);
  return res.status(200).json(burger);
});

// search burgers
app.get("/find-burger", (req, res) => {
  const query = req.query.search;
  const burger =burgers.filter(burger=>{
    if(!query){
        return burgers;
    }else if(burger.name.toLowerCase().includes(query.toLowerCase())){
        return burger
    }
  })
  return res.status(200).json(burger);
});

const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
