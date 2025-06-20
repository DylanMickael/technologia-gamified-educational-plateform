// export default PagePreEnfant;
import { useState } from "react";
import NavbarLogo from "../../components/Navbar/Logo";
import StorageObject from "./StorageObject";
function PagePreEnfant() {
  return (
    <PagePreEnfantLayout>
      <div className="flex flex-col justify-between items-center">
        <div className="flex justify-start items-center w-full">
          <NavbarLogo></NavbarLogo>
        </div>
        <StorageObject></StorageObject>
      </div>
    </PagePreEnfantLayout>
  );
}

const PagePreEnfantLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-aos="fade-in" className="animated-cursor w-full">
      <section className="hero-section flex flex-col max-w-[90rem] mx-auto py-10 md:py-20">
        {children}
      </section>
    </div>
  );
};

export default PagePreEnfant;
