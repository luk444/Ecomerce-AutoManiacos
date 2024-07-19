import React from 'react';
import Banner from '../Img/BANNER.png'; // Asegúrate de ajustar la ruta según la estructura de tu proyecto

const HeroSection = () => {
    return (
        <div>
            <img className="h-40 lg:h-full" src={Banner} alt="Banner" />
        </div>
    );
}

export default HeroSection;
