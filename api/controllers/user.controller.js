import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';


export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    console.log(req.body)

    const { username, bio, phone, email, profilePicture, isPublicProfile } = req.body

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: username,
          bio: bio,
          phone: phone,
          email: email,
          password: req.body.password,
          profilePicture: profilePicture,
          isPublicProfile: isPublicProfile
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


// delete user


export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }

}

export const getAllUsers = async (req, res, next) => {
  const { userType } = req.user
  try {
    let users
    if (userType === 'admin') {
      users = await User.find({});
    } else {
      users = await User.find({ isPublicProfile: "true" })
    }
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}