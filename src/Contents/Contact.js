import React, { useState } from 'react';

function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Replace 'YOUR_EMAIL_ADDRESS' with your actual email address
    const mailtoLink = `mailto:YOUR_EMAIL_ADDRESS?subject=${encodeURIComponent('Contact Form Submission')}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  return (
    <>
      <h1 className="text-5xl font-semibold mb-4 md:text-justify text-gray-400 relative mx-[12rem] mt-[16rem]">Contact Me
        <div className="absolute bottom-0.2 left-10 w-full md:left-[calc(50% - 18rem)] md:w-[34rem] h-1 bg-cyan-800 mt-2"></div> 
      </h1>
      <br/>
      <br/>
      <section id="contact-section" className="max-w-[35rem] mx-auto px-4 md:px-12 rounded-lg shadow-lg bg-gray-800">
        <h2 className="text-3xl font-bold text-center text-white mb-8 md:mb-16 py-8">Contact Me</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-2xl text-white font-semibold">Your Email</label>
            <br/>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 md:py-6 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-xl md:text-2xl font-semibold text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-2xl text-white font-semibold">Message</label>
            <br/>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              className="w-full px-4 py-3 md:py-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-base md:text-xl font-semibold text-black"
              required
            ></textarea>
          </div>
          <br/>
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-6 py-3 md:py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none font-semibold text-lg md:text-xl mb-8"
              disabled={submitting}
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </section>
  

    </>
  );
}

export default Contact;
