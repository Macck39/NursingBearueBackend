// import User from '../models/User';
import jwt from 'jsonwebtoken';
import {User} from '../models/userModal.js';
import { asyncError } from '../middleswares/error.js';


export const register = asyncError(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const login = asyncError(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = user.generateToken()
    res.cookie("token", token,{
      httpOnly: false,
      sameSite: 'Strict',
      secure:false,
      maxAge: 10 * 24 * 60 * 60 * 1000
    }).json({ success:true,message: "Login Successfull" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const getMyprofile = asyncError(async(req,res)=>{
  try {
    const user = await User.findById(req.user._id,'username role -_id');
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

export const getAllUser =  asyncError(async(req, res)=>{
  try {
    const users = await User.find({},'username role -_id');
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})
export const logout = asyncError(async (req, res) => {
  res.status(200).cookie("token", "", {
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message: "Logged Out Successfully!"
  })

})
