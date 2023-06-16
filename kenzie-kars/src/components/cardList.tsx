import Image from "next/image";
import car from "../assets/car.png";
import Profile from "../components/profile";

const CardList = () => {
  return (
    <ul className="w-full md:w-[70%] flex overflow-auto md:flex-wrap relative h-full">
      <li className="px-4 py-8 flex flex-col gap-6 text-grey-1 min-w-[100%] md:min-w-[50%] lg:min-w-[33%] w-[100%] md:w-[50%] lg:w-[33%] ">
        <div>
          <Image className="w-full h-full" src={car} alt="carro" />
        </div>
        <h3 className="w-full whitespace-nowrap  font-bold truncate">
          Product title stays here - max 1 line
        </h3>
        <p className="w-full line-clamp-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...
        </p>

        <Profile name="Samuel Leão" />
        <div className=" flex justify-between font-bold">
          <div>
            <span className="bg-brand-4 text-brand-2 mr-4 p-2 rounded">0 KM</span>
            <span className="bg-brand-4 text-brand-2 p-2 rounded">2019</span>
          </div>
          <p>R$ 00.0000,00</p>
        </div>
      </li>
      <li className="px-4 py-8 flex flex-col gap-6 text-grey-1 min-w-[100%] md:min-w-[50%] lg:min-w-[33%] w-[100%] md:w-[50%] lg:w-[33%] ">
        <div>
          <Image className="w-full h-full" src={car} alt="carro" />
        </div>
        <h3 className="w-full whitespace-nowrap  font-bold truncate">
          Product title stays here - max 1 line
        </h3>
        <p className="w-full line-clamp-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...
        </p>

        <Profile name="Samuel Leão" />
        <div className=" flex justify-between font-bold">
          <div>
            <span className="bg-brand-4 text-brand-2 mr-4 p-2 rounded">0 KM</span>
            <span className="bg-brand-4 text-brand-2 p-2 rounded">2019</span>
          </div>
          <p>R$ 00.0000,00</p>
        </div>
      </li>
      <li className="px-4 py-8 flex flex-col gap-6 text-grey-1 min-w-[100%] md:min-w-[50%] lg:min-w-[33%] w-[100%] md:w-[50%] lg:w-[33%] ">
        <div>
          <Image className="w-full h-full" src={car} alt="carro" />
        </div>
        <h3 className="w-full whitespace-nowrap  font-bold truncate">
          Product title stays here - max 1 line
        </h3>
        <p className="w-full line-clamp-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...
        </p>

        <Profile name="Samuel Leão" />
        <div className=" flex justify-between font-bold">
          <div>
            <span className="bg-brand-4 text-brand-2 mr-4 p-2 rounded">0 KM</span>
            <span className="bg-brand-4 text-brand-2 p-2 rounded">2019</span>
          </div>
          <p>R$ 00.0000,00</p>
        </div>
      </li>
      <li className="px-4 py-8 flex flex-col gap-6 text-grey-1 min-w-[100%] md:min-w-[50%] lg:min-w-[33%] w-[100%] md:w-[50%] lg:w-[33%] ">
        <div>
          <Image className="w-full h-full" src={car} alt="carro" />
        </div>
        <h3 className="w-full whitespace-nowrap  font-bold truncate">
          Product title stays here - max 1 line
        </h3>
        <p className="w-full line-clamp-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...
        </p>

        <Profile name="Samuel Leão" />
        <div className=" flex justify-between font-bold">
          <div>
            <span className="bg-brand-4 text-brand-2 mr-4 p-2 rounded">0 KM</span>
            <span className="bg-brand-4 text-brand-2 p-2 rounded">2019</span>
          </div>
          <p>R$ 00.0000,00</p>
        </div>
      </li>

      <div className="w-full font-semibold md:flex gap-8 justify-center items-center hidden">
        <p className="text-grey-3">
          <span className="text-grey-2">1</span> de 2
        </p>
        <p className="text-brand-1 cursor-pointer">{"Seguinte >"}</p>
      </div>
    </ul>
  );
};

export default CardList;
