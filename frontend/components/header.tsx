import background4 from "../data/bg-4.png";
import React from "react";
import Image from "next/image";

interface HeadersProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}

function Header({ src, alt, width, height, className }: HeadersProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
export default Header;

// <Image src="/bg-4.png" alt="Background4" width={1920} height={877.28} className="background4"/>;
