"use client";
import { useEffect, useState, useRef } from "react";
import PostCard, { Post } from "@/components/PostCard";
import PaginationFooter from "@/components/PaginationFooter";
import Loader from "@/components/Loader";
import { allPostsImages } from "./imageMaps";
import { ErrorDisplay } from "@/components/ErrorHandling";

function RecentPosts({ posts }: { posts: Post[] }) {
  const featuredPost = posts[0];
  const verticalPosts = posts.slice(1, 3);
  const bottomFeaturedPost = posts[3];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-main">Recent blog posts</h2>
      <div className="lg:flex  gap-8">
        <div className="w-full lg:w-1/2 flex-shrink-0">{featuredPost && <PostCard post={featuredPost} isFeatured />}</div>
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          {verticalPosts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              isVertical
              imageSrc={index === 0 ? "/recents/RecentBlogVerticalOne.svg" : "/recents/RecentBlogVerticalTwo.svg"}
            />
          ))}
        </div>
      </div>
      <div className="w-full my-6 flex-shrink-0">{bottomFeaturedPost && <PostCard post={bottomFeaturedPost} imageSrc="/recents/bottomRecent.svg" isHorizontal />}</div>
    </section>
  );
}

function AllPosts({ posts }: { posts: Post[] }) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-main">All blog posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <PostCard
            key={post.id}
            post={post}
            imageSrc={allPostsImages[idx]}
          />
        ))}
      </div>
    </section>
  );
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 6;
  const allPostsRef = useRef<HTMLDivElement>(null);

  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data: Post[] = await res.json();
      setPosts(data);
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (page > 1 && allPostsRef.current) {
      allPostsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  if (loading) return <div className="text-center p-8"><Loader /></div>;
  if (error) return <ErrorDisplay message={error}  />;

  const recent = posts.slice(0, 4);
  const start = 4 + (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const all = posts.slice(start, end);
  const totalPages = Math.ceil((posts.length - 4) / POSTS_PER_PAGE);

  return (
    <main className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
      <RecentPosts posts={recent} />
      <div ref={allPostsRef}>
        <AllPosts posts={all} />
      </div>
      <PaginationFooter current={page} total={totalPages} onPageChange={setPage} />
    </main>
  );
} 