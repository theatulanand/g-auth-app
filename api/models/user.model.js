import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    bio: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isPublicProfile: {
      type: String,
      required: true,
      default: "false"
    },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
    userType: {
      type: String,
      default: "user"
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;