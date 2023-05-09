# React Icon Ether

[![license-shield]][license-url] [![linkedin-shield]][linkedin-url] ![size-url] ![size-url2] [![npm-v]][npm-url] [![gh-shield]][gh-url]

[license-shield]: https://img.shields.io/github/license/adelbeit/react-icon-ether.svg
[license-url]: /LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/adel-beitvashahi/
[size-url]: https://img.shields.io/bundlephobia/minzip/react-icon-ether
[size-url2]: https://img.shields.io/bundlephobia/min/react-icon-ether
[npm-v]: https://img.shields.io/npm/v/react-icon-ether
[npm-url]: https://www.npmjs.com/package/react-icon-ether
[gh-shield]: https://img.shields.io/badge/-GitHub-black.svg?logo=github&colorB=555
[gh-url]: https://github.com/adelbeit/react-icon-ether

<br />
<p align="center">
  <a href="https://github.com/adelbeit/react-icon-ether">
    <img src="https://raw.githubusercontent.com/AdelBeit/react-icon-ether/54fd760d827f31ce4211ba745b3aa47e148c02bf/demo/assets/ether.gif" alt="icon Ether" width="80%" >
  </a>

  <p align="center">
    Animated canvas with images and dots that move about and bounce off the bounds.
  </p>
  <p align="center">
    <a href="https://github.com/adelbeit/react-icon-ether/issues">Report Bug</a>
  </p>
</p>

## About

Cyberpunk themed react component. Spawn particles randomly Particles can be images or circles of variuos sizes. Made to occupy the background.

- Built-in support for using [Simple Icons](https://simpleicons.org/) with auto fallback to local images

## Installation

```sh
npm i react-icon-ether
```

## Usage

```tsx
import React from "react";

const icons = ["typescript", "javascript", "nextdotjs", "react"];

const App = () => {
  return (
    <div className="list">
      <IconEther icons={icons} />
      <div>Other content...</div>
    </div>
  );
};

export default App;
```

## Props

| Name             | Default Values | Description                                               |
| ---------------- | -------------- | --------------------------------------------------------- |
| icons\*          | [ ]            | Array of simple-icon icon names to render.                |
| backgroundColor? | "#282828"      | Background color in hexadecimal string format.            |
| particleColor?   | "#33FF00"      | Particle color in hexadecimal hexadecimal string format.  |
| renderImages?    | true           | Determines if the images should be rendered.              |
| renderDots?      | false          | Determines if the dots should be rendered.                |
| fullScreen?      | true           | Determines if the icon should be rendered in full screen. |
| height?          | "100%"         | The height of the icon, in pixels or as a percentage.     |
| width?           | "100%"         | The width of the icon, in pixels or as a percentage.      |
| dotSize?\*       | 2              | Dot particle size, used in tandem with Math.random().     |

###### \* Icons array accepts valid simple-icons icon names. To use non simple-icon icons you must create a local folder

```
1. On the top level of your project folder, reacreate this route: "./public/fallback_icons/\*\*.svg"
2. Make sure your local images are in svg format
3. Pass in your local image filename into the icons array.
   i.e. image: mylocalimage.svg icons: ["mylocalimage"]
```

###### \*\* Image size and particle count are not customizable by design. The sizes and count have been set with performance in mind and to avoid overcrowding the foreground. If you want to change image size or image count you will need to clone this repository and copy over the sources and customize them to your liking.

## Sample Usage

The [demo folder](https://github.com/AdelBeit/react-icon-ether/tree/54fd760d827f31ce4211ba745b3aa47e148c02bf/demo) is a sample react app that uses it. Just clone this repo and run

```sh
yarn && yarn dev
```

You can also see this component in action [here](https://adelbeit.com)

## Technologies

- Typescript
- React
- Simple Icons

## Challenges

This project was inspired by the matrix rain animation.

### 1. Dyanmically creating images and fetching them from a url for use in canvas

```
Create an image in JS, use a promise to asyncronously load the image from its src
```

```js
function loadImage(url: string): Promise<HTMLImageElement> {
  const img = new Image(30, 30);
  return new Promise((res, rej) => {
    img.onload = () => res(img);
    img.onerror = () => rej(new Error("Failed to load " + url));
    img.src = url;
  });
}
```

> Checkout [this](/src/utils/preLoadImages.ts) file for more details.

### 2. Loading those images into canvas

```
1. Compile an array of image promises as you create them. Then use Promise.all() to load all images as html image objects in an array.

2. For each image object, use the canvas context to draw those images onto canvas.
```

> [CanvasRenderingContext2D.drawImage()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)

> Checkout [this](/src/components/IconEther/IconEther.tsx) file for more details.

### 3. Creating a fallback mechanism for non simple-icons icons

```
1. Fetch a url before using it as an img src
2. Check response headers of fetch call and make sure 'content-type' headers start with 'image/'
```

```js
const response = await fetch(url);
const contentType = response.headers.get("content-type");
const isImage = !!contentType?.startsWith("image/");
```

### 4. Publishing to npm, adding typescript and other modules

```
Use Vite or other alternatives that come with hot reload, easy package bundling, local test server, etc... to develop your component.

Then make sure to include only the necessary src files for distribution through package.json and tsconfig.json, and exclude any unnecessary files before publishing to npm.
```

## Optimizations

- useRef for particle arrays to avoid reinitializing them every time, used in tandem with prop change useEffects for more finetuned control between rerenders.

- Create breakpoints for number of particles on different screen sizes to maximize performance and presentation.

- Prevent image particle color changes during hot reload to minimize network calls. particleColor prop can still be used to set image color on initial load.

## Takeaways

- useEffect is used to manage sideeffects as they happen. Events happen and are managed with event listeners. Effects happen as a result of events and are managed by 'effect' listeners.

- useRef can and should be used for things that shouldn't cause a component rerender.

## Other Projects

- ### [Portfolio](https://adelbeit.com)

## Planned Features

- Blurred movement effect in direction of scroll on window scroll

- Different movement patterns

  - Particle 'blinking' or teleporting around.
  - Particle dashing around with eased timing.
  - Particles moving in figure 8 or 3d electron shells

- Different bounding box collision behaviors
