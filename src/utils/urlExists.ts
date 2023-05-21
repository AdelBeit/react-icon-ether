import fetch from "isomorphic-fetch";
/**
 * Verifies url exists and has an image.
 * Will triggers CORS in development environment.
 * @param url
 * @returns boolean
 */
async function urlExists(url: string) {
  const response = await fetch(url);
  const contentType = response.headers.get("content-type");
  const isImage = !!contentType?.startsWith("image/");
  return isImage;
  // try {
  //   const response = await fetch(url);
  //   if (response.ok) {
  //     const contentType = response.headers.get("content-type");
  //     const isImage = !!contentType?.startsWith("image/");
  //     return isImage;
  //   } else {
  //     console.error("Error:", response.status);
  //     return false;
  //   }
  // } catch (error) {
  //   console.error("Error:", error);
  //   return false;
  // }
}

export default urlExists;
