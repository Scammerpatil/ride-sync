"use client";
import Link from "next/link";
import { IconCar } from "@tabler/icons-react";
import ThemeToggler from "./ThemeToggler";

const Header = () => {
  return (
    <>
      <div className="navbar px-10 py-2 bg-base-300">
        <div className="navbar-start">
          <Link
            href="/"
            className="text-2xl font-bold flex items-center py-2 rounded-lg hover:bg-base-200 transition-colors duration-300"
          >
            <IconCar size={56} className="text-secondary mx-2" />
            <div className="flex flex-col items-start gap-1 w-full">
              <div className="flex items-baseline gap-[2px]">
                <span className="text-primary font-extrabold text-xl">
                  Ride
                </span>
                <span className="text-accent font-semibold text-xl">Sync</span>
              </div>
              <hr className="w-full border border-base-content" />
              <span className="text-sm text-base-content/70 italic">
                Share the Journey, Split the Cost!
              </span>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base text-base-content">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end space-x-3">
          <Link href="/login" className="btn btn-accent">
            Login
          </Link>
          <Link href="/signup" className="btn btn-accent">
            Sign Up
          </Link>
          <ThemeToggler />
        </div>
      </div>
    </>
  );
};

export default Header;
