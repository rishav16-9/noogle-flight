"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavbarItems {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

interface Props {
  items: NavbarItems[];
}
export const NavbarSidebar = ({ items }: Props) => {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="pt-16 border-none">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.href === pathname}
                    className={cn(
                      "bg-white",
                      item.href === pathname && "bg-[#e8f0fe]! text-[#0060f0]!"
                    )}
                  >
                    <Link
                      href={item.href}
                      className="hover:text-[#0060f0] flex items-center gap-4"
                    >
                      {item.icon}
                      <span
                        className={cn(
                          item.href === pathname && "text-[#0060f0]"
                        )}
                      >
                        {item.children}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
