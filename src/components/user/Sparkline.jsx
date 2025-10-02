import React, { useMemo } from "react";

export default function Sparkline({ series = [], labels = [], positive = true, strokeWidth = 2 }) {
  const { points } = useMemo(() => {
    const values = series.length ? series : [0];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const width = 600;
    const height = 120;
    const stepX = values.length > 1 ? width / (values.length - 1) : width;

    const pts = values.map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * height;
      return [x, y];
    });

    return { points: pts };
  }, [series]);

  if (!points.length) return null;

  const w = 600;
  const h = 120;
  const color = positive ? "#10b981" : "#ef4444"; // emerald or rose
  const path = points.map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`)).join(" ");
  const areaPath = `${path} L ${points[points.length - 1][0]},${h} L 0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#spark-fill)" />
      <path d={path} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      {points.map((p, idx) => (
        <circle key={idx} cx={p[0]} cy={p[1]} r="2.5" fill={color} />
      ))}
      <line x1="0" y1={h - 0.5} x2={w} y2={h - 0.5} stroke="#e5e7eb" strokeWidth="1" />
    </svg>
  );
}
