import { urlExists } from "./urlExists";

/**
 * Returns a URL string to the Simple Icons (SI) CDN with the given icon name and color.
 * Icon name must match SI icon name, if name doesn't match SI or doesn't exist on SI, the fallback folder is checked for icon with exact name.
 * Fallback icons folder must be structure like so: [project root dir]/public/fallback_icons/*.svg
 * @param icon - the name of the icon to be fetched (must match simpleicons name)
 * @param color - the hex color of the icon
 * @returns a URL string to the Simple Icons CDN or a local path
 */
export async function simpleIconsCDN(icon: string, color: string = "33FF00") {
  const simpleIconsCDN = `https://cdn.simpleicons.org/${icon}/${color}`;
  if (await urlExists(simpleIconsCDN)) return simpleIconsCDN;

  const fallbackURL = `./fallback_icons/${icon}.svg`;
  if (await urlExists(fallbackURL)) return fallbackURL;

  const event = new CustomEvent("IconLoadFailed", { detail: icon });
  document.dispatchEvent(event);
  return "";
}

/**
 * Preloads images by creating Image objects and dispatching a custom event with the loaded images as details.
 * @param iconNames - an array of icon names to be preloaded
 * @param customEventName - the name of the custom event to be dispatched
 */
export default async function preLoadImages(
  iconNames: string[],
  customEventName: string
) {
  const URLs = iconNames.map((i) => simpleIconsCDN(i));
  const imagePromises = [];

  for (let i = 0; i < URLs.length; i++) {
    const img = loadImage(await URLs[i]);

    imagePromises.push(img);
  }

  Promise.all(imagePromises).then((images) => {
    const event = new CustomEvent(customEventName, { detail: images });
    document.dispatchEvent(event);
  });
}

function loadImage(url: string) {
  const img = new Image(30, 30);
  return new Promise((res, rej) => {
    img.onload = () => res(img);
    img.onerror = () => rej(new Error("Failed to load " + url));

    img.src = url;
  });
}
