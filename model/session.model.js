import sequelize from "../util/connection.js";

import Sequelize from 'sequelize'



const Session = sequelize.define('Sessions', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,        
    allowNull: false,
    primaryKey: true
  },
  USerId: {
    type: Sequelize.INTEGER,
  },
  authToken: {
    type: Sequelize.STRING
  },

});



 export default Session