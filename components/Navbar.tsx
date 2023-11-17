import { UserButton } from "@clerk/nextjs";
import React from "react";
import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
  return (
    <header className="w-full">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-2">
         <Logo />
          <div className="flex gap-4 items-center">
            <UserButton />
            <ThemeSwitch />
          </div>
        </nav>
      </div>
    </header>
  );
}
