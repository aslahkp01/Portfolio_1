import React from 'react';
import { motion } from 'framer-motion';

const BlackHole = () => {
    return (
        <div className="w-full relative overflow-hidden py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                    className="flex items-center justify-center w-full"
                >
                    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl aspect-square">
                        <svg
                            viewBox="0 0 800 800"
                            className="w-full h-full"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                {/* Radial gradient for the black hole center */}
                                <radialGradient id="blackHoleGradient" cx="50%" cy="50%">
                                    <stop offset="0%" stopColor="#000000" />
                                    <stop offset="30%" stopColor="#1a1a1a" />
                                    <stop offset="60%" stopColor="#2a2a2a" />
                                    <stop offset="100%" stopColor="#000000" />
                                </radialGradient>

                                {/* Gradient for accretion disk */}
                                <radialGradient id="accretionGradient" cx="50%" cy="50%">
                                    <stop offset="0%" stopColor="#000000" stopOpacity="1" />
                                    <stop offset="40%" stopColor="#1a1a1a" stopOpacity="0.8" />
                                    <stop offset="60%" stopColor="#ffffff" stopOpacity="0.3" />
                                    <stop offset="80%" stopColor="#ffffff" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                                </radialGradient>

                                {/* Gradient for stars */}
                                <radialGradient id="starGradient">
                                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                                </radialGradient>

                                {/* Filter for glow effect */}
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>

                                {/* Animation for rotating accretion disk */}
                                <animateTransform
                                    id="rotate"
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 400 400"
                                    to="360 400 400"
                                    dur="20s"
                                    repeatCount="indefinite"
                                />
                            </defs>

                            {/* Background stars */}
                            {Array.from({ length: 50 }).map((_, i) => {
                                const angle = (i * 360) / 50;
                                const radius = 200 + Math.random() * 200;
                                const x = 400 + Math.cos((angle * Math.PI) / 180) * radius;
                                const y = 400 + Math.sin((angle * Math.PI) / 180) * radius;
                                const size = Math.random() * 2 + 0.5;
                                return (
                                    <circle
                                        key={`star-${i}`}
                                        cx={x}
                                        cy={y}
                                        r={size}
                                        fill="white"
                                        opacity={Math.random() * 0.8 + 0.2}
                                    >
                                        <animate
                                            attributeName="opacity"
                                            values={`${Math.random() * 0.8 + 0.2};${Math.random() * 0.8 + 0.2}`}
                                            dur={`${Math.random() * 3 + 2}s`}
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                );
                            })}

                            {/* Outer accretion disk rings */}
                            <g transform="translate(400, 400)">
                                <ellipse
                                    cx="0"
                                    cy="0"
                                    rx="350"
                                    ry="120"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="0.5"
                                    opacity="0.1"
                                    transform="rotate(45)"
                                >
                                    <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        from="45 0 0"
                                        to="405 0 0"
                                        dur="25s"
                                        repeatCount="indefinite"
                                    />
                                </ellipse>
                                <ellipse
                                    cx="0"
                                    cy="0"
                                    rx="320"
                                    ry="100"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="0.5"
                                    opacity="0.15"
                                    transform="rotate(-30)"
                                >
                                    <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        from="-30 0 0"
                                        to="330 0 0"
                                        dur="30s"
                                        repeatCount="indefinite"
                                    />
                                </ellipse>
                            </g>

                            {/* Accretion disk layers */}
                            <g transform="translate(400, 400)">
                                {/* Outer disk */}
                                <ellipse
                                    cx="0"
                                    cy="0"
                                    rx="280"
                                    ry="80"
                                    fill="url(#accretionGradient)"
                                    opacity="0.4"
                                    transform="rotate(0)"
                                >
                                    <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        from="0 0 0"
                                        to="360 0 0"
                                        dur="15s"
                                        repeatCount="indefinite"
                                    />
                                </ellipse>

                                {/* Middle disk */}
                                <ellipse
                                    cx="0"
                                    cy="0"
                                    rx="200"
                                    ry="60"
                                    fill="url(#accretionGradient)"
                                    opacity="0.5"
                                    transform="rotate(45)"
                                >
                                    <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        from="45 0 0"
                                        to="405 0 0"
                                        dur="12s"
                                        repeatCount="indefinite"
                                    />
                                </ellipse>

                                {/* Inner disk */}
                                <ellipse
                                    cx="0"
                                    cy="0"
                                    rx="140"
                                    ry="40"
                                    fill="url(#accretionGradient)"
                                    opacity="0.6"
                                    transform="rotate(-20)"
                                >
                                    <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        from="-20 0 0"
                                        to="340 0 0"
                                        dur="10s"
                                        repeatCount="indefinite"
                                    />
                                </ellipse>
                            </g>

                            {/* Event horizon and black hole center */}
                            <circle
                                cx="400"
                                cy="400"
                                r="100"
                                fill="url(#blackHoleGradient)"
                                opacity="0.95"
                            />

                            {/* Inner event horizon glow */}
                            <circle
                                cx="400"
                                cy="400"
                                r="95"
                                fill="none"
                                stroke="white"
                                strokeWidth="1"
                                opacity="0.2"
                            />

                            {/* Photon sphere */}
                            <circle
                                cx="400"
                                cy="400"
                                r="110"
                                fill="none"
                                stroke="white"
                                strokeWidth="0.5"
                                opacity="0.3"
                                strokeDasharray="2 4"
                            >
                                <animate
                                    attributeName="opacity"
                                    values="0.3;0.6;0.3"
                                    dur="3s"
                                    repeatCount="indefinite"
                                />
                            </circle>

                            {/* Light rays being bent */}
                            {Array.from({ length: 12 }).map((_, i) => {
                                const angle = (i * 360) / 12;
                                const startRadius = 150;
                                const endRadius = 120;
                                const startX = 400 + Math.cos((angle * Math.PI) / 180) * startRadius;
                                const startY = 400 + Math.sin((angle * Math.PI) / 180) * startRadius;
                                const endX = 400 + Math.cos((angle * Math.PI) / 180) * endRadius;
                                const endY = 400 + Math.sin((angle * Math.PI) / 180) * endRadius;
                                return (
                                    <line
                                        key={`ray-${i}`}
                                        x1={startX}
                                        y1={startY}
                                        x2={endX}
                                        y2={endY}
                                        stroke="white"
                                        strokeWidth="0.5"
                                        opacity="0.2"
                                    >
                                        <animate
                                            attributeName="opacity"
                                            values="0.2;0.4;0.2"
                                            dur={`${2 + i * 0.2}s`}
                                            repeatCount="indefinite"
                                        />
                                    </line>
                                );
                            })}

                            {/* Central singularity (very small bright point) */}
                            <circle
                                cx="400"
                                cy="400"
                                r="2"
                                fill="white"
                                opacity="0.8"
                                filter="url(#glow)"
                            >
                                <animate
                                    attributeName="r"
                                    values="2;3;2"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="opacity"
                                    values="0.8;1;0.8"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </svg>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlackHole;

