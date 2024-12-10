import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import logo from '../assets/Logo.png';
import union from '../assets/union.png';
import UserImage from '../assets/userimage.png';
import { logout } from "../store/actions/authActions";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Sesión cerrada exitosamente');
    navigate('/login');
  };

  const handleClic = () => {    
    setIsOpen(!isOpen);
    setTimeout(() => {
      window.location.reload();
    }, 0);    
  };
    
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <nav className="flex justify-between items-center px-6 py-4 bg-transparent">
        <button className="text-blue-600 text-3xl focus:outline-none" onClick={toggleMenu}>&#9776;</button>
        <Link to="/" className="text-blue-600 text-3xl">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </Link>
      </nav>

      {isOpen && (
        <div className="fixed top-0 left-0 lg:w-1/3 w-full h-full bg-blue-600 z-40">
          <button className="absolute top-4 right-4" onClick={toggleMenu}>
            <img src={union} alt="Close Menu" className="h-4 w-4" />
          </button>
          <div className="px-6 mt-10">
            <div className="flex items-center mb-6">
              <img src={user?.photo || UserImage} alt="User" className="h-10 w-10 rounded-full" />
              <div className="ml-4 text-white">
                <p className="font-bold">Welcome,</p>
                <p className="text-sm">{user?.email || 'User Email'}</p>
              </div>
            </div>
            <ul className="space-y-4">
              <li><Link to="/" className="text-white text-lg p-2 rounded-md block hover:text-blue-600 hover: hover:bg-white" onClick={toggleMenu}>Home</Link></li>
              {token && (
                <>
                  <li><Link to="/profile" className="text-white text-lg p-2 rounded-md block hover:text-blue-600 hover: hover:bg-white" onClick={toggleMenu}>Profile</Link></li>
                  <li><Link to="/newrole" className="text-white text-lg p-2 rounded-md block hover:text-blue-600 hover: hover:bg-white" onClick={toggleMenu}>New Role</Link></li>
                  {user?.role === 3 && (
                    <li><Link to="/dashboard" className="text-white text-lg p-2 rounded-md block hover:text-blue-600 hover: hover:bg-white" onClick={toggleMenu}>Dashboard</Link></li>
                  )}
                  <li><Link to="/mangas" className="text-white text-lg p-2 rounded-md block hover:text-blue-600 hover: hover:bg-white" onClick={toggleMenu}>Mangas</Link></li>
                  {(user?.role === 1 || user?.role === 2) && (
                    <>
                      <li><Link to="/createmanga" className="text-white text-lg p-2 rounded-md block hover:text-blue-600 hover: hover:bg-white" onClick={toggleMenu}>Create Manga</Link></li>
                      <li><Link to="/mangas-manager" className="text-white text-lg p-2 rounded-md block hover:text-blue-600 hover: hover:bg-white" onClick={handleClic}>My Mangas</Link></li>
                    </>
                  )}
                  <li><button onClick={handleLogout} className="text-white text-lg p-2 rounded-md w-full text-left hover:text-blue-600 hover: hover:bg-white">Logout</button></li>
                </>
              )}
              {!token && (
                <>
                  <li><Link to="/login" className="text-white text-lg p-2 rounded-md block hover:text-blue-600 hover: hover:bg-white" onClick={toggleMenu}>Login</Link></li>
                  <li><Link to="/register" className="text-white text-lg p-2 rounded-md block hover:text-blue-600 hover: hover:bg-white" onClick={toggleMenu}>Register</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;