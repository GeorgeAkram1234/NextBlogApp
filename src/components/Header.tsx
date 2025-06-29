'use client'
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="md:w-3/4 mx-auto">
        <header className="flex border-b border-gray-200 dark:border-zinc-800 items-center justify-between px-6 py-4 h-20 ">
          <div className="font-semibold text-sm ">George Akram</div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center">
            <nav>
              <ul className="flex space-x-8 ">
                <li><Link href="/" >Blog</Link></li>
                <li><Link href="/" >Projects</Link></li>
                <li><Link href="/" >About</Link></li>
                <li><Link href="/" >Newsletter</Link></li>
              </ul>
            </nav>
            <div className="ml-6"><DarkModeToggle /></div>
          </div>
          {/* Mobile bars */}
          <button
            className="md:hidden focus:outline-none cursor-pointer "
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>
      </div>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-black flex flex-col items-center justify-center">
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <div className="font-semibold  text-lg mb-8">George Akram</div>
            <nav>
              <ul className="flex flex-col items-center space-y-6  text-base">
                <li><Link href="/" onClick={() => setMenuOpen(false)} >Blog</Link></li>
                <li><Link href="/" onClick={() => setMenuOpen(false)} >Projects</Link></li>
                <li><Link href="/" onClick={() => setMenuOpen(false)} >About</Link></li>
                <li><Link href="/" onClick={() => setMenuOpen(false)} >Newsletter</Link></li>
              </ul>
            </nav>
            <div className="mt-10"><DarkModeToggle /></div>
          </div>
          {/* X Icon */}
          <button
            className="mb-8  text-2xl focus:outline-none cursor-pointer  "
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <h1 className="text-7xl font-black tracking-tight text-center flex-1 mt-3 ">
        THE BLOG
      </h1>
    </>
  );
}
