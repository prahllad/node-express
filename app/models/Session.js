
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../config/database');

const Session = sequelize.define("sessions", {
	sid: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	userId: DataTypes.STRING,
	active: DataTypes.BOOLEAN,
	createdAt:DataTypes.DATE
});

module.exports = Session;