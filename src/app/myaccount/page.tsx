import "server-only";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile/page";
import { AdminDashboard } from "../dashboard/adminDashboard";

export default async function MyAccountPage() {
  const session = await auth();

  if (!session) {
    return redirect("/signIn");
  }

  if (session.user?.role === "admin") {
    return (
      <div className="space-y-6 mx-auto">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator className="dark:bg-[#242427] w-full" />
        <ProfileForm />
        <h1> ONLY ADMINS CAN SEE IT</h1>
      </div>
    );
  }

  const user = session.user?.name;
  return (
    <div className="space-y-6 mx-auto">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator className="dark:bg-[#242427] w-full" />
      <ProfileForm username={user} />
    </div>
  );
}
