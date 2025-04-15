import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function UserAvatar() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Link href="/">
        <Avatar>
          <AvatarImage
            src={
              session.user?.image ??
              "https://avatars.githubusercontent.com/luckyluclucas"
            }
          ></AvatarImage>
          <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </Link>
    );
  }

  return (
    <>
      <HoverCard openDelay={50} closeDelay={250}>
        <HoverCardTrigger asChild>
          <Link href="/signIn">
            <Avatar className="bg-gray-800">
              <AvatarImage
                className="animate-pulse"
                src="https://avatars.githubusercontent.com/luckyluclucas"
              ></AvatarImage>
              <AvatarFallback>Sign In</AvatarFallback>
            </Avatar>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="w-fit h-fit p-2 rounded text-sm leading-none font-normal text-center">
          <p>
            <Link href="/signIn">sign in | sign up </Link>
          </p>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
