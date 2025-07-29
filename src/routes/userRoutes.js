const express = require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const roleBasedMiddleware = require('../middlewares/rolebasedmiddleware');
const {
  pricipalController,
  teacherController,
  studentController
} = require('../controllers/usercontroller');

const router = express.Router();

// Dashboard routes
router.get('/principal', authmiddleware, roleBasedMiddleware('principal'), pricipalController);
router.get('/teacher', authmiddleware, roleBasedMiddleware('teacher', 'principal'), teacherController);
router.get('/student', authmiddleware, roleBasedMiddleware('student', 'teacher', 'principal'), studentController);

router.get('/students', authmiddleware, roleBasedMiddleware('teacher', 'principal'), studentController);

router.get('/teachers', authmiddleware, roleBasedMiddleware('principal'), teacherController);


module.exports = router;
