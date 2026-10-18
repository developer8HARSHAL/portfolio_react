import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Container from '../Components/ui/Container';
import SectionHeading from '../Components/ui/SectionHeading';
import SocialLinks from '../Components/ui/SocialLinks';
import SOCIAL_LINK_ITEMS from '../data/socialLinks';

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const CONTACT_EMAIL = process.env.REACT_APP_CONTACT_TO_EMAIL || 'harshalpinge@gmail.com';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const statusTimer = useRef(null);

  useEffect(() => () => clearTimeout(statusTimer.current), []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setSubmitStatus(null);
    clearTimeout(statusTimer.current);

    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error('Contact form configuration is incomplete.');
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: CONTACT_EMAIL,
        },
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      statusTimer.current = setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      statusTimer.current = setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-section-y relative overflow-hidden bg-canvas text-paper">
      <div aria-hidden="true" className="absolute top-0 -right-40 w-[500px] h-[500px] bg-white/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div aria-hidden="true" className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none"></div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-3 h-3 text-paper/50 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p className="text-[14px] text-stone-500">Let's talk</p>
              </div>

              <SectionHeading title="Get in touch." className="!items-start !gap-0" titleClassName="mb-4" />

              <p className="text-[16px] text-paper/70 leading-relaxed max-w-md">
                Open to full-stack and frontend roles — send a message and I'll reply directly.
              </p>
            </div>

            <div className="flex flex-col gap-5 pt-6 border-t border-line">
              <div>
                <p className="label-mono !text-paper/50 mb-1">Email</p>
                <a
                  href="mailto:harshalpinge@gmail.com"
                  className="text-[16px] font-semibold text-paper hover:text-white transition-colors duration-300 break-all"
                >
                  harshalpinge@gmail.com
                </a>
              </div>

              <div>
                <p className="label-mono !text-paper/50 mb-1">Based in</p>
                <p className="text-[16px] font-semibold text-paper">Pune, India · Open to remote</p>
              </div>
            </div>

            <SocialLinks links={SOCIAL_LINK_ITEMS} tone="dark" className="pt-2" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-10" aria-label="Contact form" aria-busy={submitting}>
            {submitStatus && (
              <div
                role="status"
                aria-live="polite"
                className={`p-4 rounded-tile border text-[14px] flex items-center gap-2 ${
                  submitStatus === 'success'
                    ? 'bg-white/10 border-white/30 text-paper'
                    : 'bg-red-400/10 border-red-400/30 text-red-300'
                }`}
              >
                {submitStatus === 'success' ? (
                  <>
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Message sent — I'll get back to you soon.</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Couldn't send that — try again or email me directly.</span>
                  </>
                )}
              </div>
            )}

            <div>
              <label htmlFor="name" className="mb-2 block font-mono text-caption text-paper/70">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-transparent border border-line rounded-tile text-[15px] text-paper placeholder:text-muted/70 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/15 transition-all duration-300"
                placeholder="Your name"
                required
              />
            </div>

              <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-caption text-paper/70">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-transparent border border-line rounded-tile text-[15px] text-paper placeholder:text-muted/70 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/15 transition-all duration-300"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block font-mono text-caption text-paper/70">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-transparent border border-line rounded-tile text-[15px] text-paper placeholder:text-muted/70 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/15 transition-all duration-300"
                  placeholder="Project inquiry"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block font-mono text-caption text-paper/70">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-5 py-3.5 bg-transparent border border-line rounded-line text-[15px] text-paper placeholder:text-muted/70 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/15 transition-all duration-300 resize-none"
                placeholder="Tell me a bit about the project or role..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-pill-accent justify-center w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  Sending...
                  <span className="arrow-btn-sm !bg-ink !text-white">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                </>
              ) : (
                <>
                  Send message
                  <span className="arrow-btn-sm !bg-ink !text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </>
              )}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}

export default Contact;
