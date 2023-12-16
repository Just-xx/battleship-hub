import React, { useRef, useState } from "react";
import {
  Wrapper,
  NavigationWrapper,
  NavLink,
  Hamburger,
  MobileNavigationMenu,
  AngleIcon
} from "./Header.styles";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../Logo/Logo";

export default function Header() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const mobileMenuRef = useRef();

  return (
    <Wrapper>
      <Logo />
      <AnimatePresence mode="wait">
        {hamburgerOpen ? (
          <Hamburger
            as={motion.i}
            key="x"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            tabIndex="0"
            onClick={() => setHamburgerOpen(false)}
            className="fa-solid fa-x"
          ></Hamburger>
        ) : (
          <Hamburger
            as={motion.i}
            key="h"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            tabIndex="0"
            onClick={() => setHamburgerOpen(true)}
            className="fa-solid fa-bars"
          ></Hamburger>
        )}
      </AnimatePresence>
      <NavigationWrapper>
        <NavLink to="/">Home</NavLink>
        <NavLink to="#" $inactive>About</NavLink>
        <NavLink to="/play">Play</NavLink>
      </NavigationWrapper>
      <AnimatePresence>
        {hamburgerOpen && (
          <MobileNavigationMenu
            ref={mobileMenuRef}
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onBlur={() => setHamburgerOpen(false)}
            onAnimationComplete={() => mobileMenuRef.current.focus()}
            tabIndex="0"
          >
            <AngleIcon className="fa-solid fa-angle-up"></AngleIcon>
            <NavLink to="/">Home</NavLink>
            <NavLink to="#">About</NavLink>
            <NavLink to="/play">Play</NavLink>
          </MobileNavigationMenu>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}
