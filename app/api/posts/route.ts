import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import User from "@/models/user";
import { auth } from "@/lib/auth";

// GET /api/posts — list all posts
export async function GET() {
  try {
    await dbConnect();

    const posts = await Post.find().sort({ createdAt: -1 });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch posts ${error}` },
      { status: 500 }
    );
  }
}

// POST /api/posts — uploads the image to Cloudinary, then creates the post
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // 1. Get the currently logged-in user
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to create a post" },
        { status: 401 }
      );
    }

    // 2. Find that user in MongoDB
    const user = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return NextResponse.json(
        { error: "User account not found" },
        { status: 404 }
      );
    }

    // 3. Get the submitted form data
    const formData = await req.formData();

    const file = formData.get("coverImage") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "A cover image is required" },
        { status: 400 }
      );
    }

    // 4. Convert image to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5. Upload image to Cloudinary
    const uploadResult: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "blog-posts" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result as UploadApiResponse);
              }
            }
          )
          .end(buffer);
      }
    );

    // 6. Create the post
    const post = await Post.create({
      title: formData.get("title"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      coverImage: uploadResult.secure_url,
      category: formData.get("category"),

      // IMPORTANT:
      // We get the author from the authenticated user,
      // not from the browser.
      author: user._id,

      published: formData.get("published") === "true",
    });

    // 7. Return the created post
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create post";

    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}