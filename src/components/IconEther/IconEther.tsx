import React, { useEffect, useRef, useState } from "react";
import Particle from "../../utils/Particle";
import preLoadImages from "../../utils/preLoadImages";
import "./IconEther.css";
import hexToRGBA from "../../utils/hexToRGBA";

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
  dotSize?: number;
}

/**
 * IconEther
 * Renders a component with moving particles
 * @param backgroundColor Background color in hexadecimal format.
 * @param particleColor Particle color in hexadecimal format.
 * @param renderImages Determines if the images should be rendered.
 * @param renderDots Determines if the dots should be rendered.
 * @param fullScreen Determines if the icon should be rendered in full screen.
 * @param height The height of the icon, in pixels or as a percentage.
 * @param width The width of the icon, in pixels or as a percentage.
 * @param icons The name of icons to render.
 * @param dotSize Dot particle size
 * @returns IconEther Component
 */
function IconEther({
  backgroundColor = "#282828",
  particleColor = "#33FF00",
  renderImages = true,
  renderDots = false,
  fullScreen = true,
  height = "100%",
  width = "100%",
  icons = [],
  dotSize = 2,
}: Props) {
  if (fullScreen) height = width = "100%";
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [loadedImages, setLoadedImages] = React.useState<HTMLImageElement[]>(
    []
  );
  const maxImgs = useRef(30);
  const imgSize = useRef(20);
  const maxDots = useRef(20);
  const [imgParticles, setImgParticles] = useState<Particle[]>([]);
  const [dotParticles, setDotParticles] = useState<Particle[]>([]);
  const animationID = useRef<null | number>(null);

  // 1. preflight init
  // **** 1. loadimages()
  const loadImages = async () => {
    if (!renderImages) return;
    const imgs = await preLoadImages(icons, particleColor);
    setLoadedImages(imgs);
  };

  useEffect(() => {
    loadImages();
  }, [icons]);

  // 2. init
  // **** 1. setup particle parameters
  // **** 2. generate particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (imgsLoaded()) return;

    initialize(canvas);
    animationID.current = requestAnimationFrame(animate);
  }, [loadedImages, canvasRef.current]);

  // 3. call loop
  useEffect(() => {
    if (!dotParticles) return;
    if (!imgParticles && renderImages) return;

    clearAnimations();
    animationID.current = requestAnimationFrame(animate);
  }, [dotParticles, imgParticles]);

  // 4. manipulate loop
  // **** 1. reinit after window resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    window.addEventListener("resize", () => initialize(canvas));

    return () => {
      window.removeEventListener("resize", () => initialize(canvas));
    };
  }, [canvasRef.current]);

  // **** 2. reinit after prop changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (imgsLoaded()) return;

    initialize(canvas);
  }, [renderImages, renderDots]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (imgsLoaded()) return;

    generateParticles(canvas, "dots");
  }, [particleColor, dotSize]);

  const initialize = (canvas: HTMLCanvasElement) => {
    clearAnimations();
    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    maxImgs.current = canvas.width <= 500 ? 10 : canvas.width <= 700 ? 18 : 30;
    imgSize.current = canvas.width <= 500 ? 20 : canvas.width <= 700 ? 27 : 30;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = hexToRGBA(backgroundColor, 0.6);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    maxImgs.current = Math.min(loadedImages.length, maxImgs.current);
    if (renderImages) {
      generateParticles(canvas, "imgs");
    }
    if (renderDots) {
      generateParticles(canvas, "dots");
    }
  };

  const generateParticles = (
    canvas: HTMLCanvasElement,
    type: "dots" | "imgs"
  ) => {
    let count = maxDots.current;
    const particles: Particle[] = [];

    if (type === "imgs") count = maxImgs.current;

    for (let i = 0; i < count; i++) {
      let size = 1 + Math.random() * dotSize;
      if (type === "imgs")
        size = (Math.random() * imgSize.current) / 2.5 + imgSize.current;
      const x = size * 2 + Math.random() * (canvas.width - size * 4);
      const y = size * 2 + Math.random() * (canvas.height - size * 4);
      const dX = (Math.random() * 2 - 1) / 10;
      const dY = (Math.random() * 2 - 1) / 10;
      const img = type === "imgs" ? loadedImages[i] : undefined;

      const particle = {
        x: x,
        y: y,
        dX: dX,
        dY: dY,
        size:
          size / (canvas.width <= 500 ? 1.2 : canvas.width <= 700 ? 1.1 : 1),
        img: img,
        color: particleColor,
        flicker: true,
      };

      particles.push(new Particle(particle));
    }

    if (type === "imgs") setImgParticles(particles);
    else setDotParticles(particles);
  };

  const animate = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    animationID.current = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (renderImages) {
      imgParticles.map((i) => i!.update(ctx));
    }
    if (renderDots) {
      dotParticles.map((i) => i!.update(ctx));
    }
    ctx.fillStyle = hexToRGBA(backgroundColor, 0.6);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // utils
  const clearAnimations = () => {
    if (animationID.current) cancelAnimationFrame(animationID.current);
  };

  const imgsLoaded = () => renderImages && loadedImages.length < 1;

  return (
    <div
      className="IconEther_container"
      style={{
        position: fullScreen ? "initial" : "relative",
        width: width,
        height: height,
        background: backgroundColor,
      }}
    >
      <canvas
        ref={canvasRef}
        className="IconEther_canvas"
        style={{
          position: fullScreen ? "absolute" : "relative",
          zIndex: fullScreen ? -100 : 0,
          width: width,
          height: height,
          background: backgroundColor,
        }}
      ></canvas>
      <div
        className="IconEther_overlay"
        style={{
          position: "absolute",
          zIndex: fullScreen ? -100 : 0,
          width: width,
          height: height,
        }}
      ></div>
    </div>
  );
}

export { IconEther };
