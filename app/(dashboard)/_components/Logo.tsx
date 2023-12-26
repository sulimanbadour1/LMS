import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="items-center justify-center flex p-2">
      <Image src="/logo.png" alt="Logo" width={80} height={80} />
    </div>
  );
};

export default Logo;
