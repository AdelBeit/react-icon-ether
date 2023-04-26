import React, { useEffect } from "react";
import Particle from "../utils/Particle";
import preLoadImages, { simpleIconsCDN } from "../utils/preLoadImages";
// import styles from "./IconEther.module.css";

// TODO: use particlejs instead for animating the particles. there is a bug with variable dx,dy after screen resize events

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

const iconURLS = ETHERICONS.map((i) => simpleIconsCDN(i));

interface Props {
  particlesShouldConnect?: boolean;
  renderImages?: boolean;
  renderDots?: boolean;
}

function IconEther({
  particlesShouldConnect: connect = undefined,
  renderImages: imgs = undefined,
  renderDots: dots = undefined,
}: Props) {
  useEffect(() => {
    if (imgs) preLoadImages(iconURLS, "EtherIconsLoaded");
  }, []);

  useEffect(() => {
    const canvas = document.querySelector("canvas");

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let imgParticles: Particle[] = [];
    let dotParticles: Particle[] = [];
    let imgs: HTMLImageElement[] = [];
    const maxImgs = canvas.width <= 500 ? 10 : canvas.width <= 700 ? 18 : 30;
    const imgSize = canvas.width <= 500 ? 20 : canvas.width <= 700 ? 27 : 30;

    const resizeHandler = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      init();
    };

    const init = () => {
      if (!imgs || !dots) return;

      ctx.clearRect(0, 0, innerWidth, innerHeight);
      imgParticles = [];
      dotParticles = [];
      const dotParticleCount = 20;
      const n = Math.min(imgs.length, maxImgs);
      for (let i = 0; i < n + dotParticleCount; i++) {
        let size = 1 + Math.random() * 2;
        if (i < n) size = (Math.random() * imgSize) / 2.5 + imgSize;
        const x = size * 2 + Math.random() * (innerWidth - size * 4);
        const y = size * 2 + Math.random() * (innerHeight - size * 4);
        const dX = (Math.random() * 2 - 1) / 10;
        const dY = (Math.random() * 2 - 1) / 10;
        const img = i < n ? imgs[i] : null;

        const particle = {
          x: x,
          y: y,
          dX: dX,
          dY: dY,
          size:
            size / (canvas.width <= 500 ? 1.2 : canvas.width <= 700 ? 1.1 : 1),
          img: img,
        };
        if (i < n) imgParticles.push(new Particle(particle));
        else dotParticles.push(new Particle(particle));
      }

      requestAnimationFrame(animate);
    };

    const connect = (particles: Particle[]) => {
      let opacity = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const pA = particles[a];
          const pB = particles[b];
          const dx = pA.x - pB.x;
          const dy = pA.y - pB.y;
          const distance = dx * dx + dy * dy;

          if (distance < (canvas.width * canvas.height) / 49) {
            opacity = 1 - distance / 10000;
            ctx.strokeStyle = `rgba(51, 255, 0, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);

      if (imgs) animateImgParticles();
      if (dots) animateDotParticles();
    };

    const animateImgParticles = () => {
      const n = Math.min(imgParticles.length, maxImgs);
      for (let i = 0; i < n; i++) {
        imgParticles[i].update(ctx);
      }
      if (connect) connect(imgParticles);
    };

    const animateDotParticles = () => {
      for (let i = 0; i < dotParticles.length; i++) {
        dotParticles[i].update(ctx);
      }
      if (connect) connect(dotParticles);
    };

    document.addEventListener("EtherIconsLoaded", (e: CustomEvent) => {
      imgs = e.detail;
      init();
    });

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      document.removeEventListener("EtherIconsLoaded", (e: CustomEvent) => {
        imgs = e.detail;
        init();
      });
    };
  }, []);

  return (
    // <div className={styles._container}>
    <div
      className="_container"
      style={{ margin: "0", padding: "0", boxSizing: "border-box" }}
    >
      <canvas
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: "var(--black)",
          opacity: "0.4",
          zIndex: "0",
        }}
      ></canvas>
      <div
        className="blurred-background absolute"
        style={{ position: "absolute" }}
      ></div>
    </div>
  );
}

export { IconEther };
