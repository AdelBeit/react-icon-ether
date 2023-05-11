import React, { MouseEvent, useState } from "react";
import "./App.css";
import { IconEther } from "../src/components/IconEther/IconEther";
import { ClockApp } from '../src/ClockButton';

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
    particleColor: "#FFEE00",
    height: "60%",
    width: "60%",
    icons: ETHERICONS,
    dotSize: 2,
  };
  const [renderImages, setRenderImages] = useState(defaults.renderImages);
  const [renderDots, setRenderDots] = useState(defaults.renderDots);
  const [fullScreen, setFullScreen] = useState(defaults.fullScreen);
  const [backgroundColor, setBackgroundColor] = useState(
    defaults.backgroundColor
  );
  const [particleColor, setParticleColor] = useState(defaults.particleColor);
  const [dotSize, setDotSize] = useState<number | undefined>(defaults.dotSize);
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
    setDotSize(defaults.dotSize);
  };

  return (
    <div className="App">
      <div
        style={{ top: position.y, left: position.x }}
        className="form-control absolute z-10 w-64"
        data-theme="cyberpunk"
        onMouseMove={handleMouseMove}
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
            className={`btn ${isDefaultProps && "btn-disabled"
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
                setRenderImages((p) => !p);
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
                setRenderDots((p) => !p);
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
          <label className="input-group">
            <span className="label-text whitespace-nowrap">Dot Size</span>
            <input
              type="range"
              min={2}
              max={10}
              className={`bg-[#fe0] range range-sm self-center`}
              value={dotSize}
              onChange={(e) => {
                setDotSize(e.target.valueAsNumber);
                setRenderDots(true);
                setIsDefaultProps(false);
              }}
            />
          </label>
        </label>
      </div>

      {fullScreen && (
        <div
          className="flex flex-col bg-base-100 gap-1 p-1"
          data-theme="cyberpunk"
        >
          <div className="card bg-base-content">
            <div className="card-body">
              <h2 className="card-title justify-center text-base-100">
                Content
              </h2>
            </div>
          </div>
          <div className="card bg-base-content">
            <div className="card-body">
              <h2 className="card-title justify-center text-base-100">
                Content
              </h2>
            </div>
          </div>
        </div>
      )}
      {fullScreen && (
        <IconEther
          renderDots={renderDots}
          renderImages={renderImages}
          dotSize={dotSize}
          fullScreen={fullScreen}
          backgroundColor={backgroundColor}
          particleColor={particleColor}
          height={defaults.height}
          width={defaults.width}
          icons={defaults.icons}
        />
      )}
      {!fullScreen && (
        <div className="flex flex-col items-center w-fit gap-5 justify-center">
          <div
            className="flex flex-row justify-between w-[80%] bg-base-100 gap-1 p-1"
            data-theme="cyberpunk"
          >
            <div className="card bg-base-content w-1/2">
              <div className="card-body">
                <h2 className="card-title justify-center text-base-100">
                  Never gonna give you up
                </h2>
              </div>
            </div>
            <div className="card bg-base-content w-1/2">
              <div className="card-body">
                <h2 className="card-title justify-center text-base-100">
                  Never gonna let you down
                </h2>
              </div>
            </div>
          </div>
          <IconEther
            renderDots={renderDots}
            renderImages={renderImages}
            dotSize={dotSize}
            fullScreen={fullScreen}
            backgroundColor={backgroundColor}
            particleColor={particleColor}
            height={defaults.height}
            width={defaults.width}
            icons={defaults.icons}
          />
          <div
            className="flex flex-row justify-between w-[80%] bg-base-100 gap-1 p-1"
            data-theme="cyberpunk"
          >
            <div className="card bg-base-content w-1/2">
              <div className="card-body">
                <h2 className="card-title justify-center text-base-100">
                  Never gonna run around
                </h2>
              </div>
            </div>
            <div className="card bg-base-content w-1/2">
              <div className="card-body">
                <h2 className="card-title justify-center text-base-100">
                  and desert you
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
