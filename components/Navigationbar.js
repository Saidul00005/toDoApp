'use client'
import React from 'react';
import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Avatar, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navigationbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const desktopMenuItems = [
    { name: "To do items list", href: "/toDoList" },
    { name: "Add new item", href: "/addNewItem" },
    { name: "History", href: "/history" },
  ];

  const mobileMenuItems = session
    ? [
      ...desktopMenuItems,
      { name: "View Profile", href: "/profile" },
      { name: "Sign Out", href: "#", action: () => { handleSignOut() } },
    ]
    : [];

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };



  return (
    <div>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
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
          {session ? (
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
          {session ? (
            <>
              {/* User Icon and Name with Dropdown */}
              <NavbarItem className="hidden lg:flex">
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="light" className="py-0 px-1">
                      <Avatar src={session.user.image} alt={session.user.name} size="sm" className="mr-2" />
                      <span>{session.user.name}</span>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User menu actions">
                    <DropdownItem key="profile">
                      <Link href="/profile" className="w-full">
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
                <Button onPress={action} className="w-full">
                  {name}
                </Button>
              ) : (
                <Link
                  href={href}
                  className={`w-full ${pathname === href ? "text-primary font-bold" : "text-foreground"}`}
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