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