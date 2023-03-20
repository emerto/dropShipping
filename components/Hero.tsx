import Image from "next/image";
import { Icon } from "@iconify/react";

const Hero = () => {
  return (
    <section>
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-5 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">
            <span className="text-primary font-extrabold">DropShoop</span> -
            Your Ultimate Dropshipping Destination!
          </h1>
          <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl">
            The ultimate destination for easy and efficient dropshipping - start
            and grow your online business hassle-free!
          </p>
          <a href="/signup" className="btn btn-primary font-bold">
            Get Started
            <Icon
              icon="material-symbols:arrow-right-alt"
              className="w-[24px] h-[24px] ml-2"
            />
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image src="/hero.png" alt="Hero Image" width={1000} height={1000} />
        </div>
      </div>
    </section>
  );
};

export default Hero;