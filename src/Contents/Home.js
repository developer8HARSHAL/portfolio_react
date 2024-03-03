import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with options
  }, []);

  return (
    <section id="home" className="text-white py-12" data-aos="fade-up">
      <div className="container mx-auto px-4 md:px-0 flex flex-col md:flex-row justify-center items-center">
        <div className="mb-4 md:mb-0">
          <img
            src="/assets/main.png"
            alt="Profile"
            className="w-16 md:w-23 h-auto shadow-lg" // Adjusted width for mobile view
            style={{
              maxWidth: '100%', // Ensure image does not exceed container width
              width: '100%', // Set width to 100% initially for responsiveness
            }}
          />
        </div>
        <div className="max-w-4xl mx-8 md:mx-4 flex"> {/* Added flex class for vertical line */}
          <div className="flex-none mr-6 md:mr-8"> {/* Added margin for space between line and text */}
            <div className="h-full border-r border-blue-300 mr-10 md:mr-1"></div> {/* Vertical line */}
          </div>
          <div className="flex-grow"> {/* Added flex-grow class for dynamic sizing */}
            <h1 className="text-5xl md:text-4xl font-bold text-blue-500  text-center md:text-left">
              HEY hii!!<br />
              <span className="typing-animation md:text-8xl text-white ">I'm Harshal </span>
            </h1><br/><br/>
            <p className="mt-6 text-2xl font-medium md:text-justify leading-8 text-gray-500"> {/* Removed text-center class */}
            I'm a <span className='text-blue-500'>frontend developer</span> and <span className='text-blue-500'>cloud computing</span> enthusiast, and I have been experimenting with other new technologies.<br /><br/>
            I am currently pursuing my <span className='text-blue-500'>Undergraduate</span> degree from SPPU and am in the third year of college.<br /><br/>
            Besides that, I am also inclined towards creativity, such as <span className='text-blue-500'>painting, sketching,</span> and posting blogs on social media. Additionally, I write tweets on X as well.
            </p>
            <br/><br/>
            <div className="mt-8">
              <Link to="/contact">
                <button className="px-8 py-5 bg-yellow-400 text-blue-900 font-semibold rounded hover:bg-yellow-500 transition duration-400 ease-in-out text-2xl">Contact me</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
