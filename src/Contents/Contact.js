import { useState } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace these with your EmailJS credentials
      const serviceId = 'service_qsmolsq';
      const templateId = 'template_qiku3k2';
      const publicKey = 'gCyrVJg4WwOcvCsbL';

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'harshalpinge@gmail.com'
        },
        publicKey
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      
      // Clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "EMAIL",
      value: "harshalpinge@gmail.com",
      link: null
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      label: "GITHUB",
      value: "github.com/developer8HARSHAL",
      link: "https://github.com/developer8HARSHAL"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: "LINKEDIN",
      value: "linkedin.com/in/harshal-pinge",
      link: "https://www.linkedin.com/in/harshal-pinge-ab13b5216/"
    }
  ];

  return (
    <section id="contact" className="min-h-screen py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
      
      <div className="w-[90%] lg:w-[85%] xl:w-[80%] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 lg:mb-28">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm font-medium text-blue-300">Let's Connect</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4">
            Get in <span className="text-gradient-primary">Touch</span>
          </h2>
          
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-6"></div>
          
          <p className="text-xl lg:text-2xl text-slate-400 max-w-3xl mb-16">
            Have a project in mind or want to discuss opportunities? I'm currently seeking entry-level full-stack developer roles and would love to hear from you. Let's connect!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Contact Info - Left Side */}
          <div className="space-y-6">

            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="card-glass-hover group p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-slate-500 uppercase tracking-wider mb-1">
                        {info.label}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-white text-2xl hover:text-blue-400 transition-colors duration-300 break-words"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white text-2xl break-words">{info.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-slate-500 uppercase tracking-wider mb-4">
                CONNECT WITH ME
              </h3>
              <div className="flex gap-3">
                <a
                  href="https://github.com/developer8HARSHAL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-slate-700/50 hover:bg-blue-500 border border-slate-600 hover:border-blue-500 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/harshal-pinge-ab13b5216/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-slate-700/50 hover:bg-blue-500 border border-slate-600 hover:border-blue-500 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Contact Form - Right Side */}
          <div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
              <div className="space-y-6">

                {/* Success/Error Message */}
                {submitStatus && (
                  <div className={`p-4 rounded-xl border ${
                    submitStatus === 'success' 
                      ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}>
                    <div className="flex items-center gap-2">
                      {submitStatus === 'success' ? (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Message sent successfully! I'll get back to you soon.</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span>Failed to send message. Please try again or email me directly.</span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 bg-slate-900/50 border ${
                      focusedField === 'name' ? 'border-blue-500' : 'border-slate-700'
                    } rounded-xl text-white placeholder:text-slate-600 focus:outline-none transition-all duration-300`}
                    placeholder="Name"
                    required
                  />
                </div>

                {/* Email & Subject Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 bg-slate-900/50 border ${
                        focusedField === 'email' ? 'border-blue-500' : 'border-slate-700'
                      } rounded-xl text-white placeholder:text-slate-600 focus:outline-none transition-all duration-300`}
                      placeholder="Email ID"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 bg-slate-900/50 border ${
                        focusedField === 'subject' ? 'border-blue-500' : 'border-slate-700'
                      } rounded-xl text-white placeholder:text-slate-600 focus:outline-none transition-all duration-300`}
                      placeholder="Project Inquiry"
                      required
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows="6"
                    className={`w-full px-4 py-3 bg-slate-900/50 border ${
                      focusedField === 'message' ? 'border-blue-500' : 'border-slate-700'
                    } rounded-xl text-white placeholder:text-slate-600 focus:outline-none transition-all duration-300 resize-none`}
                    placeholder="Tell me about your project..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;














