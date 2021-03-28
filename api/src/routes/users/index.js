const router = require('express').Router()
const controller = require('./users.controller')

router.get('/types', controller.getRolesAndTypes)
router.get('/:id', controller.getOneUser)
router.delete('/:id', controller.deleteUser)
router.put('/:id', controller.updateUser)
router.get('/', controller.getAllUsers)
router.post('/', controller.createUser)



module.exports = router