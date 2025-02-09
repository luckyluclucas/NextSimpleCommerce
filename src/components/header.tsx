"use client";
import Link from "next/link";
import SearchBar from "@/components/comp-27";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink, NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from "./ui/navigation-menu";
import useCart from "@/hooks/useCart";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import ProductCard from "./cardProduct";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSidebar } from "./ui/sidebar";
import { menuItens } from "@/app/configs/MenuItens";
import { useTheme } from "next-themes";


export default function Header() {

    const { setTheme, theme } = useTheme()

    const handleMenuOpening = () => {

        toggleSidebar()

    };
    const pathName = usePathname()

    const isHomePage = pathName === "/";

    const { toggleSidebar, open } = useSidebar()


    const [isAtTop, setIsAtTop] = useState<boolean>(false)

    useEffect(() => {
        const handleHeaderBG = () => {
            setIsAtTop(window.scrollY < 25)
        }

        window.addEventListener("scroll", handleHeaderBG)
    }, [])

    const { cart } = useCart()
    const numberOfProductsOnCart = cart.reduce((total, cartItem) => { return total += cartItem.quantity }, 0)

    const router = usePathname()
    const iconColor = theme === 'dark' ? 'white' : 'hsl(346.8, 77.2%, 49.8%)'

    return (

        <header className={`${isHomePage && isAtTop ? 'bg-transparent border-transparent' : 'bg-white dark:bg-black'} mt-0 p-1 w-full transition-all ease-in-out duration-500 border-b border-accent dar:border-border fixed z-20`}>
            <div className="flex max-w-7xl mx-auto items-center justify-between gap-4 p-1">
                <div className="md:flex flex-start max-w-fit hidden text-xl grow-2 list-none">
                    <Avatar onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <NavigationMenu className="gap-2">
                        <NavigationMenuList>
                            {menuItens.map((menuItem) => (

                                <NavigationMenuItem className={`my-auto hover:scale-[1.08] hover:text-primary hover:font-extrabold rounded-full ease-in-out duration-300 select-none no-drag text-nowrap mx-2 justify-center  font-semibold transition-all`} key={menuItem.href}>
                                    <Link key={menuItem.href} className=" " href={menuItem.href}>
                                        <NavigationMenuTrigger noArrow={!menuItem.hasDropDownMenu} className={`${router === menuItem.href ? 'text-primary' : 'bg-transparent'} rounded-full`}>

                                            <span className="cursor-pointer rounded transition-all ease-in-out duration-200 p-2">{menuItem.title}</span>

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
                <div className=" flex flex-end gap-4">

                    <HoverCard openDelay={40}>

                        <HoverCardTrigger className="flex flex-row" href="/products">
                            <ShoppingCart color={iconColor} fill={`${numberOfProductsOnCart > 0 ? "hsl(346.8, 77.2%, 49.8%)" : "transparent"}`} size={30} className="my-1 ml-1 rotate-y-180 content-end transition-all ease-in-out duration-200" />
                            <div className={`rounded-full w-5 h-5 text-sm flex content-center items-center justify-center m-auto text-white ${numberOfProductsOnCart > 0 ? "bg-primary" : ""} `}>
                                {numberOfProductsOnCart === 0 ? "" : numberOfProductsOnCart}
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent className={`z-20 ${cart.length === 0 ? 'w-fit h-[60px]' : 'h-[400px]'} overflow-auto flex flex-col`}>
                            {cart.length === 0 ? <span className="m-auto">Empty Cart</span> :
                                <ScrollArea className={`z-20 h-[400px] content-center m-auto flex flex-col`}>
                                    <div className="min-h-12">
                                        {cart.map((p) => (<div key={p.product.id}><ProductCard product={p.product} productLink="" /></div>))}
                                    </div>
                                    <ScrollBar orientation="vertical" />
                                </ScrollArea>
                            }
                        </HoverCardContent>

                        <button onClick={handleMenuOpening} className={`relative cursor-pointer ml-auto justify-end flex h-10 w-10 shrink-0 p-0 m-0 overflow-hidden transition-all duration-400 ease-in-out ${open ? 'invisible opacity-0 translate-x-[20px]' : 'translate-x-0 opacity-100'}`}>
                            < Menu size={30} className="transition-all duration-400 ease-in-out  text-primary border-none m-auto" />
                        </button>

                    </HoverCard>

                </div>
            </div>
        </header >
    );
}