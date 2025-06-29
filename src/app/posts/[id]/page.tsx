"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { allPostsImages, recentPostsImages } from "../../imageMaps";
import Loader from "@/components/Loader";
import { ErrorDisplay } from "@/components/ErrorHandling";

export default function PostDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchPost();
  }, [id]);

  // Map id to imageSrc using both arrays
  let imageSrc: string | undefined = undefined;
  let author = "Olivia Rhye";
  let date = "Sunday , 1 Jan 2023";
  if (id && typeof id === "string") {
    const postId = parseInt(id, 10);
    if (postId >= 1 && postId <= 4) {
      imageSrc = recentPostsImages[postId - 1];
    } else if (postId >= 5 && postId <= 10) {
      imageSrc = allPostsImages[postId - 5];
    }
  }

  const handleBackToPosts = () => {
    router.push('/');
  };

  if (loading) return <div className="text-center p-8"><Loader/></div>;
  if (error) return <ErrorDisplay message={error} />;
  if (!post) return <div className="text-center p-8">Post not found.</div>;

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={handleBackToPosts}
        className="cursor-pointer mb-6 flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
      >
        <svg 
          className="w-5 h-5 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
        Back to Posts
      </button>

      <div className="mb-2 text-sm text-[#6941C6] font-medium">{date}</div>
      <h1 className="text-4xl font-bold mb-6 text-main leading-tight ">{post.title}</h1>
      {imageSrc && (
        <div className="mb-8 rounded-xl overflow-hidden">
          <img src={imageSrc} alt="Post image" className="w-full object-cover" />
        </div>
      )}
      <p className=" mb-8 text-base leading-relaxed">{post.body}</p>
    </main>
  );
} 