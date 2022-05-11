module.exports = (sequelize, Sequelize) => {
    const Login = sequelize.define("login", {
      user_id: {
        type: Sequelize.INTERGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
    return Login;
  };