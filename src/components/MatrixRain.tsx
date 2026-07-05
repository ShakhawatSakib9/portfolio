"use client";

import { useEffect, useRef } from "react";
import { useMode } from "@/context/ModeContext";

export default function MatrixRain() {
  const { isHackerMode, isFocusMode } = useMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isHackerMode || isFocusMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make canvas full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters
    const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
    const charArray = chars.split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // An array of drops - one per column
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    let animationFrameId: number;

    // Drawing the characters
    const draw = () => {
      // Black BG for canvas, translucent BG to show trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff70"; // Matrix Green
      ctx.font = `${fontSize}px monospace`;

      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        // x coordinate = column index * fontSize
        // y coordinate = drop value * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Sending drop back to top randomly after it has crossed screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment y coordinate
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHackerMode]);

  if (!isHackerMode || isFocusMode) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-[0.25]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
