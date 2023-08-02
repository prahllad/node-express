const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/HomeController');
const AuthController = require('../app/controllers/AuthController');

router.get('/', HomeController.homePage);
router.get('/checkControl', AuthController.checkUseBoard);
router.post('/takeControl',AuthController.takeControl);
router.post('/removeControl',AuthController.removeControl);
router.post('/setGridColor',AuthController.setGridColor)

module.exports = router;