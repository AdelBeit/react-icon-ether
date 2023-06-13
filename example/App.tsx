import React from "react";
import "./App.css";
import { IconEther } from "../src/components/IconEther/IconEther";

const ETHERICONS = [
  "typescript",
  "javascript",
  "nextdotjs",
  "react",
  "nodedotjs",
  "socketdotio",
  "html5",
  "css3",
  "github",
  "figma",
  "yarn",
  "npm",
  "auth0",
  "docker",
  "netlify",
  "vercel",
  "amazonaws",
  "d3dotjs",
  "python",
  "svelte",
  "express",
  "mysql",
  "digitalocean",
  "mongodb",
  "git",
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
];

function App() {
  const defaults = {
    renderImages: true,
    renderDots: true,
    backgroundColor: "#282828",
    particleColor: "#FFEE00",
    icons: ETHERICONS,
    dotSize: 2,
    flickerDots: true,
    localPath: "/example/assets/icons/",
  };

  return (
    <div className="App">
      <IconEther
        renderDots={defaults.renderDots}
        renderImages={defaults.renderImages}
        dotSize={defaults.dotSize}
        backgroundColor={defaults.backgroundColor}
        particleColor={defaults.particleColor}
        icons={defaults.icons}
        flickerDots={defaults.flickerDots}
        localPath={defaults.localPath}
      />
      <div
        className="flex flex-col z-10 bg-white gap-1 p-1"
        data-theme="cyberpunk"
      >
        {[...Array(30).fill(0)].map((i, _i) => (
          <div key={_i} className="card bg-primary">
            <div className="card-body">
              <h2 className="card-title justify-center text-black">Content</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
