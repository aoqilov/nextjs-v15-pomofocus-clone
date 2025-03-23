"use client";

import Image from "next/image";
import { BodyLogo, Config, Graph, Option, User } from "../../../public";
import NavbarSettings from "./navbarSettings";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ChangeTime } from "@/interface";

const Navbar = ({
  changeTime,
  setChangeTime,
}: {
  changeTime: ChangeTime;
  setChangeTime: Dispatch<SetStateAction<ChangeTime>>;
}) => {
  // ---------------------------   states
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // ---------------------------   useefects
  // ---------------------------   functions
  return (
    <nav className="navbar container">
      <div className="nav__logo">
        <Image src={BodyLogo} alt="logo" className="nav__logo-img" />
        <h3 className="nav__logo-text">Pomofocus</h3>
      </div>
      <div className="nav__menu">
        <ul className="nav__menu-list">
          <li className="nav__menu-item">
            <Image src={Graph} alt="graph-icon" className="item-icon" />
            <p className="item-text">Report</p>
          </li>
          <li className="nav__menu-item" onClick={() => setIsOpen(true)}>
            <Image src={Config} alt="config-icon" className="item-icon" />
            <p className="item-text">Config</p>
          </li>
          <li className="nav__menu-item">
            <Image src={User} alt="user-icon" className="item-icon" />
            <p className="item-text">Sign in</p>
          </li>
          <li className="nav__menu-item">
            <Image src={Option} alt="option-icon" className="item-icon" />
          </li>
        </ul>
      </div>
      {isOpen && (
        <NavbarSettings
          changeTime={changeTime}
          setChangeTime={setChangeTime}
          setIsOpen={setIsOpen}
        />
      )}
    </nav>
  );
};

export default Navbar;
