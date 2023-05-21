import urlExists from "./urlExists";

/**
 * Returns a URL string to the Simple Icons (SI) CDN with the given icon name and color.
 * Icon name must match SI icon name, if name doesn't match SI or doesn't exist on SI, the fallback folder is checked for icon with exact name.
 * Fallback icons folder must be structure like so: [project root dir]/public/fallback_icons/*.svg
 * @param icon - the name of the icon to be fetched (must match simpleicons name)
 * @param color - the hex color of the icon
 * @returns a URL string to the Simple Icons CDN or a local path
 */
export async function simpleIconsCDN(icon: string, color: string = "#33FF00") {
  color = color.replace("#", "");
  const simpleIconsCDN = `https://cdn.simpleicons.org/${icon}/${color}`;
  if (await urlExists(simpleIconsCDN)) return simpleIconsCDN;

  const fallbackURL = `./fallback_icons/${icon}.svg`;
  if (await urlExists(fallbackURL)) return fallbackURL;

  const event = new CustomEvent("IconLoadFailed", { detail: icon });
  document.dispatchEvent(event);
  return "";
}

/**
 * Preloads images by creating Image objects
 * @param iconNames - an array of icon names to be preloaded
 * @returns an array of Image objects
 */
export async function preLoadImages(
  iconNames: string[],
  color: string = "#33ff00"
) {
  const URLs = iconNames.map(i => simpleIconsCDN(i, color));

  return Promise.all(URLs.map(async url => loadImage(await url)));
}

function loadImage(url: string): Promise<HTMLImageElement> {
  const img = new Image(30, 30);
  return new Promise((res, rej) => {
    img.onload = () => res(img);
    img.onerror = () => rej(new Error("Failed to load " + url));
    img.src = url;
  });
}
