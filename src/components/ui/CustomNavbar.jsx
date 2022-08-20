import React from "react";
import { useState } from "react";
import logo from "../../assets/logo.svg";
import { MdDashboard } from "react-icons/md";
import {
  AiOutlineFundView,
  AiOutlineMoneyCollect,
  AiOutlineBulb,
  AiOutlineHome,
} from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

const CustomNavbar = () => {
  const [showNav, setShowNav] = useState(false);

  const toggleShowNavbar = () => {
    setShowNav((prev) => !prev);
  };

  const navClasses =
    "flex-col divide-y mt-4 md:mt-0 md:divide-y-0 md:w-max md:flex md:flex-row justify-center items-center md:space-x-3  " +
    (showNav ? "w-full " : "hidden ");

  const navItems = [
    {
      to: "/",
      title: "Home",
      icon: <AiOutlineHome />,
    },

    {
      to: "cryptocurrencies",
      title: "Cryptocurrencies",
      icon: <AiOutlineFundView />,
    },

    {
      to: "exchanges",
      title: "Exchanges",
      icon: <AiOutlineMoneyCollect />,
    },

    {
      to: "news",
      title: "News",
      icon: <AiOutlineBulb />,
    },
  ];

  return (
    <nav className="w-full flex flex-wrap items-center justify-between mx-auto p-2 px-4 shadow-sm py-4 fixed bg-gray-50">
      <Link to="/" className="flex justify-center items-center">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ">
          CryptoApp
        </span>
      </Link>
      {/* logo */}

      <button
        onClick={toggleShowNavbar}
        className="block md:hidden  font-bold  text-4xl hover:bg-slate-200 rounded-lg transition-all duration-150  text-center"
      >
        <MdDashboard />
      </button>
      {/* navbar toggle button */}

      <div className={navClasses}>
        {navItems.map((item) => (
          <div key={item.title} className="py-3 md:py-0">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link-active" : "nav-link"
              }
              to={item.to}
            >
              {item.icon}
              {item.title}
            </NavLink>
          </div>
        ))}
      </div>
      {/* navbar items */}
    </nav>
  );
};

export default CustomNavbar;
