const Users = require("../models/user");
const bcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const usernameCheck = await Users.findOne({ username });
      if (usernameCheck==true)
        return res.json({ msg: "Username already used", status: false });
      const emailCheck = await Users.findOne({ email });
      if (emailCheck==true)
        return res.json({ msg: "Email already used", status: false });
      const salt=await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await Users.create({
        email,
        username,
        password: hashedPassword,
      });
      delete user.password;
      return res.json({ status: true, user });
    } catch (error) {
      next(error);
    }
  };
  module.exports.login= async (req,res,next)=>{
    try{
      const {username,password}=req.body;
      const user=await Users.findOne({username});
      if(!user){
        res.json({msg:"Invalid username",status: false});
      }
      const passwordCheck=await bcrypt.compare(password,user.password);
      if(!passwordCheck){
        res.json({msg: "Invalid Password", status: false});
      }
      delete user.password;
      res.json({status: true,user});
    }
    catch(error){
      next(error);
    }
  };
  module.exports.avatar = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const avatarImage = req.body.image;
      const Data = await Users.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );
      return res.json({
        isSet: Data.isAvatarImageSet,
        image: Data.avatarImage,
      });
    } catch (error) {
      next(error);
    }
  };
  module.exports.contacts = async (req, res, next) => {
    try {
      const users = await Users.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ]);
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  };