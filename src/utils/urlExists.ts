/**
 * Verifies url exists and has an image.
 * Will triggers CORS in development environment.
 * @param url
 * @returns boolean
 */
async function urlExists(url: string) {
  const response = await fetch(url);
  const contentType = response.headers.get('content-type');
  const isImage = !!contentType?.startsWith('image/');
  return isImage;
}

export default urlExists;
