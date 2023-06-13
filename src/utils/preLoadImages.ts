// import { urlExists } from "./index";

/**
 * TODO: fix url exists
 * Returns a URL string to the Simple Icons (SI) CDN with the given icon name and color.
 * Icon name must match SI icon name, if name doesn't match SI or doesn't exist on SI, the fallback folder is checked for icon with exact name.
 * Fallback icons folder must be structure like so: [project root dir]/public/fallback_icons/*.svg
 * @param icon - the name of the icon to be fetched (must match simpleicons name)
 * @param color - the hex color of the icon
 * @param localPath Path to locally stored Icons. When provided, this disables SimpleIcons CDN fetching
 * @returns a URL string to the Simple Icons CDN or a local path
 */
export async function simpleIconsCDN(
  icon: string,
  color: string = "#33FF00",
  localPath: string = ""
) {
  color = color.replace("#", "");
  const simpleIconsCDN = `https://cdn.simpleicons.org/${icon}/${color}`;
  let path = simpleIconsCDN;
  if (localPath.length > 0) {
    const endsWithSlash = /\/$/;
    const endsWithSVG = /\.svg$/;
    path =
      localPath.replace(endsWithSlash, "") +
      "/" +
      icon.replace(endsWithSVG, ".svg") +
      ".svg";
  }
  return path;
}

/**
 * Preloads images by creating Image objects
 * @param iconNames - an array of icon names to be preloaded
 * @param localPath Path to locally stored Icons. When provided, this disables SimpleIcons CDN fetching
 * @returns an array of Image objects
 */
export async function preLoadImages(
  iconNames: string[],
  color: string = "",
  localPath: string = ""
) {
  const URLs = iconNames.map(name => simpleIconsCDN(name, color, localPath));
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
