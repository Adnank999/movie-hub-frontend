"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { persistor } from "@/redux/store";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import _ from "lodash";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/redux/movie/userSlice";
import { clearRatings } from "@/redux/movie/ratingSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const auth = useAuth();

  const isLoggedIn = auth.isLoggedIn;
  const setLoggedIn = auth.setIsLoggedIn;

  const handleLogin = () => {
    if (isLoggedIn) {
      localStorage.removeItem("authToken");
      setLoggedIn(false);
      dispatch(logoutUser());
      dispatch(clearRatings());
      persistor.purge();
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <section className="">
      <nav
        className="flex flex-col lg:flex-row-reverse items-center justify-center gap-4 lg:gap-0  px-8 py-1 shadow-sm bg-gradient-to-r from-red-500 to-red-800"
      >
        
          <div className="flex flex-row justify-center items-center gap-4 lg:gap-16 ml-0 lg:ml-24">
            <div className="ml-0 cursor-pointer">
              <Link href="/">Home</Link>
            </div>

            <div className="ml-0 ">
              <button className="cursor-pointer" onClick={handleLogin}>
                {auth.buttonText}
              </button>
            </div>
            <div className="ml-0 ">
              <button
                className="cursor-pointer"
                onClick={() => setIsRegisterOpen(true)}
              >
                Register
              </button>
            </div>
            {isLoggedIn && (
              <div className="ml-0 cursor-pointer">
                <Link href="/newMovie">Add New Movie</Link>
              </div>
            )}
            <div className="ml-0 ">
              <ModeToggle />
            </div>
          </div>

          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onRegistrationOpen={() => {
              setIsRegisterOpen(true);
            }}
          />

          <RegisterModal
            isOpen={isRegisterOpen}
            onClose={() => setIsRegisterOpen(false)}
          />
        
      </nav>
    </section>
  );
};

export default Navbar;
