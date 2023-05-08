import { MouseEvent, useState } from "react";
import "./App.css";
import { IconEther } from "./components/IconEther/IconEther";

const ETHERICONS = [
  "typescript",
  "javascript",
  "nextdotjs",
  "react",
  "nodedotjs",
  "express",
  "socketdotio",
  "html5",
  "css3",
  "git",
  "github",
  "figma",
  "yarn",
  "npm",
  "docker",
  "amazonaws",
  "graphql",
  "netlify",
  "vercel",
  "svelte",
  "python",
  "mysql",
  "digitalocean",
  "mongodb",
  "postgresql",
  "microsoftazure",
  "googlecloud",
  "heroku",
  "pnpm",
  "visualstudiocode",
  "bootstrap",
  "gitlab",
  "bitbucket",
  "android",
  "androidstudio",
  "swift",
  "mui",
  "jira",
  "arduino",
  "php",
];

function App() {
  const defaults = {
    renderImages: true,
    renderDots: true,
    fullScreen: true,
    backgroundColor: "#282828",
    particleColor: "#33FF00",
    height: "100%",
    width: "100%",
    icons: ETHERICONS,
  };
  const [renderImages, setRenderImages] = useState(defaults.renderImages);
  const [renderDots, setRenderDots] = useState(defaults.renderDots);
  const [fullScreen, setFullScreen] = useState(defaults.fullScreen);
  const [backgroundColor, setBackgroundColor] = useState(
    defaults.backgroundColor
  );
  const [particleColor, setParticleColor] = useState(defaults.particleColor);
  const [height, setHeight] = useState(defaults.height);
  const [width, setWidth] = useState(defaults.width);
  const [icons, setIcons] = useState(defaults.icons);
  const [isDefaultProps, setIsDefaultProps] = useState(true);

  // dragging state
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event: MouseEvent<HTMLElement>) => {
    setDragging(true);
    const offsetX = event.clientX - position.x;
    const offsetY = event.clientY - position.y;
    setOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (dragging) {
      const newX = event.clientX - offset.x;
      const newY = event.clientY - offset.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const restoreDefaults = () => {
    setIsDefaultProps(true);
    setBackgroundColor(defaults.backgroundColor);
    setParticleColor(defaults.particleColor);
    setRenderImages(defaults.renderImages);
    setRenderDots(defaults.renderDots);
    setFullScreen(defaults.fullScreen);
  };

  return (
    <div className="App">
      <div
        onMouseMove={handleMouseMove}
        style={{ top: position.y, left: position.x }}
        className="form-control absolute z-10 w-64"
        data-theme="cyberpunk"
      >
        <label className="label btn-group p-0">
          <span className="label-text btn-group gap-2 items-center">
            <button
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className="btn hover:bg-inherit btn-ghost btn-xs btn-square p-0 m-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
            </button>
            Settings
          </span>
          <button
            className={`btn ${
              isDefaultProps && "btn-disabled"
            } btn-ghost btn-xs btn-square p-0 m-0`}
            onClick={() => restoreDefaults()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
              />
            </svg>
          </button>
        </label>
        <label className="input-group input-group-vertical">
          <label className="input-group">
            <span className="label-text w-full">Render Images</span>
            <input
              type="checkbox"
              onChange={() => {
                setRenderImages(!renderImages);
                setIsDefaultProps(false);
              }}
              checked={renderImages}
              className="checkbox"
            />
          </label>
          <label className="input-group">
            <span className="label-text w-full">Render Dots</span>
            <input
              type="checkbox"
              onChange={() => {
                setRenderDots(!renderDots);
                setIsDefaultProps(false);
              }}
              checked={renderDots}
              className="checkbox"
            />
          </label>
          <label className="input-group">
            <span className="label-text w-full">Fullscreen</span>
            <input
              type="checkbox"
              onChange={() => {
                setFullScreen(!fullScreen);
                setIsDefaultProps(false);
              }}
              checked={fullScreen}
              className="checkbox"
            />
          </label>
          <label className="input-group">
            <span className="label-text w-full">Background Color</span>
            <input
              type="color"
              className={`w-[28px] h-[28px] bg-[#fe0]`}
              value={backgroundColor}
              onChange={(e) => {
                setBackgroundColor(e.target.value);
                setIsDefaultProps(false);
              }}
            />
          </label>
          <label className="input-group">
            <span className="label-text w-full">Particle Color</span>
            <input
              type="color"
              className={`w-[28px] h-[28px] bg-[#fe0]`}
              value={particleColor}
              onChange={(e) => {
                setParticleColor(e.target.value);
                setRenderDots(true);
                setIsDefaultProps(false);
              }}
            />
          </label>
          <label
            className="input-group tooltip"
            data-tip="disabled feature, see github issues"
          >
            <span className="label-text w-full">
              <s className="">Image Size</s>
            </span>
          </label>

          <label
            className="input-group tooltip"
            data-tip="disabled feature, see github issues"
          >
            <span className="label-text w-full">
              <s className="">Icons List</s>
            </span>
          </label>
        </label>
      </div>

      <IconEther
        renderDots={renderDots}
        renderImages={renderImages}
        fullScreen={fullScreen}
        backgroundColor={backgroundColor}
        particleColor={particleColor}
        height={height}
        width={width}
        icons={icons}
      />
    </div>
  );
}

export default App;
