const Sequelize = require('sequelize')
const config = require(__dirname + '/../config/config.json')['development']

console.log('config >', config);

const db = {}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// user 추가
db.User = require('./User')(sequelize, Sequelize);

module.exports = db;
