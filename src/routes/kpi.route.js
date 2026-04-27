const express = require('express')
const router = express.Router()
const kpiController = require('../controllers/kpi.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.route('/').get(authMiddleware.auth, kpiController.getKPI)
router.route('/').post(kpiController.createKPI)

module.exports = router