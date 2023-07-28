

const getUserInfo = (user) => ({
    name:user.name,
    username:user.username,
    id: user.id || user._id,
})

module.exports = getUserInfo