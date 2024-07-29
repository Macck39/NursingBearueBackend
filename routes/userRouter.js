import express from 'express';
import { getAllUser, getMyprofile, login, logout, register } from '../controllers/userController.js';
import { isAdmin, isAuthenticated } from '../middleswares/auth.js';


const userRouter = express.Router();


userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/",isAuthenticated, getMyprofile)
userRouter.get("/all",isAuthenticated, isAdmin, getAllUser)
userRouter.get('/logout',isAuthenticated, logout)


//chaange password
// userRouter.put('/changepassword', isAuthenticated, changePassword)




export default userRouter;