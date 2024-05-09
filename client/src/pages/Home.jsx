import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFailure } from '../redux/user/userSlice';

export default function Home() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const getUsersData = async () => {
    try {
      let users = await fetch('/api/user/all-users', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!users.ok) {
        if (users.status === 401) {
          console.log("Unauthorized");
        } else {
          // Handle other HTTP errors
          throw new Error('Failed to fetch data: ' + users.status);
        }
      }

      let data = await users.json();
      setUsers(data);
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error);
      dispatch(getUserFailure(error));
      alert("hi");
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="flex flex-wrap justify-left">
      {users && users.map((user, i) => (
        <div key={user._id} className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden m-4" style={{ height: "auto" }}>
          <img className="mx-auto w-20 h-auto" src={user.profilePicture} alt='profileepic' />
          <div className="p-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">{user.username}</h3>
              <p className="text-gray-600 text-sm">{user.bio}</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-700">Email: <a href={`mailto:${user.email}`} className="text-blue-500">{user.email}</a></p>
              <p className="text-gray-700">Phone: <span className="text-blue-500">{user.phone}</span></p>
            </div>
            <p className="text-gray-700">Profile: <span className={user.isPublicProfile === "true" ? 'text-green-500' : 'text-red-500'}>{user.isPublicProfile === "true" ? 'Public' : 'Private'}</span></p>
          </div>
        </div>
      ))}
    </div>
  );
}
