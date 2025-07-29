const User = require('../models/userSchema');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const register = async (req , res)=> {
   try {
     const {username , password , role } = req.body; 
     const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedpassword = await bcrypt.hash(password,10)
    const user = new User({
        username , 
        password : hashedpassword,
        role
    })
    await user.save()
    res.redirect('/auth/login');
     //res.status(201).json({ message: "User registered successfully" });
    
   }catch(err){
    res.status(500).json({message: "something went wrong "})
    console.error(err);
   }



}
const login = async (req , res) => {
    try{
        const {username, password } = req.body ;
        const user = await User.findOne({username})
        if(!user){
            return res.status(500).json({message: 'user doesnot exist '})
        }
        const ismatched = await bcrypt.compare(password, user.password)
        if(!ismatched){
              return res.status(404).json({message: 'password incorrect'})
        }
        //res.send("user login successfuly ")
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        //res.status(200).json({ token, user: { id: user._id, username: user.username, role: user.role } });
          res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    });
          if (user.role === 'principal') {
        return res.redirect('/user/principal');
    } else if (user.role === 'teacher') {
        return res.redirect('/user/teacher');
    } else if (user.role === 'student') {
        return res.redirect('/user/student');
    }
    }catch(err){
         console.error("Login error:", err)
         res.status(500).json({ message: "Something went wrong in login" });
    }
  
}
module.exports = { register, login };