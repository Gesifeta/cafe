const userServices = require("./user.services");

module.exports = {
  Query: {
    users: () => {

      return userServices.showAllUsers();
    },
    userByEmail: (__, args,req) => {
      if(!req.isAuth){
        throw new Error("Not authenticated")
      }
      return userServices.usersByEmail(args.email);
    },
    userLogin:async(__,args)=>{
      try {
        return userServices.userLogin(args.email,args.password)
      } catch (error) {
        throw new Error(error)
        
      }

    }
  },
  
  Mutation: {
    addNewUser: (__, args, req) => {
      if(!req.isAuth){
        throw new Error("Not authenticated")
      }
      return userServices.addNewUser(
        args.firstName,
        args.lastName,
        args.mobile,
        args.email,
        args.password,
        args.isAdmin,
        args.status
      );
    },
  },
};
