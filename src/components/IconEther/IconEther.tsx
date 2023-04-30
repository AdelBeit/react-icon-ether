import React, { useEffect } from "react";
import Particle from "../../utils/Particle";
import preLoadImages from "../../utils/preLoadImages";
import "./IconEther.css";
import hexToRGBA from "../../utils/colorRGBA";

interface Props {
  particlesShouldConnect?: boolean;
  renderImages?: boolean;
  renderDots?: boolean;
  backgroundColor?: string;
  particleColor?: string;
  height?: number | string;
  width?: number | string;
  fullScreen?: boolean;
  icons: string[];
}

/**
 * IconEther
 * Renders an Ethereum-inspired animated particle icon.
 * @param backgroundColor Background color in hexadecimal format.
 * @param particleColor Particle color in hexadecimal format.
 * @param particlesShouldConnect Determines if the particles should be connected.
 * @param renderImages Determines if the images should be rendered.
 * @param renderDots Determines if the dots should be rendered.
 * @param fullScreen Determines if the icon should be rendered in full screen.
 * @param height The height of the icon, in pixels or as a percentage.
 * @param width The width of the icon, in pixels or as a percentage.
 * @param icons The name of icons to render.
 * @returns IconEther Component
 */
function IconEther({
  particlesShouldConnect = undefined,
  renderImages = undefined,
  renderDots = undefined,
  fullScreen = true,
  backgroundColor = "#282828",
  particleColor = "#33FF00",
  height = "100%",
  width = "100%",
  icons = [],
}: Props) {
  if (!renderImages && !renderDots) renderImages = true;
  if (height || width) fullScreen = false;
  fullScreen = true;
  height = width = "100%";

  useEffect(() => {
    if (renderImages) preLoadImages(icons, "EtherIconsLoaded");
  }, []);

  useEffect(() => {
    const canvas = document.querySelector("canvas")!;

    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let imgParticles: Particle[] = [];
    let dotParticles: Particle[] = [];
    let imgs: HTMLImageElement[] = []; // prefilled through preLoadImages()
    const maxImgs = canvas.width <= 500 ? 10 : canvas.width <= 700 ? 18 : 30;
    const imgSize = canvas.width <= 500 ? 20 : canvas.width <= 700 ? 27 : 30;

    const resizeHandler = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      init();
    };

    const init = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.fillStyle = hexToRGBA(backgroundColor, 0.6);
      ctx.fillRect(0, 0, innerWidth, innerHeight);

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
        const img = i < n ? imgs[i] : undefined;

        const particle = {
          x: x,
          y: y,
          dX: dX,
          dY: dY,
          size:
            size / (canvas.width <= 500 ? 1.2 : canvas.width <= 700 ? 1.1 : 1),
          img: img,
          color: particleColor,
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
          const pA = particles[a]!;
          const pB = particles[b]!;
          const dx = pA.x - pB.x;
          const dy = pA.y - pB.y;
          const distance = dx * dx + dy * dy;

          if (distance < (canvas.width * canvas.height) / 49) {
            opacity = 1 - distance / 10000;
            ctx.strokeStyle = hexToRGBA(particleColor, opacity);
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

      if (renderImages) animateImgParticles();
      if (renderDots) animateDotParticles();
      ctx.fillStyle = hexToRGBA(backgroundColor, 0.6);
      ctx.fillRect(0, 0, innerWidth, innerHeight);
    };

    const animateImgParticles = () => {
      const n = Math.min(imgParticles.length, maxImgs);
      for (let i = 0; i < n; i++) {
        imgParticles[i]!.update(ctx);
      }
      if (particlesShouldConnect) connect(imgParticles);
    };

    const animateDotParticles = () => {
      for (let i = 0; i < dotParticles.length; i++) {
        dotParticles[i]!.update(ctx);
      }
      if (particlesShouldConnect) connect(dotParticles);
    };

    document.addEventListener("EtherIconsLoaded", (e: Event) => {
      imgs = (e as CustomEvent).detail;
      init();
    });

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      document.removeEventListener("EtherIconsLoaded", (e: Event) => {
        imgs = (e as CustomEvent).detail;
        init();
      });
    };
  }, []);

  return (
    <div
      className="IconEther_container"
      style={{
        position: fullScreen ? "initial" : "relative",
        width: fullScreen ? "initial" : width,
        height: fullScreen ? "initial" : height,
        background: backgroundColor,
      }}
    >
      <canvas
        style={{
          width: width,
          height: height,
          background: backgroundColor,
        }}
      ></canvas>
      <div
        className="blurred-background"
        style={{
          width: width,
          height: fullScreen ? "100%" : height,
        }}
      ></div>
    </div>
  );
}

export { IconEther };
