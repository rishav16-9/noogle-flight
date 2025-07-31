"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

import {
  Globe2Icon,
  HotelIcon,
  LuggageIcon,
  PlaneIcon,
  PanelLeftCloseIcon,
  PanelLeftIcon,
} from "lucide-react";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive, icon }: NavbarItem) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "flex items-center rounded-full hover:bg-[#e8f0fe] group border-transparent hover:text-[#0060f0]",
        isActive && "bg-[#e8f0fe] text-[#0060f0]"
      )}
    >
      <Link href={href}>
        {icon}
        {children}
      </Link>
    </Button>
  );
};
const style = "mr-2 h-4 w-4 text-[#0060f0]";
const navbarItems = [
  {
    href: "/",
    children: "Explore",
    icon: <Globe2Icon className={style} />,
  },
  {
    href: "/flight",
    children: "Flights",
    icon: <PlaneIcon className={style} />,
  },
  {
    href: "/travel",
    children: "Travel",
    icon: <LuggageIcon className={style} />,
  },
  {
    href: "/hotels",
    children: "Hotels",
    icon: <HotelIcon className={style} />,
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const { state, isMobile, toggleSidebar } = useSidebar();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50 border-b border">
      <div className="flex items-center gap-32 w-full">
        <div className="flex gap-8 items-center flex-shrink-0">
          <Button className="size-8" variant="outline" onClick={toggleSidebar}>
            {state === "collapsed" || isMobile ? (
              <PanelLeftIcon className="size-4" />
            ) : (
              <PanelLeftCloseIcon />
            )}
          </Button>
          <Link href="/" className="flex gap-x-4 items-center">
            <h1 className="text-3xl font-bold">Noogle</h1>
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          {navbarItems.map((item) => (
            <NavbarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              isActive={item.href === pathname}
            >
              {item.children}
            </NavbarItem>
          ))}
        </div>
      </div>
    </nav>
  );
};
