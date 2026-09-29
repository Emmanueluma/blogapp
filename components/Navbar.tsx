
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Search } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <nav className={`flex justify-between items-center p-5 w-full h-[80px] shadow-[var(--nav-shadow)] text-lg fixed top-0 z-50 ${scrolled ? "bg-white" : "bg-transparent"}`}>
      
      <Link href="/" className="flex items-center gap-2">
        <span><BookOpen size={29} className="text-[var(--btn-color)]" /></span>
        <span className="text-2xl ">MY BLOG</span>
      </Link>
      
      <ul className="flex justify-center items-center gap-8  rounded-lg p-2">
        <li className="relative" >
            <Link href="/">
                home 
                <div className={ pathname === "/" ? "absolute top-0 left-0 w-full h-[56px] activelink" : "absolute top-0 left-0 w-full h-[56px]" }></div>
            </Link>
        </li>
        <li className="relative">
            <Link href="/posts">
                explore
                <div className={pathname === "/posts" ? "absolute top-0 left-0 w-full h-[56px] activelink" : "absolute top-0 left-0 w-full h-[56px]"}></div>
            </Link>
        </li>
        <li className="relative">
            <Link href="/create">
                create 
                <div className={pathname === "create" ? "absolute top-0 left-0 w-full h-[56px] activelink" : "absolute top-0 left-0 w-full h-[56px]"}></div>
            </Link>
        </li>
      </ul>
    
        <label htmlFor="search" className="flex justify-center items-center gap-2 p-1 rounded-lg bg-gray-100 searchfocus">
            <Search size={20} className="text-gray-500 m-3 " />
            <input id="search" placeholder="Search posts..."  className="p-2 outline-none border-none inputfocus" />
        </label>

      <div className="flex justify-center items-center gap-4 ">
        <button className="px-4 py-2 rounded-lg capitalize cursor-pointer loginbutton">login</button>
        <button className="bg-[var(--btn-color)] text-white px-4 py-2 rounded-lg capitalize cursor-pointer signupbutton">sign up</button>
      </div>
    </nav>
  );
}