const Users = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')

// generate token for registered or logged in user.
const generateToken=(user)=>{
return jwt.sign({
 user
}, process.env.JWT_SECRET,{
  expiresIn:"24h"
})
}


const showAllUsers = async() => {
  const users= await Users.find().select("-password")
  return users;
};
const userLogin=async(email,password)=>{
  try {
  if(!email||!password){
    throw new Error('email and password required')
  }else{
    const userFound= await Users.findOne({
      email:email
    })

    if(userFound && bcrypt.compare(password,userFound.password)){
      const token={
        
        userId:userFound._id,
        firstName:userFound.firstName,
        email:email,
        isAdmin:userFound.isAdmin,
                                  }
      return token    
      
    }
    else{
      throw new Error('Invalid credentials')
    }
  }
    

    
  } catch (error) {
    throw new Error(error)
    
  }
}

const addNewUser = async (
   firstName,
  lastName,
  mobile,
  email,
  password,
  isAdmin,
  status
) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = new Users({
           firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      email: email,
      password: hashedpassword,
      isAdmin: isAdmin,
      status: status,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const usersByEmail = async (email) => {
  const foundUser = Users.findOne({ email: email });
  if (foundUser) {
    return foundUser;
  }
};

module.exports = {
  userLogin,
  showAllUsers,
  addNewUser,
  usersByEmail,
};
