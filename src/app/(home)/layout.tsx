import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/modules/flight/ui/components/navbar";
import { NavbarSidebar } from "@/modules/flight/ui/components/navbar-sidebar";
import { Globe2Icon, HotelIcon, LuggageIcon, PlaneIcon } from "lucide-react";
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
interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="w-full">
        <Navbar />
        <div className="min-h-screen flex pt-[4rem]">
          <NavbarSidebar items={navbarItems} />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
