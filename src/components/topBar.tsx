"use client";

import HamburgerSvg from "@/svg/hamburger";
import XSvg from "@/svg/x";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    {
      content: "Additional Materials",
      href: "/additionalMaterials",
    },
    {
      content: "About",
      href: "/about",
    },
  ];

  return (
    <div
      className={`w-full flex justify-center ${
        !menuOpen && "border-b"
      } rounded-default border-darkgrey mb-4`}
    >
      <div className="w-full max-w-[1200px] flex justify-end m-8">
        <div className="flex gap-10 items-center mr-auto">
          <Link href={"/"}>
            <Image
              src="/logo.svg"
              alt="bloch-sphere-0"
              width={300}
              height={54}
            />
          </Link>
        </div>
        <div className="hidden sm:flex gap-8 items-center">
          {menuItems.map((item, index) => {
            return (
              <Link
                href={item.href}
                key={index}
                className="text-2xl no-underline text-white"
              >
                <h2>{item.content}</h2>
              </Link>
            );
          })}
        </div>
        <div
          className="flex items-center sm:hidden cursor-pointer"
          onClick={() => setMenuOpen((oldMenuOpen) => !oldMenuOpen)}
        >
          {menuOpen ? (
            <XSvg width={32} height={32} />
          ) : (
            <HamburgerSvg width={32} height={32} />
          )}
        </div>
        {menuOpen && (
          <div className="absolute flex flex-col top-[104px] left-0 bg-black w-full px-8 gap-4 border-b pb-4 border-darkgrey rounded-default">
            {menuItems.map((item, index) => {
              return (
                <Link
                  href={item.href}
                  key={index}
                  className="text-2xl no-underline text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  <h2>{item.content}</h2>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
