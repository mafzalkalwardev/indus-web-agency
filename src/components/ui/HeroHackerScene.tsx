"use client";

import { useEffect, useRef } from "react";

interface Sphere {
  x: number;
  y: number;
  z: number;
  radius: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  spinX: number;
  spinY: number;
  spinZ: number;
  driftX: number;
  driftY: number;
  hue: number;
  segments: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

function createSphere(w: number, h: number, i: number): Sphere {
  return {
    x: w * (0.15 + Math.random() * 0.7),
    y: h * (0.15 + Math.random() * 0.7),
    z: 80 + Math.random() * 120,
    radius: 28 + Math.random() * 42,
    rotX: Math.random() * Math.PI,
    rotY: Math.random() * Math.PI,
    rotZ: Math.random() * Math.PI,
    spinX: (0.004 + Math.random() * 0.012) * (i % 2 ? 1 : -1),
    spinY: (0.006 + Math.random() * 0.014) * (i % 3 ? 1 : -1),
    spinZ: (0.003 + Math.random() * 0.008) * (i % 2 ? -1 : 1),
    driftX: (Math.random() - 0.5) * 0.25,
    driftY: (Math.random() - 0.5) * 0.2,
    hue: i % 2 === 0 ? 185 : 160,
    segments: 14 + (i % 3) * 2,
  };
}

function project(
  x: number,
  y: number,
  z: number,
  cx: number,
  cy: number,
  focal: number
): { x: number; y: number; scale: number } {
  const s = focal / (focal + z);
  return { x: cx + x * s, y: cy + y * s, scale: s };
}

function rotate3D(
  x: number,
  y: number,
  z: number,
  rx: number,
  ry: number,
  rz: number
): [number, number, number] {
  let x1 = x;
  let y1 = y * Math.cos(rx) - z * Math.sin(rx);
  let z1 = y * Math.sin(rx) + z * Math.cos(rx);

  let x2 = x1 * Math.cos(ry) + z1 * Math.sin(ry);
  let y2 = y1;
  let z2 = -x1 * Math.sin(ry) + z1 * Math.cos(ry);

  let x3 = x2 * Math.cos(rz) - y2 * Math.sin(rz);
  let y3 = x2 * Math.sin(rz) + y2 * Math.cos(rz);

  return [x3, y3, z2];
}

function drawWireframeSphere(
  ctx: CanvasRenderingContext2D,
  sphere: Sphere,
  cx: number,
  cy: number,
  focal: number,
  time: number
) {
  const { radius, rotX, rotY, rotZ, segments, hue } = sphere;
  const rings = 8;
  const lines: { x1: number; y1: number; x2: number; y2: number; depth: number }[] = [];

  for (let ri = 0; ri <= rings; ri++) {
    const phi = (ri / rings) * Math.PI;
    for (let si = 0; si < segments; si++) {
      const theta1 = (si / segments) * Math.PI * 2;
      const theta2 = ((si + 1) / segments) * Math.PI * 2;

      const p1 = rotate3D(
        radius * Math.sin(phi) * Math.cos(theta1),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta1),
        rotX,
        rotY,
        rotZ
      );
      const p2 = rotate3D(
        radius * Math.sin(phi) * Math.cos(theta2),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta2),
        rotX,
        rotY,
        rotZ
      );

      const a = project(p1[0], p1[1], p1[2], 0, 0, focal);
      const b = project(p2[0], p2[1], p2[2], 0, 0, focal);
      const depth = (p1[2] + p2[2]) / 2;

      lines.push({
        x1: a.x + sphere.x,
        y1: a.y + sphere.y,
        x2: b.x + sphere.x,
        y2: b.y + sphere.y,
        depth,
      });
    }
  }

  for (let si = 0; si < segments; si++) {
    const theta = (si / segments) * Math.PI * 2;
    for (let ri = 0; ri < rings; ri++) {
      const phi1 = (ri / rings) * Math.PI;
      const phi2 = ((ri + 1) / rings) * Math.PI;

      const p1 = rotate3D(
        radius * Math.sin(phi1) * Math.cos(theta),
        radius * Math.cos(phi1),
        radius * Math.sin(phi1) * Math.sin(theta),
        rotX,
        rotY,
        rotZ
      );
      const p2 = rotate3D(
        radius * Math.sin(phi2) * Math.cos(theta),
        radius * Math.cos(phi2),
        radius * Math.sin(phi2) * Math.sin(theta),
        rotX,
        rotY,
        rotZ
      );

      const a = project(p1[0], p1[1], p1[2], 0, 0, focal);
      const b = project(p2[0], p2[1], p2[2], 0, 0, focal);
      const depth = (p1[2] + p2[2]) / 2;

      lines.push({
        x1: a.x + sphere.x,
        y1: a.y + sphere.y,
        x2: b.x + sphere.x,
        y2: b.y + sphere.y,
        depth,
      });
    }
  }

  lines.sort((a, b) => a.depth - b.depth);

  for (const line of lines) {
    const alpha = 0.15 + ((line.depth + radius) / (radius * 2)) * 0.55;
    const pulse = 0.85 + Math.sin(time * 0.002 + line.depth * 0.05) * 0.15;
    ctx.strokeStyle = `hsla(${hue}, 90%, 55%, ${alpha * pulse})`;
    ctx.lineWidth = 0.6 + alpha * 0.8;
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.stroke();
  }

  // Core glow
  const glow = ctx.createRadialGradient(sphere.x, sphere.y, 0, sphere.x, sphere.y, radius * 1.4);
  glow.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.18)`);
  glow.addColorStop(0.5, `hsla(${hue}, 80%, 50%, 0.06)`);
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(sphere.x, sphere.y, radius * 1.4, 0, Math.PI * 2);
  ctx.fill();
}

export function HeroHackerScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let spheres: Sphere[] = [];
    let nodes: Node[] = [];
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      spheres = Array.from({ length: 5 }, (_, i) => createSphere(w, h, i));
      nodes = Array.from({ length: 40 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        life: Math.random(),
      }));
    };

    const draw = () => {
      time++;
      ctx.clearRect(0, 0, w, h);

      // Hex grid
      ctx.strokeStyle = "rgba(6, 182, 212, 0.04)";
      ctx.lineWidth = 0.5;
      const hex = 36;
      for (let y = 0; y < h + hex; y += hex * 0.866) {
        for (let x = 0; x < w + hex; x += hex) {
          const ox = x + (Math.floor(y / (hex * 0.866)) % 2) * (hex / 2);
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i - Math.PI / 6;
            const px = ox + hex * 0.4 * Math.cos(a);
            const py = y + hex * 0.4 * Math.sin(a);
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }

      // Data nodes + connections
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.life += 0.008;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        const flicker = 0.3 + Math.sin(node.life * 3) * 0.2;
        ctx.fillStyle = `rgba(34, 211, 238, ${flicker})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.12;
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Rolling wireframe spheres
      for (const sphere of spheres) {
        sphere.rotX += sphere.spinX;
        sphere.rotY += sphere.spinY;
        sphere.rotZ += sphere.spinZ;
        sphere.x += sphere.driftX;
        sphere.y += sphere.driftY;

        if (sphere.x < sphere.radius || sphere.x > w - sphere.radius) sphere.driftX *= -1;
        if (sphere.y < sphere.radius || sphere.y > h - sphere.radius) sphere.driftY *= -1;

        drawWireframeSphere(ctx, sphere, 0, 0, 280, time);
      }

      // Scanline sweep
      const scanY = (time * 1.2) % (h + 80) - 40;
      const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGrad.addColorStop(0, "transparent");
      scanGrad.addColorStop(0.5, "rgba(34, 211, 238, 0.06)");
      scanGrad.addColorStop(1, "transparent");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 30, w, 60);

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
