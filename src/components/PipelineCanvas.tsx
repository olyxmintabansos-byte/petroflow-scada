"use client";

import React, { useEffect, useRef } from "react";

interface PipelineCanvasProps {
  exportPressurePsi: number;
  isEsdTripped: boolean;
  activeWellsCount: number;
}

export const PipelineCanvas: React.FC<PipelineCanvasProps> = ({
  exportPressurePsi,
  isEsdTripped,
  activeWellsCount,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;
    const slugs: { x: number; speed: number; size: number }[] = [
      { x: 30, speed: 1.8, size: 14 },
      { x: 180, speed: 2.1, size: 22 },
      { x: 350, speed: 1.5, size: 18 },
      { x: 520, speed: 2.3, size: 26 },
    ];

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
      const height = (canvas.height = 160);

      ctx.clearRect(0, 0, width, height);

      // Background grid
      ctx.strokeStyle = "rgba(14, 165, 233, 0.08)";
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (isEsdTripped) {
        // Flatline Emergency Tripped state
        ctx.strokeStyle = "rgba(239, 68, 68, 0.9)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();

        ctx.fillStyle = "rgba(239, 68, 68, 0.25)";
        ctx.font = "bold 14px monospace";
        ctx.fillText("CRITICAL ESD TRIPPED: FLOWLINE ISOLATED [0 FLOW]", width / 2 - 190, height / 2 - 20);
        return;
      }

      // Draw Main Pipeline Trunk
      const trunkY = height / 2 + 10;
      const trunkHeight = 24;

      // Pipe outer walls
      ctx.fillStyle = "rgba(30, 41, 59, 0.85)";
      ctx.fillRect(0, trunkY - trunkHeight / 2, width, trunkHeight);

      ctx.strokeStyle = "#0284c7";
      ctx.lineWidth = 2;
      ctx.strokeRect(0, trunkY - trunkHeight / 2, width, trunkHeight);

      // Multiphase Slugging wave
      phase += 0.045 * (activeWellsCount / 6);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(14, 165, 233, 0.65)";
      ctx.lineWidth = 2;

      for (let x = 0; x < width; x += 3) {
        const primary = Math.sin((x * 0.02) + phase) * 8;
        const harmonic = Math.cos((x * 0.05) - phase * 0.8) * 3;
        const y = trunkY + primary + harmonic;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Hydrocarbon liquid slugs inside pipe
      slugs.forEach((slug) => {
        slug.x += slug.speed * (activeWellsCount / 6);
        if (slug.x > width + 40) slug.x = -40;

        const grad = ctx.createRadialGradient(slug.x, trunkY, 2, slug.x, trunkY, slug.size);
        grad.addColorStop(0, "rgba(245, 158, 11, 0.95)");
        grad.addColorStop(0.6, "rgba(217, 119, 6, 0.6)");
        grad.addColorStop(1, "rgba(180, 83, 9, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(slug.x, trunkY, slug.size, 8, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      // Pipeline Acoustic Pulse Envelope (Top Sensor HUD)
      ctx.beginPath();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.5;
      for (let x = 0; x < width; x += 4) {
        const pulse = Math.sin(x * 0.035 + phase * 1.5) * Math.sin(x * 0.008) * 16;
        const py = 35 + pulse;
        if (x === 0) ctx.moveTo(x, py);
        else ctx.lineTo(x, py);
      }
      ctx.stroke();

      // Telemetry Watermark text
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px monospace";
      ctx.fillText(
        `TRANSIENT SLUG DETECTOR // EXPORT PRESSURE: ${exportPressurePsi.toFixed(1)} PSI // VELOCITY: ${(
          1.8 + activeWellsCount * 0.25
        ).toFixed(2)} m/s`,
        12,
        20
      );

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [exportPressurePsi, isEsdTripped, activeWellsCount]);

  return (
    <div className="relative w-full h-[160px] bg-slate-950/80 rounded-xl border border-sky-900/40 p-2 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-2 right-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
          ACOUSTIC SLUG RADAR ACTIVE
        </span>
      </div>
    </div>
  );
};
