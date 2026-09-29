import Image from "next/image";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

function timeAgo(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const hours = Math.floor(seconds / 3600);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  await dbConnect();
  const post = await Post.findById(id);

  if (!post) {
    notFound();
  }

  return (
    <section className="mt-[80px] p-6 w-full h-auto flex justify-center align-center ">
        <div className=" w-[700px] flex justify-center align-center flex-col gap-6">
            <div className="w-full h-[500px]">
                {post.coverImage ? (
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={700}
                        height={500}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    ) : (
                    <div className="w-full h-full bg-gray-100 rounded-lg" />
                )}
            </div>

            <h3 className="border-2 border-[var(--dim)] w-[100px] p-1 rounded-lg text-center">{post?.category}</h3>
            
            <div>
                <h1 className="text-3xl font-bold">{post?.title}</h1>
                <p className="text-sm text-gray-400">{timeAgo(post?.createdAt)}</p>
            </div>
            <p className="text-base leading-relaxed whitespace-pre-line">{post?.content}</p>
        </div>
    </section>
  );
};

export default Page;