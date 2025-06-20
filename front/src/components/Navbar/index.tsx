import { useState } from "react";
import MobileNavbar from "./Mobile.tsx";
import NavbarLinks from "./Links.tsx";
import NavbarActions from "./Actions.tsx";
import NavbarLayout from "./Layout.tsx";
import NavbarLogo from "./logo.tsx";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleShowMenu = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setMobileMenuOpen(true);
  };

  return (
    <>
      <NavbarLayout>
        <NavbarLogo />
        <div className="hidden md:flex items-center gap-4">
          <NavbarLinks />
        </div>
        <div className="hidden md:flex items-center gap-4">
          <NavbarActions />
        </div>
        <button
          className="md:hidden flex items-center text-3xl px-2"
          onClick={() => handleShowMenu()}
          aria-label="Open menu"
        >
          <span>☰</span>
        </button>
      </NavbarLayout>
      <MobileNavbar
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};
