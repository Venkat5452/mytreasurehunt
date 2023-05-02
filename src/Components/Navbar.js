import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../Context/UserAuthContext'

const Navbar = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex justify-between bg-gray-200 w-full p-4'>
      <h1 className='text-center text-2xl font-bold'>
        Welcome To puzzle Games
      </h1>
      {user?.displayName ? (
        <button onClick={handleSignOut}>Logout</button>
      ) : (
        <Link to='/Login'>Sign in</Link>
      )}
    </div>
  );
};

export default Navbar;