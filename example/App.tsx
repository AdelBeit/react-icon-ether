import React, { MouseEvent, useState } from "react";
import "./App.css";
import { IconEther } from "../src/components/IconEther/IconEther";
// import { ClockApp } from '../src/ClockButton';

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
      <IconEther
        renderDots={renderDots}
        renderImages={renderImages}
        dotSize={dotSize}
        backgroundColor={backgroundColor}
        particleColor={particleColor}
        icons={defaults.icons}
      />
      <div
        className="flex flex-col z-10 bg-white gap-1 p-1"
        data-theme="cyberpunk"
      >
        {[...Array(30).fill(0)].map(i =>
          <div key={i} className="card bg-primary">
            <div className="card-body">
              <h2 className="card-title justify-center text-secondary">
                Content
              </h2>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export default App;
