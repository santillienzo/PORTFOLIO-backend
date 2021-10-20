const express = require('express');
const router = express.Router();

const {createWorks, listWorks, readBackground, readLogo, workById} = require('../controllers/worksController');

router.get('/works', listWorks)
router.get('/works/background/:workId', readBackground)
router.get('/works/logo/:workId', readLogo)
router.post('/create-works', createWorks);

router.param("workId", workById)


module.exports = router;