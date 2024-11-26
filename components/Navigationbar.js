'use client'
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { usePathname } from "next/navigation";

export default function Navigationbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname()

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">
            <Link color="foreground" href="/">
              💼TO DO ORGANIZER
            </Link>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === '/toDoList'}>
          <Link color={pathname === '/toDoList' ? '' : "foreground"} href="/toDoList" aria-current={pathname === '/toDoList' ? 'page' : ""}>
            To do items list
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === '/addNewItem'}>
          <Link color={pathname === '/addNewItem' ? '' : "foreground"} href="/addNewItem" aria-current={pathname === '/addNewItem' ? 'page' : ""}>
            Add new item
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === '/history'}>
          <Link color={pathname === '/history' ? '' : "foreground"} href="/history" aria-current={pathname === '/history' ? 'page' : ""}>
            History
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} href="#" variant="flat">
            Login
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar >
  );
}
