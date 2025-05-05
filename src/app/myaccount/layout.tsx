import "server-only";
import { Metadata } from "next";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidenavBar";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "settings",
  description: "account settings",
  robots: {
    index: false, // Não indexar esta página
    follow: true, // Permite seguir os links da página (pode ser false também)
    nocache: true, // Opcional: Não armazenar em cache
    googleBot: {
      // Diretivas específicas para o Google (opcional)
      index: false,
      follow: false,
      noimageindex: true, // Não indexar imagens nesta página
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/myaccount",
  },
  {
    title: "Account",
    href: "/myaccount/account",
  },
  {
    title: "Appearance",
    href: "/myaccount/appearance",
  },
  {
    title: "Notifications",
    href: "/myaccount/notifications",
  },
  {
    title: "Orders",
    href: "/myaccount/orders",
  },
];

const sidebarAdminItems = [
  {
    title: "Admin Dashboard",
    href: "/dashboard",
  },
  {
    title: "Create / Update / Delete new products",
    href: "/dashboard/products/crud",
  },
  {
    title: "List all users",
    href: "/dashboard/users",
  },
  {
    title: "List all products",
    href: "/dashboard/products",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const session = await auth();

  if (!session) {
    return;
  }

  if (session.user?.role === "admin") {
    return (
      <>
        <div className="md:hidden"></div>
        <div className="mt-24 rounded-xl mx-auto my-auto w-full border-[1px] max-h-fit mb-8 max-w-7xl space-y-6 p-10 pb-16 md:block">
          <div className="space-y-0.5">
            <h2 className="text-3xl py-2 font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground text-xl">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <Separator className="my-6 dark:bg-[#242427]" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
              <Separator className="my-2" />
              <h1 className="my-4 text-xl p-2 rounded-lg">Admin Options</h1>
              <Separator />
              <SidebarNav items={sidebarAdminItems}></SidebarNav>
            </aside>
            <div className="px-12 flex-1">{children}</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="md:hidden"></div>
      <div className="mt-24 rounded-xl mx-auto my-auto w-full border-[1px] max-h-fit mb-8 max-w-7xl hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-3xl py-2 font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground text-xl">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6 dark:bg-[#242427]" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="px-12 flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
