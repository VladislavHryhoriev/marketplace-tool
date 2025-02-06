import Templates from "@/components/shared/templates";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();

  if (!session) redirect("/login");

  return <Templates />;
};

export default Page;
