var express = require('express');
var router = express.Router();
const { CreateUser, GetUserLogin } = require("../controllers/users");


/* POST users sign up */
router.post('/register', async function (req, res) {
 await CreateUser(req, res);
});

/* GET users login */
router.get('/login', async function (req, res) {
  await GetUserLogin(req, res);
});

module.exports = router;
