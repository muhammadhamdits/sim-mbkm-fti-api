const { DataTypes, Model } = require('sequelize')
const db = require('../database/db')
const bcrypt = require('bcrypt')

class Admin extends Model {
  static async login(username, password){
    const admin = await this.findOne({ where: { username } })
    if(admin) {
      const auth = await bcrypt.compare(password, admin.password)
      if(auth) return admin
    }
    return false
  }
}

Admin.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'Admin',
    timestamps: false
  }
)

Admin.beforeCreate(async (data) => {
  const salt = await bcrypt.genSalt()
  data.password = await bcrypt.hash(data.password, salt)
})

module.exports = Admin