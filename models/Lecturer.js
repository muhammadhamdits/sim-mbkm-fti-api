const { DataTypes, Model } = require('sequelize');
const db = require('../database/db')
const bcrypt = require('bcrypt')

class Lecturer extends Model {
  static async login(nip, password){
    const lecturer = await this.findOne({ where: { nip } })
    if(lecturer) {
      const auth = await bcrypt.compare(password, lecturer.password)
      if(auth) return lecturer
    }
    return false
  }
}

Lecturer.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nip: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_head: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize: db,
    modelName: 'Lecturer',
    timestamps: false
  }
)

Lecturer.beforeCreate(async (data) => {
  const salt = await bcrypt.genSalt()
  data.password = await bcrypt.hash(data.password, salt)
})

module.exports = Lecturer