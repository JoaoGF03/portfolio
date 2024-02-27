import { SignedIn, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button, buttonVariants } from "~/components/ui/button"
import { checkUser, cn } from "~/lib/utils"
import { Logo } from "../../../components/logo"
import { ToggleTheme } from "~/components/toggle-theme"
import {
  GitHubLogoIcon,
  HamburgerMenuIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons"
import { ToggleLocale } from "~/components/toggle-locale"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"

export async function Header() {
  const isMe = await checkUser()

  return (
    <header className="sticky top-0 flex w-full border-b border-neutral-400 bg-white dark:border-slate-500 dark:bg-black">
      <div className="container flex py-2">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="flex flex-1 justify-end space-x-4">
          <MobileMenu />
          <nav className="hidden items-center space-x-1 sm:flex">
            <SignedIn>
              {isMe && (
                <Link href="/settings">
                  <Button variant="link">Settings</Button>
                </Link>
              )}
              {/* Send to refetch, which is doesn't exist, to force a new fetch, so the util 'checkUser' works */}
              <UserButton afterSignOutUrl="/refetch" />
              <span className="w-1" />
            </SignedIn>

            <Link
              href="https://www.linkedin.com/in/joaogfonseca"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                size: "icon",
                variant: "ghost",
              })}
            >
              <LinkedInLogoIcon className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>

            <Link
              href="https://github.com/JoaoGF03"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                size: "icon",
                variant: "ghost",
              })}
            >
              <GitHubLogoIcon className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>

            <ToggleTheme />

            <ToggleLocale />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default async function MobileMenu() {
  const isMe = await checkUser()

  return (
    <Popover>
      <PopoverTrigger className="block sm:hidden" asChild>
        <Button
          aria-label="Open menu"
          id="mobile-menu"
          size="icon"
          variant="ghost"
        >
          <HamburgerMenuIcon className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-full p-4" side="bottom">
        <nav className="flex flex-col space-y-2">
          <Link
            href="https://www.linkedin.com/in/joaogfonseca"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "flex w-full justify-start space-x-2",
            )}
          >
            <LinkedInLogoIcon className="h-6 w-6" />
            <span>LinkedIn</span>
          </Link>

          <Link
            href="https://github.com/JoaoGF03"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "flex w-full justify-start space-x-2",
            )}
          >
            <GitHubLogoIcon className="h-6 w-6" />
            <span>GitHub</span>
          </Link>

          <div className="flex justify-between px-2">
            <ToggleTheme />

            <ToggleLocale />
          </div>

          <SignedIn>
            {/* Send to refetch, which is doesn't exist, to force a new fetch, so the util 'checkUser' works */}
            <div className="pl-4">
              <UserButton afterSignOutUrl="/refetch" />
            </div>
            {isMe && (
              <Link href="/settings">
                <Button variant="link">Settings</Button>
              </Link>
            )}
          </SignedIn>
        </nav>
      </PopoverContent>
    </Popover>
  )
}
