import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-1 w-5 h-5 transition-transform group-hover:translate-x-1">
    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PostCard({ post, isFeatured, isVertical, imageSrc, isHorizontal }: { post: Post; isFeatured?: boolean; isVertical?: boolean; imageSrc?: string; isHorizontal?: boolean; }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardMotion = {
    initial: { opacity: 0, y: 60 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 },
    transition: { duration: 0.6, type: "spring" as const, delay: 0.1 },
  };

  if (isFeatured) {
    return (
      <motion.article ref={ref} {...cardMotion} className="bg-transparent bg-card overflow-hidden">
        <div className="bg-zinc-100  flex items-center justify-center">
          <img src={imageSrc || "/recents/RecentBlogLeft.svg"} alt="recent" className="w-full" />
        </div>
        <div className="p-8 flex-1 flex flex-col ">
          <p className="text-sm text-[#6941C6] mb-3">
            <span>Olivia Rhye</span> • <span>1 Jan 2023</span>
          </p>
          <Link href={`/posts/${post.id}`} className="block group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-semibold text-main">
                {post.title}
              </h3>
              <span><ArrowIcon /></span>
            </div>
          </Link>
          <p className="text-gray-400 text-base mb-6 line-clamp-3 flex-grow">{post.body}</p>
          <footer className="flex items-center gap-2 flex-wrap">
            <span className="bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 px-2.5 py-0.5 rounded-full text-sm font-medium">Design</span>
            <span className="bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 px-2.5 py-0.5 rounded-full text-sm font-medium">Research</span>
            <span className="bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-blue-400 px-2.5 py-0.5 rounded-full text-sm font-medium">Presentation</span>
          </footer>
        </div>
      </motion.article>
    );
  }

  if (isVertical) {
    return (
      <motion.article ref={ref} {...cardMotion} className="bg-transparent bg-card overflow-hidden flex flex-row">
        <div className="w-1/2">
          <img src={imageSrc || "/recents/RecentBlogVerticalOne.svg"} alt="recent" className="w-full" />
        </div>
        <div className="w-1/2 p-6 flex flex-col ">
          <p className="text-sm text-[#6941C6] dark:text-b mb-2"><span>Lana Steiner</span> • <span>1 Jan 2023</span></p>
          <Link href={`/posts/${post.id}`} className="block group">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-main">
                {post.title}
              </h3>
              <span><ArrowIcon /></span>
            </div>
          </Link>
          <p className="text-gray-400 dark:text-b text-base mb-4 line-clamp-2">{post.body}</p>
          <footer className="flex items-center gap-2 flex-wrap">
            <span className="bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400 px-2.5 py-0.5 rounded-full text-sm font-medium">Design</span>
            <span className="bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 px-2.5 py-0.5 rounded-full text-sm font-medium">Research</span>
          </footer>
        </div>
      </motion.article>
    );
  }

  // Special horizontal layout for bottom recent post only if isHorizontal is true
  if (isHorizontal && imageSrc) {
    return (
      <motion.article ref={ref} {...cardMotion} className="bg-transparent bg-card overflow-hidden flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 bg-zinc-100  flex items-center justify-center">
          <img src={imageSrc} alt="recent" className="w-full" />
        </div>
        <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
          <p className="text-sm text-[#6941C6]  mb-2">
            <span>Author Name</span> • <span>1 Jan 2023</span>
          </p>
          <Link href={`/posts/${post.id}`} className="block group">
            <h3 className="text-lg font-semibold mb-2 text-main flex items-center">
              {post.title} <ArrowIcon />
            </h3>
          </Link>
          <p className="text-gray-400  text-base mb-4 line-clamp-3 flex-grow">{post.body}</p>
          <footer className="flex items-center gap-2 flex-wrap">
            <span className="bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 px-2.5 py-0.5 rounded-full text-sm font-medium">Design</span>
            <span className="bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 px-2.5 py-0.5 rounded-full text-sm font-medium">Interface</span>
          </footer>
        </div>
      </motion.article>
    );
  }

  // Default column layout for all other posts
  return (
    <motion.article ref={ref} {...cardMotion} className="bg-transparent bg-card overflow-hidden shadow-md flex flex-col h-full transition-shadow duration-300 hover:shadow-lg">
      <div className="bg-zinc-100  flex items-center justify-center">
        {imageSrc ? (
          <img src={imageSrc} alt="recent" className="w-full" />
        ) : (
          <span className="text-gray-400  text-sm">Image </span>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-sm text-[#6941C6]  mb-2">
          <span>Author Name</span> • <span>1 Jan 2023</span>
        </p>
        <Link href={`/posts/${post.id}`} className="block group">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-main">
              {post.title}
            </h3>
            <span><ArrowIcon /></span>
          </div>
        </Link>
        <p className="text-gray-400  text-base mb-4 line-clamp-3 flex-grow">{post.body}</p>
        <footer className="flex items-center gap-2 flex-wrap">
          <span className="bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 px-2.5 py-0.5 rounded-full text-sm font-medium">Leadership</span>
          <span className="bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 px-2.5 py-0.5 rounded-full text-sm font-medium">Management</span>
        </footer>
      </div>
    </motion.article>
  );
} 