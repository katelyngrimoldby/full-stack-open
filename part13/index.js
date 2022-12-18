require('dotenv').config()
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_URL)

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }, 
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
  })

const main = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
    console.log(blogs)
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()