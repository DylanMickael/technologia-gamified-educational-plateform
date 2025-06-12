import type { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';

const LandingLayout = ({
    children
}:{
    children:ReactNode
}) => {

  return (
    <main className="
        w-full
        h-full
        pt-25
        flex 
        flex-col 
        items-center 
        min-h-screen 
    ">
        <Navbar/>
        <div className="w-full flex flex-col items-center">
            {children}
        </div>
    </main>
  );
};

export default LandingLayout;