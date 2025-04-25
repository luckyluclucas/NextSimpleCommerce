export type MenuItens = {
  title: string;
  href: string;
  hasDropDownMenu: boolean;
  subMenu?: {
    title: string;
    href: string;
  }[];
  hasFunction?: boolean;
};
