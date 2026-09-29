import Link from "next/link";
import Image from "next/image";
import { MoveRight, Heart, MessageCircle } from "lucide-react";
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

const Latestpost = async ({ showLink = true }: { showLink?: boolean }) => {
  await dbConnect();
  const query = Post.find().sort({ createdAt: -1 });
  const posts = showLink ? await query.limit(6) : await query;

  return (
    <section className="p-8">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">latest posts</h2>
        <Link
          href="/posts"
          className= {showLink ? `text-(--btn-color) text-bold flex justify-center align-center gap-2` : `text-(--btn-color) text-bold flex justify-center align-center gap-2 hidden`}
        >
          view all
          <MoveRight />
        </Link>
      </div>
      <div className="w-full h-auto flex justify-around items-center gap-10 flex-wrap">
        {posts.map((post) => (
          <Link
            key={post._id.toString()}
            href={`/posts/${post._id}`}
            className="p-5 w-[350px] h-auto flex justify-start item-center flex-col gap-4 shadow-[0_3px_10px_#dddcdc] rounded-lg"
          >
            <div className="w-[100%] h-[200px] ">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={500}
                  height={400}
                  unoptimized
                  priority
                  className="w-full h-full object-cover rounded-lg "
                />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-lg" />
              )}
            </div>
            <div className="border-2 border-[var(--dim)]  w-fit px-3 text-bold h-7 flex justify-center items-center rounded-xl ml-3">
              <h5 className="text-[var(--btn-color)] text-sm text-bold">{post.category}</h5>
            </div>
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-base">{post.excerpt}</p>
            <div className="w-full h-auto flex justify-center items-start flex-col gap-3">
              <div className="flex justify-start items-center gap-3">
                <div>
                  {/* author name/avatar will render here once the User model + populate is wired in */}
                  <h5 className="font-bold">Author</h5>
                  <p className="text-xs font-thin text-grey-400">{timeAgo(post.createdAt)}</p>
                </div>
              </div>
              <div className="text-sm flex justify-between items-center w-[150px]">
                <p className="flex justify-center items-center">
                  <Heart size={20} className="text-red-400" />
                  {post.likeCount}
                </p>
                <p className="flex justify-center items-center">
                  <MessageCircle size={20} />
                  {post.commentCount}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Latestpost;