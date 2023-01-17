const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: 'Try: /status, /warehouses, or /warehouses/2'});
});

app.get('/status', (req, res) => res.json('Success.') );

app.get('/warehouses', (req, res) => {
  connection.query(
    "SELECT * FROM `travelapp`.`warehouses`",
    (error, results, fields) => {
      if(error) throw error;
      res.json(results);
    }
  );
});

app.route('/warehouses/:id')
  .get( (req, res, next) => {
    connection.query(
      "SELECT * FROM `travelapp`.`warehouses` WHERE id = ?", req.params.id,
      (error, results, fields) => {
        if(error) throw error;
        res.json(results);
      }
    );
  });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});