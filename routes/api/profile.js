const express = require('express');
const router = express.Router();

//@route    GET /api/profile/test
//@dscrp    tests profile route
//@access   Public
router.get('/test', (req, res) => res.json({ msg: "It's working!" }));

module.exports = router;
