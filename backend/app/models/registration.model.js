module.exports = (sequelize, Sequelize) => {
    const Registration = sequelize.define("registration", {
      user_id: {
        type: Sequelize.INTEGER
      },
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email_id: {
        type: Sequelize.STRING
      },
      student: {
        type: Sequelize.BOOLEAN
      }
    });
    return Registration;
  };