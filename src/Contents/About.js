import Container from '../Components/ui/Container';
import SectionHeading from '../Components/ui/SectionHeading';

const roles = [
  'Frontend Development',
  'Full-Stack Development',
  'MERN Stack Development',
];

const intro = [
  { text: 'I build user interfaces with ' },
  { text: 'React and Next.js', mark: true },
  { text: ' and work with ' },
  { text: 'Node.js, Express, and MongoDB', mark: true },
  { text: ' to develop application features across the stack. My experience includes ' },
  { text: 'frontend development in a professional internship', mark: true },
  { text: ' and hands-on work with ' },
  { text: 'authentication, APIs, and role-based access control', mark: true },
  { text: '.' },
];

const background = [
  {
    kind: 'Education',
    period: '2021 – 2025',
    title: 'B.E. Computer Engineering',
    org: 'Zeal College of Engineering and Research, Pune',
    summary: [
      { text: 'Completed a ' },
      { text: 'minor in Data Science', mark: true },
      { text: ' alongside the core curriculum.' },
    ],
  },
  {
    kind: 'Internship',
    period: 'Nov 2024 – Feb 2025',
    title: 'Frontend Developer Intern',
    org: 'Fulcrum Resources Infinity Pvt. Ltd., Pune',
    summary: [
      { text: 'Contributed to the frontend of an internal HR management product using ' },
      { text: 'React, Next.js and Tailwind CSS', mark: true },
      { text: ', building ' },
      { text: 'pages that supported employee and HR workflows', mark: true },
      { text: '.' },
    ],
  },
];

function Rich({ parts }) {
  return parts.map((part, index) =>
    part.mark ? (
      <strong key={index} className="font-bold text-foreground">
        {part.text}
      </strong>
    ) : (
      <span key={index}>{part.text}</span>
    )
  );
}

function About() {
  return (
    <section
      id="about"
      aria-label="About"
      className="relative bg-canvas py-section-y"
    >
      <Container>
        <div className="mb-section-head" data-aos="fade-up">
          <SectionHeading title="About" />
        </div>

        <div
          className="grid gap-12 lg:grid-cols-12 lg:gap-16"
          data-aos="fade-up"
        >
          <div className="min-w-0 lg:col-span-8">
            <p className="text-balance font-sans text-heading font-semibold leading-snug text-foreground">
              I’m a Computer Engineering graduate focused on frontend and
              full-stack web development.
            </p>

            <p className="mt-6 max-w-prose text-body leading-relaxed text-muted sm:text-body-lg">
              <Rich parts={intro} />
            </p>
          </div>

          <ul aria-label="Development focus" className="lg:col-span-4">
            {roles.map((role) => (
              <li
                key={role}
                className="border-t border-line py-4 text-body font-medium text-foreground last:border-b"
              >
                {role}
              </li>
            ))}
          </ul>
        </div>

        <ul
          aria-label="Education and internship"
          className="mt-16 divide-y divide-line border-y border-line sm:mt-20"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {background.map((item) => (
            <li
              key={item.title}
              className="grid gap-4 py-7 sm:py-9 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-3">
                <h3 className="font-sans text-body font-semibold text-foreground">
                  {item.kind}
                </h3>
                <p className="mt-1 font-mono text-caption tabular-nums text-muted">
                  {item.period}
                </p>
              </div>

              <div className="min-w-0 lg:col-span-9">
                <h4 className="font-sans text-title font-semibold text-foreground">
                  {item.title}
                </h4>
                <p className="mt-1 text-body text-muted-strong">{item.org}</p>
                <p className="mt-4 max-w-prose text-body leading-relaxed text-muted">
                  <Rich parts={item.summary} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default About;