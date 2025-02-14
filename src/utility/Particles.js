import React from 'react';
import Particles from 'react-tsparticles';

const particles = () => {
    return (
        <Particles
            id="tsparticles"
            options={{
                background: {
                    color: {
                        value: "transparent"
                    }
                },
                particles: {
                    color: {
                        value: "#ffffff"
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        attract: {
                            enable: true,
                            rotateX: 600,
                            rotateY: 1200
                        },
                        direction: "none",
                        enable: true,
                        outMode: "bounce",
                        random: false,
                        speed: 2,
                        straight: false
                    },
                    number: {
                        density: {
                            enable: true,
                            value_area: 800
                        },
                        value: 80
                    },
                    opacity: {
                        value: 0.5
                    },
                    size: {
                        random: true,
                        value: 5
                    }
                },
                detectRetina: true
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            }}
        />
    );
};

export default Particles;
