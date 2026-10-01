import { auth } from "@/lib/auth";

const Page = async () => {
  const session = await auth();
    console.log(session)
  return (
    <div className="mt-[80px]">
      <h1>Profile</h1>

      <p>Name: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
    </div>
  );
};

export default Page;