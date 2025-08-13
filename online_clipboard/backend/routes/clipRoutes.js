
const express = require('express');
const { createClip, getClip } = require('../controll/clipcontroll');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Clip routes are working!' });  
});

router.post('/create', createClip);

router.get('/:key', getClip);


module.exports = router;