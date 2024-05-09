import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/user/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md'>
      <h1 className='text-3xl font-semibold text-center mb-6'>Edit Profile</h1>
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt='profile'
            className='w-full h-full object-cover rounded-full'
          />
          <label
            htmlFor="profilePicture"
            className="absolute bottom-0 right-0 bg-slate-700 text-white px-2 py-1 rounded-full cursor-pointer"
          >
            Change
          </label>
          <input
            type='file'
            id="profilePicture"
            ref={fileRef}
            hidden
            accept='image/*'
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-medium">Username</label>
          <input
            defaultValue={currentUser.username}
            type='text'
            id='username'
            placeholder='Username'
            className='bg-gray-200 rounded-lg p-3'
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bio" className="text-sm font-medium">Bio</label>
          <input
            defaultValue={currentUser.bio}
            type='text'
            id='bio'
            placeholder='Bio'
            className='bg-gray-200 rounded-lg p-3'
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium">Phone</label>
          <input
            defaultValue={currentUser.phone}
            type='text'
            id='phone'
            placeholder='Phone'
            className='bg-gray-200 rounded-lg p-3'
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            defaultValue={currentUser.email}
            type='email'
            id='email'
            placeholder='Email'
            className='bg-gray-200 rounded-lg p-3'
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="isPublicProfile" className="text-sm font-medium">Public Profile</label>
          <select
            defaultValue={currentUser.isPublicProfile}
            id='isPublicProfile'
            className='bg-gray-200 rounded-lg p-3'
            onChange={handleChange}
          >
            <option value={"true"}>Yes</option>
            <option value={"false"}>No</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            className='bg-gray-200 rounded-lg p-3'
            onChange={handleChange}
          />
        </div>
        <button className='bg-slate-700 text-white py-3 rounded-lg uppercase hover:bg-slate-800 transition duration-200'>
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-6'>
        <span
          onClick={handleDeleteAccount}
          className='text-red-700 cursor-pointer'
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      {error && <p className='text-red-700 mt-5'>Something went wrong!</p>}
      {updateSuccess && <p className='text-green-700 mt-5'>User is updated successfully!</p>}
    </div>
  );
}
