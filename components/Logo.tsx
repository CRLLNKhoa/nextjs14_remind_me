"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

export default function Logo() {
  const { theme } = useTheme();
  return (
    <div className="flex-shrink-0">
      <Link
        href="/"
        className="flex"
      >
        <h1 className="bg-gradient-to-r font-bold text-xl from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          NOTE
        </h1>
      </Link>
    </div>
  );
}
