import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="footer items-center bg-base-300 p-8 bottom-0">
      <div className="items-center grid-flow-col">
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="object-contain"
        />
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://github.com/emerto/dropShipping" target="_blank">
          <Icon
            icon="mdi:github"
            className="w-10 h-10 hover:text-primary transition duration-500 ease-in-out"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
