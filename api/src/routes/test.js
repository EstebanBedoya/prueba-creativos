const router = require('express').Router()

router.get('/', (_, res) => {
    res.json({
        message: "todo melo papi"
    })
})

module.exports = router