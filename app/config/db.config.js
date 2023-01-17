module.exports = {
  HOST: "localhost",
  USER: "test",
  PASSWORD: 'p0v\pPyIK4;3=*Z"',
  DB: "travelapp",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
