const { DataTypes, Model } = require('sequelize');
const db = require('../database/db')
const bcrypt = require('bcrypt')

class Student extends Model {
  static async login(nim, password){
    const student = await this.findOne({ where: { nim } })
    if(student) {
      const auth = await bcrypt.compare(password, student.password)
      if(auth) return student
    }
    return false
  }
}

Student.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nim: {
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
    modelName: 'Student',
    timestamps: false
  }
)

Student.beforeCreate(async (data) => {
  const salt = await bcrypt.genSalt()
  data.password = await bcrypt.hash(data.password, salt)
})

module.exports = Student