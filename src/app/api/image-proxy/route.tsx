import {getUrlParams} from "@/api/lib/utils/main.util.api";

const ALLOWED_HOSTNAMES = [
  "image.tmdb.org",
  "images.igdb.com",
  "s4.anilist.co",
  "upload.wikimedia.org",
];

export const GET = async (_request: Request) => {
  const params = getUrlParams(_request.url);

  if (params?.url && typeof params.url === "string") {
    try {
      const requestedURL = new URL(params.url.trim());

      const requestedHostname = requestedURL.hostname;

      const isAllowed = ALLOWED_HOSTNAMES.some((allowedURL) => {
        return requestedHostname.startsWith(allowedURL);
      });

      if (isAllowed) {
        const imageResponse = await fetch(requestedURL.href);

        if (imageResponse.ok) {
          const imageData = await imageResponse.arrayBuffer();

          return new Response(imageData, {
            status: 200,
            headers: {
              "cache-control": "public, max-age=31919000",
              etag: imageResponse.headers.get("etag") || "",
              "last-Modified": imageResponse.headers.get("last-modified") || "",
              "content-type": imageResponse.headers.get("content-type") || "",
            },
          });
        }

        console.info(
          `ImageProxy: Failed to fetch image. Url: ${requestedURL.href} | Status: ${imageResponse.status}`,
        );
        return new Response("Failed to fetch image", {status: imageResponse.status});
      }

      console.info("ImageProxy: URL is not allowed:", requestedURL.href);
      return new Response("", {status: 406});
    } catch (error) {
      console.info("ImageProxy: Invalid URL:", params.url);
      return new Response("", {status: 406});
    }
  } else {
    console.info("ImageProxy: Invalid or missing URL parameter", params);
    return new Response("Invalid or missing URL parameter", {status: 406});
  }
};
