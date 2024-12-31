import { Button } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import apiClient from "../utlis/clientApi";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
   const { currentUser } = useSelector((state) => state.user);
   const dispatch = useDispatch();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleSignout = async () => {
    try {
      const res = await apiClient.get("/user/logout");
  
      if (res.status === 200) {
        dispatch(signoutSuccess());
        window.location.href = "/login"; 
      } else {
        console.error(res.data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error.message || error);
    }
  }

  return (
    <nav className="bg-blue-500 border-gray-200 px-4 py-3 sm:px-6">
      <div className="flex flex-wrap justify-between items-center mx-auto">
        {/* Brand Logo */}
        <a href="/dashboard" className="flex items-center">
          <span className="text-white text-lg font-semibold">TaskApp</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden text-white hover:bg-blue-600 focus:outline-none"
          aria-controls="mobile-menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* Links */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="mobile-menu"
        >
          <ul className="flex flex-col mt-4 md:mt-0 md:flex-row md:space-x-6">
            <li>
              <Link
                to={'/'}
                className="block py-2 px-3 rounded-md text-white hover:bg-blue-600 md:hover:bg-transparent md:hover:text-gray-200"
              >
                Tasks
              </Link>
            </li>
            <li>
              { currentUser && <div className="relative group">
                <button
                  className="block py-2 px-3 rounded-md text-white hover:bg-blue-600 md:hover:bg-transparent md:hover:text-gray-200"
                  aria-haspopup="true"
                >
                  Account
                </button>
                <div className="hidden group-hover:block absolute z-10 w-40 bg-white rounded-md shadow-lg">
                  <p
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {currentUser?.name}
                  </p>
                  <p
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                     {currentUser?.email}
                  </p>
                  <p
                    onClick={handleSignout}
                    className="block w-full text-left px-4 py-2 text-center cursor-pointer text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </p>
                </div>
              </div>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
