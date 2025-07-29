const roleBasedMiddleware = (...roles) => {
    return (req,res,next)=> {
        if(!roles.includes(req.user.role)){
            return res.status(403).render('error');
        }
        next();

    }

}
module.exports= roleBasedMiddleware