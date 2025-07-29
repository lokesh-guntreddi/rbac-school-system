const {register , login } = require('../controllers/authcontrollers');
const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
}
)
router.get('/login', (req, res) => {
    res.render('login');
})
router.post('/register', register)
router.post('/login',login )

module.exports = router;
