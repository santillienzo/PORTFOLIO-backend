const express = require('express');
const router = express.Router();

const {createTechnology, readTechnology, readPhoto, technologyById, read} = require('../controllers/technologiesController')

router.get('/technologies', readTechnology);
router.get('/photo/:technologyId', readPhoto)
router.get('/:technologyId', read)
router.post('/create-technology', createTechnology);

router.param('technologyId', technologyById)
module.exports = router;