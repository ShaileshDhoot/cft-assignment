import sequelize from "../util/connection.js";

import Sequelize from 'sequelize'



const User = sequelize.define('Users', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,        
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  mobile:{
    type: Sequelize.STRING,
    unique: true 
  },
  email:{
    type: Sequelize.STRING,
    unique: true 
  },

});



 export default User