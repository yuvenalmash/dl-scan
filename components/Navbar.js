"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Capture Image", href: "/captureImage" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex gap-6 shadow-sm shadow-lime-500 p-4 bg-black bg-opacity-95">
      <p className="text-2xl text-[--primary-color] font-bold">DL Scanner</p>

      <ul className="hidden sm:flex space-x-4 ml-4">
        {navItems.map((item) => (
          <li
            key={item.href}
            className="hover:text-[--primary-color] flex items-center"
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <div className="ml-auto sm:hidden">
        {isMenuOpen ? (
          <AiOutlineMenuFold
            onClick={toggleMenu}
            className="text-3xl text-[--primary-color] cursor-pointer"
          />
        ) : (
          <AiOutlineMenuUnfold
            onClick={toggleMenu}
            className="text-3xl text-[--primary-color] cursor-pointer"
          />
        )}
      </div>
      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:hidden space-y-4 absolute top-16 right-4 bg-black bg-opacity-95 p-4 shadow-lime-500 shadow-sm`}
      >
        {navItems.map((item) => (
          <li
            key={item.href}
            className="hover:text-[--primary-color] flex items-center"
          >
            <Link
              href={item.href}
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
