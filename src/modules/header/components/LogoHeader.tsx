import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo.webp';

export const LogoHeader = () => {
  return (
    <Link to="/" className=" ">
      <img
        src={logo}
        alt="logo"
        width={60}
        height={60}
        className="size-[60px]"
      />
    </Link>
  );
};
