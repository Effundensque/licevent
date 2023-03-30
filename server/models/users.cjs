const sequelize = require('../db.cjs')
const Sequelize = require('sequelize')

const User = sequelize.define('user', {
    id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: Sequelize.STRING,
      unique:true
    },
    name: {
      type: Sequelize.STRING
    },
    given_name:{
      type:Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique:true
    },
    picture: {
      type: Sequelize.STRING
    }
  });

  module.exports= User