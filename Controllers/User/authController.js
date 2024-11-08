import User from "../../Models/userModel.js";
import userAuthJoi from "../../Validation/userAuthJoi.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import env from 'dotenv'

env.config()

//Register

export const register = async (req, res) => {
  const { value, error } = userAuthJoi.validate(req.body);

  if (error) {
    console.log(error, "error from validation");
    return res.status(400).json({ message: "Found validation error",error });
  }

  console.log("registration achived");

  const { userName, email, password } = value;

  if(email==process.env.ADMIN_EMAIL ){
    return  res.status(403).json({message:"User already exist"})
  }

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
      image:req.cloudinaryImageUrl
    });

    await newUser.save();

     res.status(201).json({ status: "success", message: "registration successfull", data: newUser });
};

//Login

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if the login attempt is for the admin
  if (email === process.env.ADMIN_EMAIL) {
    // Verify the admin password
    if (password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRETE_KEY);
      res.cookie('access-token', token, { httpOnly: true });
      return res.status(201).json({ message: "Admin login successful", token, user: { email, role: 'admin' } });
    } else {
      // Incorrect admin password
      return res.status(401).json({ message: "Incorrect admin password" });
    }
  }

  try {
    // Attempt to find the user
    const userExist = await User.findOne({ email });
    
    // Check if user exists and is not blocked
    if (!userExist) {
      return res.status(404).json({ message: "User does not exist" });
    }

    if (userExist.isBlocked) {
      return res.status(403).json({ message: "User is blocked by the admin" });
    }

    // Check if the password is correct
    const validPassword = bcrypt.compareSync(password, userExist.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate token and return response for a valid user login
    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRETE_KEY);
    const { password: hashedPassword, ...data } = userExist._doc;
    const expiryDate = new Date(Date.now() + 60 * 1000);

    res
      .cookie("Access_token", token, { httpOnly: true, expire: expiryDate })
      .status(201)
      .json({ message: "Login successful", user: data, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};
