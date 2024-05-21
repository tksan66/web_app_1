import React, { useState } from 'react';
import axios from 'axios'; 
import SignUpPopup from './SignUp';

interface User {
  username: string;
}

interface LoginProps {
  onLogin: (isLoggedIn: boolean) => void;
  onloginusername : (Username : User) => void
}

// interface userData {
//   name: string;
//   password: string;
// }



const LoginPage: React.FC<LoginProps> = ({ onLogin , onloginusername }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/authentication/check/', {user_info: { username : username, password : password }});
      const status = response.data.status
      if (status === 'success') {
        onLogin(true);
        onloginusername({"username" : username})
      } else {
        alert('Invalid username or password');
      }
    } catch (error ){
      console.error("Error:", error);
      alert('An error occurred. Please try again later.');
    }

  };

  const handleSignUpClose = () => {
    setShowSignUpPopup(false);
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gray-500">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          <a
            href="#"
            onClick={() => setShowSignUpPopup(true)}
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Sign Up
          </a>
        </div>
        </div>
      <SignUpPopup
        isOpen={showSignUpPopup}
        onClose={handleSignUpClose}
      />
    </div>
  );
};

export default LoginPage;