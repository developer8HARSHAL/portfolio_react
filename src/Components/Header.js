import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; // Importing ScrollLink from react-scroll
import 'tailwindcss/tailwind.css';

const data = [
    {
        Label: 'Home',
        to: '/',
        id: 'home'
    },
    {
        Label: 'About',
        to: 'about-section', // Remove the '#' symbol
        id: 'about'
    },
    {
        Label: 'Project',
        to: 'project-section',
        id: 'project'
    },
    {
        Label: 'Skill',
        to: 'skill-section',
        id: 'skill'
    },
    {
        Label: 'Contact',
        to: 'contact-section',
        id: 'contact'
    },
];

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="shadow-md">
            <div className="container mx-auto py-1 px- sm:px-6 lg:px-8 text-2xl text-white sticky">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="text-gray-800">
                            <img src='/assets/logo.png' alt="Logo" />
                        </Link>
                    </div>
                    <div className="md:hidden absolute top-18 right-14 mt-2 z-10">
                        <button onClick={toggleMobileMenu} className="text-grey-400 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                        {isMobileMenuOpen && (
                            <div className="absolute top-full right-0 mt-2 z-10 w-48 py-2 px-4 shadow-md border rounded-2xl">
                                {data.map((item, key) => (
                                    <ScrollLink key={key} to={item.to} smooth={true} duration={1000} className="block py-2 text-gray-500 hover:text-yellow-400 hover:underline">
                                        {item.Label}
                                    </ScrollLink>
                                ))}
                                <a href="/assets/harshalpinge1.pdf" target="_blank" rel="noopener noreferrer" className="block py-2 text-yellow-400 font-semibold hover:text-yellow-400 border-t border-yellow-400 mt-2 pt-2">
                                    Resume
                                </a>
                            </div>
                        )}
                    </div>
                    <nav className="hidden md:flex md:flex-1 justify-center md:space-x-[8rem]">
                        {data.map((item, key) => (
                            <ScrollLink key={key} to={item.to} smooth={true} duration={500} className="text-gray-500 hover:text-yellow-400 hover:underline inline-block px-2 py-1">
                                {item.Label}
                            </ScrollLink>
                        ))}
                    </nav>
                    <div className="hidden md:block border-2 py-4 px-8 mx-10 hover:border-yellow-300">
                        <a href="/assets/harshalpinge1.pdf" target="_blank" rel="noopener noreferrer" className="text-yellow-400 border-yellow-400 font-bold py-2 px-4 rounded hover:text-yellow-400">
                            Resume
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
