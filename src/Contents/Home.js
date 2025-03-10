import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="home" className="text-white py-12" data-aos="fade-up gap-40">
      <div className="container mx-auto px-4 md:px-0 flex items-center justify-center">
        {/* Increased max-width for better content spacing */}
        <div className="flex flex-col md:flex-row items-start max-w-7xl w-full">
          {/* Image container with fixed width of 300px and increased margin */}
          <div className="w-full md:w-1/3 flex justify-center mb-16 md:mb-0"> {/* Increased bottom margin from 12 to 16 */}
            <img
              src="/assets/portfolio.jpg"
              alt="Profile"
              className="w-[300px] h-[300px] rounded-lg object-cover" // Fixed width and height to 300px, added object-cover
            />
          </div>
          
          {/* Content container with increased padding for larger gap */}
          <div className="w-full md:w-2/3 md:pl-24 flex items-start"> {/* Increased left padding from 16 to 24 */}
            {/* Vertical line separator */}
            <div className="flex-none mr-6 md:mr-8">
              <div className="h-full border-r border-blue-300"></div>
            </div>
            
            {/* Text content */}
            <div className="flex-grow">
              <h1 className="text-5xl md:text-4xl font-bold text-blue-500 md:text-left">
                HEY hii!!<br />
                <span className="typing-animation md:text-8xl text-white">I'm Harshal </span>
              </h1>
              <p className="mt-6 text-2xl font-medium md:text-justify leading-8 text-gray-500">
                I'm a <span className='text-blue-500'>frontend developer</span> and <span className='text-blue-500'>cloud computing</span> enthusiast, and I have been experimenting with other new technologies.<br /><br/>
                I am currently pursuing my <span className='text-blue-500'>Undergraduate</span> degree from SPPU and am in the fourth-year of college.<br /><br/>
                Besides that, I am also inclined towards creativity, such as <span className='text-blue-500'>painting, sketching,</span> and posting blogs on social media. Additionally, I write tweets on X as well.
              </p>
              <div className="mt-8">
                <Link to="/contact">
                  <button className="px-8 py-5 bg-yellow-400 text-blue-900 font-semibold rounded hover:bg-yellow-500 transition duration-400 ease-in-out text-2xl">Contact me</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;