const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const authmiddleware = async(req, res , next)=> {
    // const token = req.headers.authorization?.split(' ')[1];
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: "No token provided"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
        
        next();
    }catch(err){
      
    console.error('JWT error:', err);
    return res.redirect('/login');
    }
}
module.exports = authmiddleware;