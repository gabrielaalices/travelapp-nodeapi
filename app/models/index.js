
require('dotenv').config()
const Sequelize = require("sequelize");
const bodyParser = require('body-parser');

// Locally, those come from .env. But when the API runs from the cloud, it comes from environment variables configured in the container.
var config = {
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
};

var hostConfig = ''
var socketPathConfig = ''

// Later on when running from Google Cloud, env variables will be passed in container cloud connection config
if(process.env.NODE_ENV === 'production') {
  console.log('Running from cloud. Connecting to DB through GCP socket.');
  socketPathConfig = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

// When running from localhost, get the config from .env
else {
  console.log('Running from localhost. Connecting to DB directly.');
  hostConfig = process.env.DB_HOST;
}
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: hostConfig,
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    socketPath: socketPathConfig
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = db;