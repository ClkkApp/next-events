import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Banner from "@/components/events/Banner";
import ScheduleOne from "@/components/events/ScheduleOne";

export default async function ProtectedPage() {
  // const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/sign-in");
  // }

  return (
    <div className="flex flex-col space-y-16">
      <Banner />
      <ScheduleOne />
    </div>
  );
}
