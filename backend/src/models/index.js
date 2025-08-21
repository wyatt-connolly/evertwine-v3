const User = require('./User');
const Blog = require('./Blog');

// Define associations
User.hasMany(Blog, { 
    foreignKey: 'authorId', 
    as: 'blogs' 
});

Blog.belongsTo(User, { 
    foreignKey: 'authorId', 
    as: 'author' 
});

module.exports = {
    User,
    Blog
};

