import { useCallback, useEffect, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim'; // ✅ replaces loadFull



const ParticlesBackground = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(t);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  if (!show) return null;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: { value: 'transparent' },
        },
        fullScreen: {
          enable: true,
          zIndex: 0,
        },
        particles: {
          color: {
            value: ['#3b82f6', '#06b6d4', '#ffffff'],
          },

          links: {
            enable: false,
          },

          move: {
            enable: true,
            speed: 0.8,         
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'bounce' },
            attract: { enable: false }, 
          },

          number: {
            density: { enable: true, area: 800 },
            value: 35,            
          },

          opacity: {
            value: { min: 0.2, max: 0.5 },
            animation: {
              enable: true,
              speed: 0.6,      
              sync: false,
            },
          },

          shape: {
            type: 'circle',       
          },

          size: {
            value: { min: 1, max: 3 },
            animation: {
              enable: false,      
            },
          },
        },

        interactivity: {
          detect_on: 'canvas',
          events: {
            onHover: { enable: true, mode: 'grab' },
            onClick: { enable: true, mode: 'push' },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              links: { opacity: 0.4 },
            },
            push: { quantity: 2 }, 
          },
        },


        detectRetina: false,
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticlesBackground;