import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('cft test', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

async function testConnection() {
    try {
      await sequelize.authenticate()
      console.log('conected to database')
    } catch (error) {
      console.error('error in connection to database:', error)
    }
  }
  
  testConnection()


  export default sequelize

