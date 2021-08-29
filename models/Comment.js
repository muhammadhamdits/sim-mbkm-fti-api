const { DataTypes, Model } = require('sequelize');
const db = require('../database/db');
const Logbook = require('./Logbook');

class Comment extends Model {

}

Comment.init(
  {
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Logbook,
        key: 'student_id'
      },
      allowNull: false,
    },
    program_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Logbook,
        key: 'program_id'
      },
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    is_lecturer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize: db,
    modelName: 'Comment',
    timestamps: false
  }
)

module.exports = Comment