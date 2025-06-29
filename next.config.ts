import type { NextConfig } from "next";
import { config } from 'dotenv';
import path from 'path';

// Load environment variables from config/.env
config({path:path.resolve('./.env')})



const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
