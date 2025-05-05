import { Button } from "@/components/ui/button";
import { signOutAction } from "@/utils/supabase/actions";
import { createClientOnServer } from "@/utils/supabase/server";

const Dashboard = async () => {
  const supabase = await createClientOnServer();
  const { data, error } = await supabase.auth.getUser();
  return (
    <div>
      <p className="">Hello {data?.user?.email ?? "User"}</p>
      {/* <Button onClick={signOutAction}>Logout</Button> */}
    </div>
  );
};

export default Dashboard;
