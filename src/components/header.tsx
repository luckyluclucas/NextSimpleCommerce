"use client";
import Link from "next/link";
import SearchBar from "@/components/comp-27";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink, NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from "./ui/navigation-menu";

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

    const handleMenuOpening = () => {
        setIsOpen(!isOpen);
    };
    const pathName = usePathname()
    const isHomePage = pathName === "/";

    const menuItens: {
        title: string;
        href: string;
        hasDropDownMenu: boolean;
        subMenu?: { title: string, href: string }[];

    }[] = [
            { title: "Home", href: "/", hasDropDownMenu: false },
            { title: "Products", href: "/product", hasDropDownMenu: false },

            {
                title: "About Us",
                href: "/about",
                hasDropDownMenu: true,
                subMenu: [
                    { title: "Know Our History", href: "" },
                    { title: "Know Where we Are", href: "" },
                ]
            },

            {
                title: "Contact Us",
                href: "/contact",
                hasDropDownMenu: true,
                subMenu: [
                    { title: "WhatsApp", href: "" },
                    { title: "Send an Email", href: "" },
                ]
            }
        ];

    const [isAtTop, setIsAtTop] = useState<boolean>(true)

    useEffect(() => {
        const handleHeaderBG = () => {
            setIsAtTop(window.scrollY < 50)
        }

        window.addEventListener("scroll", handleHeaderBG)
    }, [])
    const router = usePathname()
    return (

        <header className={`${isHomePage && isAtTop ? 'bg-transparent border-transparent' : 'bg-white'} w-full transition-all ease-in-out duration-500 border-b border-primary fixed z-10`}>
            <div className="flex max-w-7xl mx-auto items-center justify-between gap-4 p-1">
                <div className="md:flex flex-1 hidden text-xl grow-2 list-none">
                    <NavigationMenu className="gap-2">
                        <NavigationMenuList>
                            {menuItens.map((menuItem) => (

                                <NavigationMenuItem className={`my-auto hover:scale-[1.08] hover:text-primary hover:font-extrabold rounded-full ease-in-out duration-300 select-none no-drag text-nowrap mx-2 justify-center  font-semibold transition-all`} key={menuItem.href}>
                                    <Link key={menuItem.href} className=" " href={menuItem.href}>
                                        <NavigationMenuTrigger noArrow={!menuItem.hasDropDownMenu} className={`${router === menuItem.href ? 'text-primary' : 'bg-transparent'} rounded-full`}>

                                            <span className="rounded transition-all ease-in-out duration-200 p-2">{menuItem.title}</span>

                                        </NavigationMenuTrigger>
                                    </Link>
                                    {menuItem.hasDropDownMenu ?
                                        <NavigationMenuContent className="w-full rounded-2xl p-2">
                                            <ul className="grid gap-1 rounded-2xl p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                                {menuItem.subMenu?.map((subMenuItem) => (
                                                    <li key={subMenuItem.title} className="">
                                                        <NavigationMenuLink asChild>
                                                            <Link href={subMenuItem.href} className="transition-all duration-200 ease-in-out text-sm hover:bg-primary hover:text-white p-2 rounded justify-start">
                                                                {subMenuItem.title}
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </li>

                                                ))}
                                            </ul>

                                        </NavigationMenuContent> : ''}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex flex-[1.5] justify-center m-auto">
                    <SearchBar>

                    </SearchBar>
                </div>
                <div className=" flex flex-1 gap-4">

                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <button onClick={handleMenuOpening} className={`relative ml-auto justify-end flex h-10 w-10 shrink-0 overflow-hidden border-primary border rounded-full transition-all duration-200 ease-in-out ${isOpen ? 'rounded-full' : 'rounded-full'}`}>
                        {isOpen ? <X size={22} className="text-primary m-auto" /> : <Menu size={22} className=" text-primary m-auto" />}
                    </button>
                </div>
            </div>
        </header >
    );
}