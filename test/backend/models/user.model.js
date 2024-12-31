import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength: [3, 'Email must be at least 3 characters long']
    },
    email: {
      type: String,
      required:true,
      unique:true,
      minlength: [5, 'Email must be at least 5 characters long']
    },
    password: {
      type: String,
      required: true,
      select:false
    },
  });


  userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn:'24h'});
    return token
}

userSchema.methods.comparePassword = async function (password) {
   return bcryptjs.compare(password, this.password);
}
userSchema.statics.hashPassword = async function (password) {
   return bcryptjs.hash(password, 10);
}

const userModel  = mongoose.model('user', userSchema);

export default userModel;