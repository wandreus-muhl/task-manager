module.exports = (sequelize, Sequelize) => {
	const Project = sequelize.define('projects', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
		},
		title: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.STRING
		}
	})
	return Project
}
