"use client";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if dark mode is already set in localStorage
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('theme', 'light');
    }
  }, [dark, mounted]);

  const toggle = () => setDark((d) => !d);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button
        aria-label="Toggle dark mode"
        className="ml-4 w-20 h-10 rounded-full flex items-center transition p-1 focus:outline-none relative bg-white border border-zinc-200"
      >
        <span className="w-7 h-7 rounded-full bg-[#0A0D1B] flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-2">
          <img src="/icons/sun.png" alt="Sun" className="w-4 h-4" />
        </span>
      </button>
    );
  }

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggle}
      className={`ml-4 w-20 h-10 rounded-full flex items-center transition-all duration-300 p-1 focus:outline-none relative
        ${dark ? 'bg-[#0A0D1B] border border-zinc-700' : 'bg-white border border-zinc-200'}`}
    >
      <span
        className={`w-7 h-7 rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 transition-all duration-300
          ${dark ? 'bg-white left-10' : 'bg-[#0A0D1B] left-2'}`}
      >
        {dark ? (
          <img src="/icons/moon.png" alt="Moon" className="w-4 h-4" />
        ) : (
          <img src="/icons/sun.png" alt="Sun" className="w-4 h-4" />
        )}
      </span>
    </button>
  );
} 