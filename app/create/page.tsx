import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CreatePostForm from "./CreatePostFrom";

const Page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <CreatePostForm />;
};

export default Page;