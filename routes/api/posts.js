const express = require('express');
const router = express.Router();

//@route    GET /api/posts/test
//@dscrp    tests post route
//@access   Public
router.get('/test', (req, res) => res.json({ msg: "It's working!" }));

module.exports = router;
