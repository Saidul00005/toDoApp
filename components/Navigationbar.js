'use client'
import React from "react";
import Link from 'next/link'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { usePathname } from "next/navigation";

export default function Navigationbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const desktopMenuItems = [
    { name: "To do items list", href: "/toDoList" },
    { name: "Add new item", href: "/addNewItem" },
    { name: "History", href: "/history" },
  ];

  const mobileMenuItems = desktopMenuItems; // Adjust this if you want separate items for mobile

  return (
    <div>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        {/* Top Left: Logo and Menu Toggle */}
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">
              <Link href="/" color="foreground">
                💼TO DO ORGANIZER
              </Link>
            </p>
          </NavbarBrand>
        </NavbarContent>

        {/* Center Menu Items for Desktop */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {desktopMenuItems.map(({ name, href }, index) => (
            <NavbarItem key={index} isActive={pathname === href}>
              <Link
                href={href}
                aria-current={pathname === href ? "page" : ""}
                className={`${pathname === href ? "text-primary" : "text-foreground"
                  }`}
              >
                {name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Right Side Items */}
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button
              as={Link}
              href="#"
              variant="flat"
              className={pathname === "/" ? "hidden" : ""}
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Button
              as={Link}
              href="#"
              variant="flat"
              className={pathname === "/" ? "hidden" : ""}
            >
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu>
          {mobileMenuItems.map(({ name, href }, index) => (
            <NavbarMenuItem key={index}>
              <Link
                href={href}
                className={`w-full ${pathname === href ? "text-primary font-bold" : "text-foreground"
                  }`}
              >
                {name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}