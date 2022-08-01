const jwt = require("jsonwebtoken");

const protectedRoute = (req, res, next) => {
  const hasHeader =req.headers.authorization;

  if (!hasHeader) {
    req.isAuth = false;
    return next();
  }

  const token = hasHeader.split(" ")[1];

  if (!token && token === "") {
    req.isAuth = false;
    return next();
  }
let decoded;
  try {
     decoded= jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    req.isAuth = false;
    return next();
  }
 if(!decoded){
    req.isAuth=false
    return next();
 }
 req.isAuth=true;
 req.loginData={
     userId:decoded.user.userId,
     firstName:decoded.user.firstName,
     email:decoded.email
 }
 console.log(decoded);
 next();
 
};
module.exports = {
  protectedRoute,
};
