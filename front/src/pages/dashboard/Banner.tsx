import Logo from '../../assets/Logo.png';
import Illustration from '../../assets/img/dashboard.illustration.png';

const BannerContent = () => {
    return (
        <div className='flex gap-5 items-center'>
            <img src={Logo} alt="Logo" />
            <div>
                <p className="font-bold text-lg">Welcome to your dashboard</p>
                <p className="text-md">Eco city is a lore ipsum</p>
            </div>
        </div>
    )
}

const BannerIllustration = () => {
    return (
        <div>
            <img className='w-[100px]' src={Illustration} alt="Logo" />
        </div>
    )
}

const BannerLayout = ({
  children
}:{
    children: React.ReactNode
}) => {

  return (
    <div className="flex justify-between items-center bg-green-100 dark:bg-green-800 shadow-md shadow-green-100 dark:shadow-green-800 rounded-md py-5 px-8">
        {children}
    </div>
  );
}

const Banner = () => {
  return (
    <BannerLayout>
        <BannerContent />
        <BannerIllustration />
    </BannerLayout>
  );
}

export default Banner;