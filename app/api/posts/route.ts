import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";


// GET /api/posts — list all posts
export async function GET() {
  try {
    await dbConnect();

    const posts = await Post.find().sort({ createdAt: -1 });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch posts ${error}` }, { status: 500 });
  }
}

// POST /api/posts — uploads the image to Cloudinary, then creates the post
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const file = formData.get("coverImage") as File | null;

    if (!file) {
      return NextResponse.json({ error: "A cover image is required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
  cloudinary.uploader
    .upload_stream({ folder: "blog-posts" }, (error, result) => {
      if (error) reject(error);
      else resolve(result as UploadApiResponse);
    })
    .end(buffer);
});

    const post = await Post.create({
      title: formData.get("title"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      coverImage: uploadResult.secure_url,
      category: formData.get("category"),
      author: formData.get("author"),
      published: formData.get("published") === "true",
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create post";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}