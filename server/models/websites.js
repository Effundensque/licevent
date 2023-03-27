const sequelize = require('../db')
const Sequelize = require('sequelize')

const Website = sequelize.define('website', {
    id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    userId:{
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  module.exports= Website