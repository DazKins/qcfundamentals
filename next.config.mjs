import { canonicalLinkHeaders } from "./src/util/indexablePages.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return canonicalLinkHeaders();
  },
};

export default nextConfig;
