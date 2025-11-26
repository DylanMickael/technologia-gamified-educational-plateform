import type { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';
import Footer from '../components/footer';

const LandingLayout = ({
    children
}:{
    children:ReactNode
}) => {

  return (
    <main className="
        landing-layout
        w-screen
        h-full
        flex 
        flex-col 
        items-center 
        min-h-screen 
    ">
        <Navbar/>
        <div className='w-full flex flex-col items-center'>
            {children}
        </div>
        <Footer/>
    </main>
  );
};


export default LandingLayout;
