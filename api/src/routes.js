const test = require('./routes/test')
const users = require('./routes/users')

module.exports = (app) => {
    app.use(test)
    app.use('/api/v1/users', users)
}