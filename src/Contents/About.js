import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link as ScrollLink } from 'react-scroll';

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with options
  }, []);

  return (
    <>
      <h1  className="text-5xl font-semibold mb-[-10rem] md:text-justify text-gray-400 relative mx-[15rem] mt-[15rem]">About me
        <div className="absolute bottom-0.2 left-12 w-full md:left-[calc(50% - 12rem)] md:w-[34rem] h-1 bg-cyan-800 mt-2"></div>
      </h1>
      <section id="about-section" className="flex justify-center items-center h-screen">
        
        {/* Vertical Line */}
        <div className="hidden md:block fixed left-[2.8rem] top-[46rem] h-full flex flex-col justify-center ml-8">
          <div className="h-full bg-gray-500 w-1"></div>
        </div>

        {/* Social Links */}
        <div className="md:block fixed left-[0.5rem] top-[22rem] h-full flex flex-col justify-center gap-102 ml-8">
          <a href="https://github.com/developer8HARSHAL" className="block">
            <img src="assets/github.jpg" alt="Social Link 1" className="w-20 h-20 mb-4 hover:opacity-75 rounded-full" />
          </a>
          <a href="https://twitter.com/iAmHarshal8?t=MC5KxrUhJfithoJ7M-sxAA&s=09" className="block rounded-full">
            <img src="assets/twitter.png" alt="Social Link 2" className="w-20 h-20 mb-4 hover:opacity-75 rounded-full" />
          </a>
          <a href="https://www.linkedin.com/in/harshal-pinge-ab13b5216" className="block">
            <img src="assets/linkedin.png" alt="Social Link 3" className="w-20 h-20 mb-4 hover:opacity-75 rounded-full" />
          </a>
          <a href="https://www.instagram.com/harshal08.?utm_source=qr&igsh=bWUwaDc0eWd3MnNl" className="block">
            <img src="assets/instagram.png" alt="Social Link 4" className="w-20 h-20 mb-4 hover:opacity-75 rounded-full" />
          </a>
        </div>

        <div className="hidden md:block fixed right-[12.2rem] top-[57rem] h-full flex flex-col justify-right ml-8">
          <div className="h-full bg-white w-1"></div>
        </div>
        <div className="md:block fixed hidden side right-[32rem] top-[4rem] h-full flex flex-col justify-center ml-8" style={{ transform: 'rotate(90deg)' }}>
          <a href="mailto:your-email@example.com" className="block">
            <h1 className='text-4xl font-bold text-gray-500'>HarshalPinge@Gmail.Com</h1>
          </a>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto md:mx-4 p-1 rounded-lg shadow-lg text-gray-500 md:ml-100 md:mr-100">
          <br /><br />
          <p className="text-2xl leading-relaxed justify-start" data-aos="fade-right">
            I was first introduced to programming, particularly <span className="text-blue-500">full-stack development</span>, towards the end of my 12th standard. Since then, I have been diligently practicing and honing my skills in this field. I completed my 10th and 12th grades from CBSE boards in Nagpur.
          </p>
          <br />
          <p className="text-2xl leading-relaxed justify-start" data-aos="fade-right">
            Currently, I am pursuing my Bachelor of Engineering in Computer Engineering from <span className="text-blue-500">Pune University</span>, and I am currently in my third year of studies.
          </p>
          <br />
          <p className="text-2xl leading-relaxed justify-start" data-aos="fade-right">
            During my academic journey, I was introduced to <span className="text-blue-500">cloud computing</span> in my third year, and I have developed a strong passion for it as well.
          </p>
          <br />
          <p className="text-2xl leading-relaxed justify-start" data-aos="fade-right">
            Alongside my studies, I have also earned several certifications in JavaScript, <span className="text-blue-500">full-stack development</span>, and recently, I completed the <span className="text-blue-500">Cloud Jam GCP certification</span>. I am excited about the opportunities that lie ahead in both <span className="text-blue-500">full-stack development</span> and <span className="text-blue-500">cloud computing</span>, and I am eager to continue learning and growing in these fields.
          </p>
        </div>
      </section>
    </>
  );
}

export default About;
