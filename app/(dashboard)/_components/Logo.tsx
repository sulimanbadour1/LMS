import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="items-center justify-center flex p-2">
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={120} height={120} />
      </Link>
    </div>
  );
};

export default Logo;
