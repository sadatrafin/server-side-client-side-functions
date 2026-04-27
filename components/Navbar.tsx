"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkItem {
  path: string;
  label: string;
}

const navLinks: NavLinkItem[] = [
  { path: "/", label: "Server Site" },
  { path: "/products", label: "Client Site" },
];

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="py-3 bg-white sticky top-0 left-0 w-full z-50 shadow">
      <nav className="flex justify-center items-center">
        <ul className="flex gap-5 p-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;