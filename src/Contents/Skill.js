import React from 'react';

function Skill() {
  return (
    <>
      <h1 className="text-5xl font-semibold mb-4 md:text-justify text-gray-400 relative mx-[12rem] mt-[16rem]">Skills
        <div className="absolute bottom-0.2 left-12 w-full md:left-[calc(50% - 12rem)] md:w-[24rem] h-1 bg-cyan-800 mt-2"></div> 
      </h1>
      <section className="flex flex-col items-center  mx-4 ">
      
        <br/>
        <br/>
        <div className="flex justify-center flex-wrap gap-8 md:gap-16 lg:gap-20">
          <img src="assets/html.jpg" alt="HTML" className="w-32 h-32 m-2 rounded-full" />
          <img src="assets/css.jpeg" alt="CSS" className="w-32 h-32 m-2 rounded-full" />
          <img src="assets/react.png" alt="React" className="w-32 h-32 m-2 rounded-full" />
          <img src="assets/js.png" alt="JavaScript" className="w-32 h-32 m-2 rounded-full" />
          <img src="assets/bootstrap.png" alt="Bootstrap" className="w-32 h-32 m-2 rounded-full" />
          <img src="assets/tl.png" alt="Tailwind CSS" className="w-32 h-32 m-2 rounded-full" />
        </div>
        <h1 className="text-center mt-2 font-bold text-2xl text-gray-500">Frontend</h1>
        <div className="flex justify-center flex-wrap gap-8 md:gap-16 lg:gap-20">
          <img src="assets/nj.png" alt="Node.js" className="w-32 h-32 m-2 rounded-full" />
          <img src="assets/c++.jpg" alt="C++" className="w-32 h-32 m-2 rounded-full" />
          <img src="assets/c.jpeg" alt="C" className="w-32 h-32 m-2 rounded-full" />
          <img src="assets/py.jpeg" alt="Python" className="w-32 h-32 m-2 rounded-full" />
        </div>
        <h1 className="text-center mt-2 font-bold text-2xl text-gray-500">Backend</h1>
        <div className="flex justify-center flex-wrap gap-8 md:gap-16 lg:gap-20">
          <img src="assets/ms.png" alt="MySQL" className="w-32 h-32 m-2 rounded-full" />
          <img src="assets/md.png" alt="MongoDB" className="w-32 h-32 m-2 rounded-full" />
        </div>
        <h1 className="text-center mt-2 font-bold text-2xl text-gray-500">Database</h1>
      </section>
    </>
  );
}

export default Skill;
