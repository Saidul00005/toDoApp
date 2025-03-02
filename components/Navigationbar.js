'use client'
import React from 'react';
import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown } from "lucide-react";

export default function Navigationbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const desktopMenuItems = [
    { name: "To do items list", href: "/toDoList" },
    { name: "Add new item", href: "/addNewItem" }
  ];

  const mobileMenuItems = status === "authenticated"
    ? [
      ...desktopMenuItems,
      { name: "View Profile", href: "/viewProfile" },
      { name: "Sign Out", href: "#", action: () => { handleSignOut() } },
    ]
    : [];

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };



  return (
    <div>
      <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
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
          {status === 'authenticated' ? (
            desktopMenuItems.map(({ name, href }, index) => (
              <NavbarItem key={index} isActive={pathname === href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : ""}
                  className={`${pathname === href ? "text-primary" : "text-foreground"}`}
                >
                  {name}
                </Link>
              </NavbarItem>
            ))) :
            ""}
        </NavbarContent>

        {/* Right Side Items */}
        <NavbarContent justify="end">
          {status === 'authenticated' ? (
            <>
              {/* User Icon and Name with Dropdown */}
              <NavbarItem className="hidden md:flex">
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="light" className="py-0 px-.5">
                      <Avatar src={session.user.image} alt={session.user.name} size="sm" className="mr-2" />
                      <span>{session.user.name}</span>
                      <ChevronDown size={16} className="ml-1" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User menu actions">
                    <DropdownItem key="profile">
                      <Link href="/viewProfile" className="w-full">
                        View Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="signout" color="danger" onPress={handleSignOut}>
                      Sign Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </>
          ) : ''}
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu>
          {mobileMenuItems.map(({ name, href, action }, index) => (
            <NavbarMenuItem key={index}>
              {action ? (
                <Button onPress={action} size='sm' className="w-full">
                  {name}
                </Button>
              ) : (
                <Link
                  href={href}
                  className={`text-sm w-full ${pathname === href ? "text-primary font-bold" : "text-foreground"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {name}
                </Link>
              )}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}