import { Menu, X, User } from "lucide-react"; // Assuming 'User' icon exists
import { useState } from "react";
import logo from "../assets/logo.jpg";
import { navItems } from "../constants";
import { useNavigate } from 'react-router-dom'
import { useAuth } from './../contexts/authContext'
import { doSignOut } from './../firebase/auth'

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate()
  const { userLoggedIn, setIsDeveloper, setIsProjectManager } = useAuth()

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className={`sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 `}>
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <a href="/" className="flex items-center flex-shrink-0">
              <img className="h-10 w-10 mr-2 broder rounded-full" src={logo} alt="Logo" />
              <span className="text-xl tracking-tight">FreelanceNest</span>
            </a>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            {userLoggedIn && (
              <>
                {/* Profile icon */}
                <button onClick={() => navigate('/profile')}>
                  <User />
                </button>
                {/* Logout button */}
                <button onClick={() => {
                  doSignOut().then(() => {
                    navigate('/')
                    setIsDeveloper(false)
                    setIsProjectManager(false)
                  })
                }} className='text-sm text-white bg-gradient-to-r from-blue-500 to-blue-800 py-2 px-3 rounded-md'>Logout</button>
              </>
            )}
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-white w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            {/* Logout button */}
            <div className="hidden lg:flex justify-center space-x-12 items-center">
              <button onClick={() => {
                doSignOut().then(() => {
                  navigate('/')
                })
              }} className='text-sm text-white bg-gradient-to-r from-blue-500 to-blue-800 py-2 px-3 rounded-md'>Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
