import UserModel from '../schemas/user.schema.js';

export const findUser = async (email) =>{
    return await UserModel.findOne({ email});
}

export const findUserById = async (id) => {
    return await UserModel.findById(id);
}

export const createNewUser = async (userData,hashedPassword) =>{
    const user = new UserModel({...userData,password:hashedPassword});
    const savedUser = await user.save();
    return savedUser;
}

export const findUserWithToken = async (hashtoken) => {
    return await UserModel.findOne({
      resetPasswordToken: hashtoken,
    });
  };

  export const findUserWithValidToken = async (hashtoken) => {
    return await UserModel.findOne({
      resetPasswordToken: hashtoken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  };
