import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// user schema
const userSchema = new mongoose.Schema({
  
  username: {
    type: String,
    required: [true, "Please Enter Email"],
    unique: [true, "Email Allready Exists"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    minLength: [8, "Password Should have atleast 8 chars"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

 
 
});

// before saving data password should be bcrypt
userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return  next()
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//JWT Authentication
const token = userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

// user model
export const User = mongoose.model("users", userSchema);
