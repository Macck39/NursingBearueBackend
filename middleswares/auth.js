
import { asyncError } from './error.js';
import ErrorHandler from '../utils/error.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModal.js';

export const isAuthenticated = asyncError(async (req, res, next)=>{
    const token = req.cookies.token;
    if(!token ) return next( new ErrorHandler("not logged in", 401))
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodeData._id);
    next();
});


export const isAdmin = asyncError( async (req, res, next)=>{
    if(req.user.role !== "admin") return next( new ErrorHandler("You are not Admin, only admin Allowed!"))
    next();
})


