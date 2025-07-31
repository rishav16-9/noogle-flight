import Image from "next/image";
import { PlaneIcon, HotelIcon, LuggageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const ExploreView = () => {
  const explores = [
    {
      name: "Flight",
      icon: PlaneIcon,
      url: "/flight",
    },
    {
      name: "Travel",
      icon: LuggageIcon,
      url: "/travel",
    },
    {
      name: "Hotel",
      icon: HotelIcon,
      url: "/hotel",
    },
  ];
  return (
    <div className="max-w-7xl w-full px-4 mx-auto mb-10 pb-2.5 flex flex-col gap-y-6 justify-center">
      <div className="relative text-center">
        <Image
          src="/travel.svg"
          alt="travel"
          width={0}
          height={0}
          className="w-full h-full"
        />
        <span className="absolute top-3/4 left-2/4 transform -translate-x-1/2  text-xl lg:text-4xl font-semibold ">
          Explore
        </span>
      </div>
      <div className="flex gap-x-4 items-center justify-center ">
        {explores.map((explore) => (
          <Button
            asChild
            variant="outline"
            key={explore.name}
            className="rounded-full bg-[#e8f0fe] border-transparent hover:bg-[#e8f0fe] hover:text-[#0060f0]"
          >
            <Link href={explore.url}>
              {<explore.icon className="mr-2 text-[#0060f0]" />}
              {explore.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};
