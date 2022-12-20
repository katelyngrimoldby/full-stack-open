const Blog = require("./blog");
const ReadingList = require("./readingList");
const User = require("./user");



User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {through: ReadingList, as: 'readings'})
Blog.belongsToMany(User, {through: ReadingList, as: 'saved_by'})

module.exports = {
  Blog,
  User
}