export const simpleIconsCDN = (icon, color = "33FF00") => {
  const fallbackIcons = ["tonejs"];
  if (fallbackIcons.includes(icon)) {
    return `./fallback svg/${icon}.svg`;
  }
  return `https://cdn.simpleicons.org/${icon}/${color}`;
};

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
      img.src = imageLinks[i];
    });

    imagePromises.push(imagePromise);
  }

  Promise.all(imagePromises).then((images) => {
    const event = new CustomEvent(customEventName, { detail: images });
    document.dispatchEvent(event);
  });
}
