
import { auth } from "@/auth";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
export default function UserAvatar() {
    const { data: session } = useSession();

    if (session) {
        return (<Avatar >

            <AvatarImage src={session.user?.image ?? "https://avatars.githubusercontent.com/luckyluclucas"} >
            </AvatarImage>
            <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>)
    }

    return (

        <Link href={"/signIn"}>
            <Avatar >

                <AvatarImage src="https://avatars.githubusercontent.com/luckyluclucas" >
                </AvatarImage>
                <AvatarFallback></AvatarFallback>
            </Avatar>
        </Link>)
}
