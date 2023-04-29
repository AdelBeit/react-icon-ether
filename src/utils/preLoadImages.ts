/**
 * Returns a URL string to the Simple Icons CDN with the given icon name and color. If the icon is in the fallback list, returns a local path instead.
 * @param icon - the name of the icon to be fetched
 * @param color - the color to be applied to the icon (default is "33FF00")
 * @returns a URL string to the Simple Icons CDN or a local path
 */
export const simpleIconsCDN = (icon: string, color: string = "33FF00") => {
  const fallbackIcons = ["tonejs"];
  if (fallbackIcons.includes(icon)) {
    return `./fallback svg/${icon}.svg`;
  }
  return `https://cdn.simpleicons.org/${icon}/${color}`;
};

/**
 * Preloads images by creating Image objects and dispatching a custom event with the loaded images as details.
 * @param imageLinks - an array of image URLs to be preloaded
 * @param customEventName - the name of the custom event to be dispatched
 */
export default function preLoadImages(
  imageLinks: string[],
  customEventName: string
) {
  const imagePromises = [];

  for (let i = 0; i < imageLinks.length; i++) {
    const img = new Image(30, 30);
    const imagePromise = new Promise((res, rej) => {
      img.onload = function () {
        res(img);
      };
      img.onerror = function () {
        rej(new Error("failed to load image."));
      };
      img.src = imageLinks[i]!;
    });

    imagePromises.push(imagePromise);
  }

  Promise.all(imagePromises).then((images) => {
    const event = new CustomEvent(customEventName, { detail: images });
    document.dispatchEvent(event);
  });
}
