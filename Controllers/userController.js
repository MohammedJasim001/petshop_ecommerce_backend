import User from "../Models/userModel.js";
import userAuthJoi from "../Validation/userAuthJoi.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//Register

export const register = async (req, res) => {
  const { value, error } = userAuthJoi.validate(req.body);

  if (error) {
    console.log(error, "error from validation");
    return res.status(400).json({ message: "Found validation error",error });
  }

  console.log("registration achived");

  const { userName, email, password } = value;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ staus: error, message: "User already exist" });
    }
    console.log("registration completed");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ status: "success", message: "registration successfull", data: newUser });
};

//Login

export const login = async (req, res) => {

  const { email, password } = req.body;

    const userExist =await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ error: "user not exist" });
    }

    const validPassword = bcrypt.compareSync(password, userExist.password);
    if (!validPassword) {
      return res.status(404).json({ error: "password not match" });
    }

    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRETE_KEY);
    const {password:hashedPassword,...data} = userExist._doc
    const expiryDate = new Date(Date.now()+60*1000)

    res.cookie("Access_token",token,{httpOnly:true,expire:expiryDate})
    .status(201).json({message:"login successfull", user:data,token });
};
