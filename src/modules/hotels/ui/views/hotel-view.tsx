import { Input } from "@/components/ui/input";
import Image from "next/image";

export const HotelView = () => {
  return (
    <div className="max-w-7xl w-full px-4 mx-auto mb-10 pb-2.5 flex flex-col gap-y-6 justify-center">
      <div className="relative text-center">
        <Image
          src="/travel.svg"
          alt="hotel"
          width={0}
          height={0}
          className="w-full h-full"
        />
        <span className="absolute top-3/4 left-2/4 transform -translate-x-1/2  text-xl lg:text-4xl font-semibold ">
          Hotels
        </span>
      </div>
      <div className="w-full max-w-2xl mx-auto flex justify-center items-center">
        <Input className="rounded-xl" placeholder="Search your hotel" />
      </div>
    </div>
  );
};
