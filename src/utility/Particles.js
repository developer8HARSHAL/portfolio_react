import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent"
          }
        },
        fullScreen: {
          enable: true,
          zIndex: 0
        },
        particles: {
          color: {
            value: ["#3b82f6", "#06b6d4", "#ffffff"]
          },
          links: {
            color: "#3b82f6",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
            triangles: {
              enable: false
            }
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "bounce"
            },
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
          },
          number: {
            density: {
              enable: true,
              area: 800
            },
            value: 60
          },
          opacity: {
            value: { min: 0.3, max: 0.7 },
            animation: {
              enable: true,
              speed: 1,
              sync: false
            }
          },
          shape: {
            type: ["circle", "triangle"]
          },
          size: {
            value: { min: 1, max: 4 },
            animation: {
              enable: true,
              speed: 2,
              sync: false
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "grab"
            },
            onClick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5
              }
            },
            push: {
              quantity: 4
            }
          }
        },
        detectRetina: true
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticlesBackground;