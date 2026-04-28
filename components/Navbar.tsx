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
    <header className="py-4 bg-white sticky top-0 left-0 w-full z-50 shadow">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 flex justify-center">
        <ul className="flex gap-4 md:gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`px-4 py-2 rounded text-sm font-medium transition ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-600 hover:text-black hover:bg-gray-100"
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