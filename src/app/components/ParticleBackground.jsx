"use client";

import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = () => {
  const options = {
    background: {
      color: "#000",
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#007cf0",
      },
      links: {
        color: "#9f00ff",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
    // Ensure the canvas stays behind all content globally
    fullScreen: { enable: true, zIndex: -1 },
  };

  return (
    <Particles
      id="tsparticles"
      init={async (engine) => {
        await loadSlim(engine);
      }}
      options={options}
      // Prevent the canvas from capturing clicks and ensure it's behind
      className="pointer-events-none"
    />
  );
};

export default ParticleBackground;
