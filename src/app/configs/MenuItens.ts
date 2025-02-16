import { MenuItens } from "../types/MenuItensType";

export const menuItens: MenuItens[] = [
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
    },
];