const pricipalController = (req, res) => {
  try {
    res.render('principal'); 
  } catch (err) {
    res.status(500).render('error', { message: "Something went wrong" });
  }
};

const teacherController = (req, res) => {
  try {
    res.render('teacher');
  } catch (err) {
    res.status(500).render('error', { message: "Something went wrong" });
  }
};

const studentController = (req, res) => {
  try {
    res.render('student');
  } catch (err) {
    res.status(500).render('error', { message: "Something went wrong" });
  }
};


module.exports = {
  pricipalController,
  teacherController,
  studentController
};
