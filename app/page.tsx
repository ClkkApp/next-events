import Banner from "@/components/events/Banner";
import ScheduleOne from "@/components/events/ScheduleOne";
import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Home() {
  return (
    <>
      <div className="flex flex-col space-y-16">
        <Banner />
        <ScheduleOne />
      </div>
    </>
  );
}
