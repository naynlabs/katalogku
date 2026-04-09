import ImageKit from "imagekit";

// Server-side ImageKit instance — ONLY use in Server Actions or API Routes
export const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

/**
 * Generate authentication parameters for client-side upload
 * Call this from a Server Action or API Route, then pass to client
 */
export function getImageKitAuthParams() {
  return imagekit.getAuthenticationParameters();
}
