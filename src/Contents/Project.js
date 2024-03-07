import React, { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

function Project() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with options
  }, []);

  return (
    <section id="project-section" className='flex justify-center items-center py-8 md:py-20 mb-20 '>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8" style={{ maxWidth: 'calc(100% - 200px)' }}>
        <h1 className="text-3xl md:text-5xl font-semibold mb-4 md:mb-8 md:text-justify text-gray-400 relative">My Work
          <div className="absolute bottom--2 left-12 w-full md:left-[calc(50% - 12rem)] md:w-[44rem] h-1 bg-cyan-800 mt-2"></div>
        </h1>
        <br />
        <br />
        {/* ---------------project1----- */}
        <div className='w-full md:w-[50%] lg:w-[80%] mx-auto h-auto md:h-[40rem] lg:h-[40rem] flex flex-col md:flex-row gap-4 md:gap-8 rounded-lg overflow-hidden  shadow-xl relative'  data-aos="fade-up">
          <div className='image h-[15rem] md:h-[40rem] w-full md:w-[80%] relative'>
            <img src="assets/im3.png" alt="Project Image" className='object-cover w-full h-full hover:brightness-25 transition-all duration-300 ease-in-out rounded-lg' />
          </div>
          <div className='details flex-1 flex flex-col justify-center p-4 md:p-8 bg-gray-800 bg-opacity-50 rounded-lg'>
            <div className='text-align-top mx-4 md:mx-9'>
              <h2 className='text-white text-xl md:text-5xl font-bold my-2 md:my-[4rem]'>Edureka</h2>
              <p className='text-lg md:text-4xl my-2 md:my-[1rem] font-semibold text-blue-900'>static website</p>
            </div>
            <div className='text-center mt-2 md:mt-4'>
              <p className='text-sm md:text-xl text-gray-400 bg-gray-800 p-2 rounded-lg '>Edumato is cloud kitchen website for food ordering just like Swiggy and Zomato , Languages used -- React, Node.js, javascript, Css</p>
            </div>
          </div>
          <div className="links flex flex-col justify-center gap-4 md:gap-8 w-full md:w-auto p-2">
            <div className="md:hidden flex justify-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <img src="assets/github.jpg" alt="GitHub Link" className='w-8 md:w-[50px] mx-auto' />
              </a>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="inline-block">
                <img src="assets/eternal.png" alt="External Link" className='size-[20px] md:size-[30px] mx-auto' />
              </a>
            </div>
            <div className="hidden md:flex flex-col justify-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <img src="assets/github.jpg" alt="GitHub Link" className='w-8 md:w-[50px] mx-auto' />
              </a>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="inline-block">
                <img src="assets/eternal.png" alt="External Link" className='size-[20px] md:size-[30px] mx-auto' />
              </a>
            </div>
          </div>
        </div>
<br/>
<br/>
        {/* ---------------project2----- */}
        <div className='w-full md:w-[50%] lg:w-[80%] mx-auto mt-8 md:mt-0 h-auto md:h-[40rem] lg:h-[40rem] flex flex-col md:flex-row gap-4 md:gap-8 rounded-lg overflow-hidden  shadow-xl relative' data-aos="fade-up">
       
        <div className="hidden md:flex flex-col justify-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <img src="assets/github.jpg" alt="GitHub Link" className='w-8 md:w-[50px] mx-auto' />
              </a>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="inline-block">
                <img src="assets/eternal.png" alt="External Link" className='size-[20px] md:size-[30px] mx-auto' />
              </a>
            </div>
          <div className='details flex-1 flex flex-col justify-center p-4 md:p-8 bg-gray-800 bg-opacity-50 rounded-lg'>
            <div className='text-align-top mx-4 md:mx-9'>
              <h2 className='text-white text-xl md:text-5xl font-bold my-2 md:my-[4rem]'>ShopOnn</h2>
              <p className='text-lg md:text-4xl my-1 md:my-[1rem] font-semibold text-blue-900'>E-commerce Website</p>
            </div>
            <div className='text-center mt-2 md:mt-4'>
              <p className='text-sm md:text-xl text-gray-400 bg-gray-800 p-2 rounded-lg'>ShopOnn is a static e-commerce website language used -- HTML, CSS, javascript</p>
            </div>
          </div>
          <div className="links flex flex-col justify-center gap-4 md:gap-8 w-full md:w-auto p-2">
          <div className='image h-[15rem] md:h-[40rem] w-full md:w-[80%] relative'>
            <img src="assets/im1 (2).png" alt="Project Image" className='object-cover w-full h-full hover:brightness-25 transition-all duration-300 ease-in-out rounded-lg' />
          </div>
            <div className="md:hidden flex justify-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <img src="assets/github.jpg" alt="GitHub Link" className='w-8 md:w-[50px] mx-auto' />
              </a>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="inline-block">
                <img src="assets/eternal.png" alt="External Link" className='size-[20px] md:size-[30px] mx-auto' />
              </a>
            </div>
            
          
            
          </div>
        </div>
        <br/>
        <br/>

        {/* ---------------project3----- */}
        <div className='w-full md:w-[50%] lg:w-[80%] mx-auto h-auto md:h-[40rem] lg:h-[40rem] flex flex-col md:flex-row gap-4 md:gap-8 rounded-lg overflow-hidden  shadow-xl relative' data-aos="fade-up">
          <div className='image h-[15rem] md:h-[40rem] w-full md:w-[80%] relative'>
            <img src="assets/coff.png" alt="Project Image" className='object-cover w-full h-full hover:brightness-25 transition-all duration-300 ease-in-out rounded-lg' />
          </div>
          <div className='details flex-1 flex flex-col justify-center p-4 md:p-8 bg-gray-800 bg-opacity-50 rounded-lg'>
            <div className='text-align-top mx-4 md:mx-9'>
              <h2 className='text-white text-xl md:text-5xl font-bold my-2 md:my-[4rem]'>CoffeeTown</h2>
              <p className='text-lg md:text-4xl my-2 md:my-[1rem] font-semibold text-blue-900'>Coffee Website</p>
            </div>
            <div className='text-center mt-2 md:mt-4'>
              <p className='text-sm md:text-xl text-gray-400 bg-gray-800 p-2 rounded-lg '>CoffeeTown is a coffee selling website, this is a responsive website we used php for signup and login , Languages used -- HTML, CSS, PHP, Figma, javascript</p>
            </div>
          </div>
          <div className="links flex flex-col justify-center gap-4 md:gap-8 w-full md:w-auto p-2">
            <div className="md:hidden flex justify-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <img src="assets/github.jpg" alt="GitHub Link" className='w-8 md:w-[50px] mx-auto' />
              </a>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="inline-block">
                <img src="assets/eternal.png" alt="External Link" className='size-[20px] md:size-[30px] mx-auto' />
              </a>
            </div>
            <div className="hidden md:flex flex-col justify-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <img src="assets/github.jpg" alt="GitHub Link" className='w-8 md:w-[50px] mx-auto' />
              </a>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="inline-block">
                <img src="assets/eternal.png" alt="External Link" className='size-[20px] md:size-[30px] mx-auto' />
              </a>
            </div>
          </div>
        </div>
<br/>
<br/>
      </div>
    </section>
  );
}

export default Project;
