import React from "react";

const CartProducts = () => {
  const number = 0;
  return (
    <section className="bg-gray-900 flex justify-center">
      <div className="flex flex-row ml-5 w-[250px]">
        <div className="border-2 flex flex-col gap-1 py-3 px-4 mx-auto w-[800px] border-gray-900 ">
          <div className="gap-2 mt-8 flex justify-center ">
            <img
              className="w-max max-h-[200px] rounded-lg "
              src="http://www.fatih.gov.tr/kurumlar/fatih.gov.tr/icerik_resim/fatih-cami-resimleri9.jpg"
            />
          </div>
          <div className=" sm:text-lg  ">
            <h2 className="mb-2 flex text-xl tracking-tight font-normal text-white  ">
              Cami
            </h2>
          </div>

          <div className="flex">
            <div className="w-full bg-slate-100 flex">
              <div className="border-1 flex flex-[1] bg-primary rounded-2xl w-[50px] h-max justify-center ">
                <p className="text-black  text-sm font-bold ">12$</p>
              </div>
              <div className="flex flex-[2] bg-red-800 justify-end mr-4 ">
                <button className="p-3 bg-green-600 rounded-lg">-</button>
                <h3 className="p-3 bg-blue-400">{number}</h3>
                <button className="p-3 bg-green-600 rounded-lg">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartProducts;
