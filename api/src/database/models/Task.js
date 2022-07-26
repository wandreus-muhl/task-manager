module.exports = (sequelize, Sequelize) => {
	const Task = sequelize.define('tasks', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
		},
		title: {
			type: Sequelize.STRING
		},
		taskRelevance: {
			type: Sequelize.INTEGER
		},
		completed: {
			type: Sequelize.BOOLEAN
		},
		projectId: {
			type: Sequelize.UUID
		}
	})
	return Task
}
