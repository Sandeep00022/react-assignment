import userModel from "../models/user.model.js";

export const createUser = async ({ name, email, password }) => {
    if (!name || !password || !email) {
      throw new Error("All fields are required");
    }
  
    const user = userModel.create({
        name,
      email,
      password,
    });
  
    return user;
  };
  