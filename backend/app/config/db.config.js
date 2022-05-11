module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "2306",
    DB: "attendance-management",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };