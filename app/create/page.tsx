'use client'

import { ImagePlus } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const Page = () => {
    const categoryList: string[] = ["Technology", "Design", "Business"];

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState(categoryList[0]);
    const [published, setPublished] = useState(true);
    

    const handleDraft = (e: React.MouseEvent<HTMLButtonElement>)  => {
        e.preventDefault();
        setPublished(false);
    }
    
    const handleFile = (selected: File) => {
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
        console.log(URL.createObjectURL(selected));
        console.log('from the handle file')

    }

    const handleFileInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            handleFile(selected);
            console.log('from the handlefileinputimage');
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        const dropped = e.dataTransfer.files?.[0];
        if (dropped) {
            handleFile(dropped);
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
    }

    const handleIosButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPublished(!published);
        console.log('handleIosButton was clicked');
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        /* console.log(`${title} ${excerpt} ${content} ${category} ${published} ${file}`); */

        if (!file) {
            setError("Please select a cover image.");
            return;
        }
        const AUTHOR_PLACEHOLDER_ID = "654a0e1f2b3c4d5e6f7a8b9c";
 
        const formData = new FormData();
        formData.append("title", title);
        formData.append("excerpt", excerpt);
        formData.append("content", content);
        formData.append("category", category);
        formData.append("published", String(published));
        formData.append("author", AUTHOR_PLACEHOLDER_ID);
        formData.append("coverImage", file);
        console.log(formData);

        setSubmitting(true);
        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                body: formData,
            });
 
            const data = await res.json();
 
            if (!res.ok) {
                setError(data.error || "Something went wrong creating the post.");
                return;
            }
 
            // success — post was created, data holds the saved document
            setTitle("");
            setExcerpt("");
            setContent("");
            setCategory(categoryList[0]);
            setPublished(true);
            setFile(null);
            setPreview(null);
        } catch (err) {
            setError(`Could not reach the server. Try again. ${err}`);
        } finally {
            setSubmitting(false);
        }
    }
    
  return (
    <section className='mt-[80px] h-[100vh] border-2 border-black flex justify-center items-center '>
        
        <form onSubmit={handleSubmit} className='p-4 w-150 h-auto flex justify-center items-start flex-col gap-4 shadow-[var(--create-shadow)] rounded-lg'>
            <div className='w-full flex justify-between items-center '>
                <div>
                    <p className='text-sm'>new post</p>
                    <h2 className='text-2xl font-bold'>create post</h2>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <button  onClick={handleDraft} type="button" className='px-3 py-2 border-2 border-black rounded-lg cursor-pointer'>save draft</button>
                    <button  type="submit" className='px-3 py-2 border-2 border-black rounded-lg cursor-pointer'> {submitting ? "publishing..." : "publish"}</button>
                </div>
            </div>
            <label htmlFor="uploadimage" onDrop={handleDrop} onDragOver={handleDragOver} className='border-2 border-black cursor-pointer w-full h-48 border-dashed flex justify-center items-center flex-col'>
                { 
                    !preview ? 
                        <div className="w-10 h-10 rounded-full flex justify-center items-center bg-blue-200 text-blue-700">
                            <ImagePlus />
                        </div> : 
                        <div className="border-2 border-black w-30 h-30 rounded-full">
                            <Image
                                src={preview} 
                                alt="Cover preview"
                                width={100}
                                height={100}
                                unoptimized
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                
                }
                {
                    !preview ? 
                    <div className="flex justify-center items-center flex-col">
                        <h3 className="font-bold text-base">add a cover image</h3>
                        <p className="text-xs text-grey-200">drag & drop or tap to browse</p>
                    </div>
                    :
                    <div></div>
                }
                <input 
                    id='uploadimage'
                    type="file" 
                    accept="image/*" 
                    required
                    className='border-2 border-black opacity-0 cursor-pointer'  
                    onChange={handleFileInputImage}
                />
            </label>
            {error && (
                <p className="text-red-500">
                    {error}
                </p>
            )}
            <input 
                type="text" 
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                placeholder="post title"  
                className="border-b-2 border-[#797878] w-full shadow-[var(--create-input-shadow)] p-5 font-bold text-xl rounded-lg" 
            />
            <input 
                type="text" 
                value={excerpt}
                required
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="add a short excerpt..." 
                className="border-b-2 border-[#797878] w-full shadow-[var(--create-input-shadow)] p-5 font-bold text-base rounded-lg"
            />
            <textarea 
                value={content}
                required
                onChange={(e) => setContent(e.target.value)}
                placeholder="tell your story..." 
                rows={7} 
                className="border-b-2 border-[#797878] w-full shadow-[var(--create-input-shadow)] p-5 font-bold text-base rounded-lg" 
            />

            <div className="w-full flex justify-between items-center ">
                <div className=" p-2 flex justify-center items-center gap-3">
                    {categoryList.map((cat) => (
                        <button
                            type="button"
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={
                            cat === category
                                ? "bg-black text-white text-sm px-3 py-2 rounded-md cursor-pointer"
                                : "bg-transparent border-2 border-black text-gray-600 cursor-pointer font-bold text-sm px-3 py-1.5 rounded-md"
                            }
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="p-3 flex justify-center items-end flex-col">
                    <h5 className="text-xs font-medium">visibility</h5>
                    <div className="flex justify-center items-center gap-2">
                        <h5 className="text-base font-semibold">{published ? 'published' : 'draft'}</h5>
                        <button onClick={handleIosButton}  className={!published ? `w-12 h-5 cursor-pointer rounded-lg bg-blue-300 flex justify-start items-center ` : `w-12 h-5 rounded-lg cursor-pointer bg-blue-300 flex justify-end items-center `}>
                            <div className="w-5 h-5 rounded-full bg-blue-600"></div>
                        </button>
                    </div>
                </div>
            </div>
            
        </form>
    </section>
  )
}

export default Page