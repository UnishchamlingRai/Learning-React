import Image from "next/image";
import LogoImg from '@/public/logo.png'

function Logo() {
  // console.log("Logo:");
  return (
    <a href="/" className="flex items-center gap-4 z-10">
      
      {/* <Image  src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      <Image  src={LogoImg} quality={100} height="60" width="60" alt="The Wild Oasis logo" />
      
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </a>
  );
}

export default Logo;
