"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NotepadText, Bug, LogIn, LogOutIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, DropdownMenu } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
function Navbar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const { status, data: session } = useSession();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentpath = isMounted ? pathname : "";
  return (
    <nav className="flex  fixed w-full md:w-fit z-50">
      <div className="md:flex flex-col h-screen border-r-2 border-slate-600/40 w-40 bg-sidebar gap-10 hidden">
        <div className="flex">
          <div className="h-16 w-full flex justify-center items-center bg-secondary gap-1">
            <Bug className="bg-[#be3838] p-2 h-10 w-10 stroke-white rounded-xl" />
            <p className="text-white text-lg font-semibold font-roboto">
              IssueTracker
            </p>
          </div>
        </div>
        <div className="p-1 flex flex-col justify-between h-full w-full">
          <ul className="bg-white/10 flex flex-col items-start justify-center gap-x-4 w-full rounded-xs">
            <Link href="/issues" passHref className="w-full">
              <li
                className={`flex items-center p-2 w-full gap-2 font-roboto rounded-xs cursor-pointer transition-colors hover:bg-muted/80 ${
                  currentpath === "/issues" ? " text-white" : " text-white/80"
                }`}
              >
                <Bug
                  className={`${
                    currentpath === "/issues"
                      ? "stroke-white"
                      : "stroke-white/80"
                  }`}
                />
                Issues
              </li>
            </Link>

            <Link href="/" passHref className="w-full">
              <li
                className={`flex items-center p-2 w-full gap-2 font-roboto rounded-xs cursor-pointer hover:bg-muted/80 transition-colors ${
                  currentpath === "/" ? " text-white" : " text-white/80"
                }`}
              >
                <NotepadText
                  className={`${
                    currentpath === "/" ? "stroke-white" : "stroke-white/80"
                  }`}
                />
                Dashboard
              </li>
            </Link>
            {status === "authenticated" && (
              <p
                className="w-full `flex items-center p-2 gap-2 font-roboto rounded-xs cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => signOut()}
              >
                <li className=" text-white/80 flex gap-2 justify-start items-center">
                  <LogOutIcon className="stroke-white/80 h-5 w-5" />
                  Sign Out
                </li>
              </p>
            )}
            {status === "unauthenticated" && (
              <p
                className="`flex items-center p-2 w-full gap-2 font-roboto rounded-xs cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => signIn()}
              >
                <li className=" text-white/80 flex gap-2 justify-start items-center">
                  <LogIn className="stroke-white/80 h-5 w-5" />
                  Sign In
                </li>
              </p>
            )}
          </ul>
          {status === "authenticated" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="w-fit flex items-center justify-between rounded-sm cursor-pointer border-2 border-muted/50 bg-muted/20 hover:border-blue-400/50 transition-colors gap-2">
                <div>
                  <Avatar
                    src={session?.user?.image ?? undefined}
                    fallback="?"
                    size={"3"}
                    radius="small"
                  />
                  <p className="font-roboto text-base pr-2">User Profile</p>
                </div>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                className="flex flex-col gap-2 p-2 rounded-xs"
                variant="solid"
              >
                <DropdownMenu.Item className="text-white/80 hover:text-white cursor-pointer ">
                  {session.user?.name}
                </DropdownMenu.Item>
                <DropdownMenu.Item className="text-white/80 hover:text-white cursor-pointer ">
                  {session.user?.email}
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="text-white/80 hover:text-white cursor-pointer bg-secondary"
                  onClick={() => signOut()}
                >
                  Sign Out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </div>
      </div>
      <div className=" flex h-16 md:w-fit  justify-between max-sm:w-full sm:w-full bg-sidebar md:bg-transparent items-center ">
        <div className="md:flex border-t-64 border-secondary  border-l-4 border-r-transparent border-r-20 md:h-0 md:w-0 relative right-1 max-sm:hidden sm:hidden"></div>
        <div className="flex items-center justify-center gap-2 pl-3 md:hidden">
          <Bug className="bg-[#be3838] p-2 h-10 w-10 stroke-white rounded-xl" />
        </div>
        <ul className="flex flex-row items-center justify-end gap-x-6 w-auto rounded-xs md:hidden mr-5">
          <Link href="/issues" passHref className="w-fit">
            <Bug
              className={`${
                currentpath === "/issues" ? "stroke-white" : "stroke-white/80"
              }`}
            />
          </Link>

          <Link href="/" passHref className="w-fit">
            <li
              className={`flex items-center font-roboto ${
                currentpath === "/" ? " text-white" : " text-white/80"
              }`}
            >
              <NotepadText/>
            </li>
          </Link>
          {status === "authenticated" && (
            <Button variant="outline" onClick={() => signOut()}>
              <LogOutIcon className="stroke-secondary h-4 w-4" />
            </Button>
          )}
          {status === "unauthenticated" && (
            <Button variant="outline" onClick={() => signIn()}>
              <LogIn className="stroke-secondary h-4 w-4" />
            </Button>
          )}
          {status === "authenticated" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="w-fit items-center rounded-xs cursor-pointer border-2 border-muted/80 hover:border-blue-400/90 transition-colors ">
                <Avatar
                  src={session?.user?.image ?? undefined}
                  fallback={session?.user?.name?.charAt(0) ?? "?"}
                  radius="full"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                className="flex flex-col gap-2 p-2 rounded-xs"
                variant="solid"
              >
                <DropdownMenu.Item className="text-white/80 hover:text-white cursor-pointer ">
                  {session.user?.name}
                </DropdownMenu.Item>

                <DropdownMenu.Item className="text-white/80 hover:text-white cursor-pointer ">
                  {session.user?.email}
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="text-white/80 hover:text-white cursor-pointer bg-secondary"
                  onClick={() => signOut()}
                >
                  Sign Out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
