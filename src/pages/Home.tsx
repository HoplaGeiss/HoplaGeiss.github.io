import { useState } from 'react';

export default function Home() {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    frontend: false,
    backend: false,
    cicd: false,
    design: false
  });

  const VISIBLE_SKILLS_COUNT = 5;

  const skillsData = {
    frontend: {
      title: "Front End",
      skills: ['Angular', 'React', 'TypeScript', 'Micro Frontends', 'JavaScript','Sass', 'RxJS', 'Redux', 'd3.js', 'PrimeNG', 'Angular Material', 'Echarts', 'AG Grid', 'npm Library Creation']
    },
    mobile: {
      title: "Mobile",
      skills: ['React Native', 'Expo Go']
    },
    backend: {
      title: "Back End",
      skills: ['Node.js', 'NestJS', 'Java', '.NET', 'Express', 'MongoDB', 'Ruby on Rails', 'PostgreSQL']
    },
    cicd: {
      title: "CI/CD",
      skills: ['Docker', 'Azure Pipelines', 'GitLab Pipelines', 'Argo CD', 'OpenShift']
    },
    testing: {
      title: "Testing",
      skills: ['Cypress', 'Playwright', 'Vitest', 'Jest']
    },
    other: {
      title: "Other",
      skills: ['Figma', 'Storybook', 'OAuth2']
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <img
                srcSet="/hoplaWeb/images/profile-200w.jpg 200w, /hoplaWeb/images/profile-300w.jpg 300w, /hoplaWeb/images/profile-400w.jpg 400w"
                sizes="(max-width: 768px) 200px, (max-width: 1024px) 300px, 400px"
                src="/hoplaWeb/images/profile-300w.jpg"
                alt="Gabriel Muller"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-primary shadow-lg shadow-primary/20"
                loading="eager"
              />
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Hi, I'm <span className="text-orange-500">Gabriel Muller</span>
              </h1>
              <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 mb-6">
                Senior Fullstack Developer (JS/TS Focus)
              </p>
              <div className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed space-y-2">
                <p>Software engineer with 10 years of experience.</p>
                <p>In my last four roles, I led the UI architecture of front-end applications and have experience leading up to 10 UI developers across multiple scrum teams.</p>
                <p>Highly hands-on with a strong focus on end-to-end testing (Cypress, Playwright) and owning/optimizing UI CI/CD pipelines.</p>
                <p>Experienced with multiple backend technologies—strongest with Node.js/NestJS, but comfortable with Ruby, .NET, and Java.</p>
                <p>Comfortable working independently or leading multiple developers in agile environments.</p>
                <p>I hold two MSc degrees—one in Parallel and Distributed Computing and another in IT Management.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 px-4 bg-white dark:bg-slate-800 transition-colors">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-orange-500">Skills & Technologies</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skillsData).map(([key, category]) => {
              const isExpanded = expandedCategories[key];
              const visibleSkills = isExpanded ? category.skills : category.skills.slice(0, VISIBLE_SKILLS_COUNT);
              const hasMore = category.skills.length > VISIBLE_SKILLS_COUNT;
              
              return (
                <div key={key} className="bg-gray-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-5">
                  <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">{category.title}</h3>
                  <div className={`flex gap-2 mb-3 ${isExpanded ? 'flex-wrap' : 'flex-nowrap overflow-x-auto'}`}>
                    {visibleSkills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 rounded px-3 py-2 text-sm hover:border-primary transition-colors whitespace-nowrap"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  {hasMore && (
                    <button
                      onClick={() => toggleCategory(key)}
                      className="text-sm text-orange-500 hover:text-orange-600 hover:underline transition-colors font-medium cursor-pointer"
                    >
                      {isExpanded ? '− Show less' : `+ ${category.skills.length - VISIBLE_SKILLS_COUNT} more`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-orange-500">Experience</h2>
          <div className="space-y-8">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-1">Lead Angular Developer</h3>
              <p className="text-orange-500 mb-2">
                <a href="https://www.postfinance.ch" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  PostFinance
                </a> 🇨🇭 • <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded">Contract</span> • July 2025 - Present
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-3 italic">Analytics Team - Internal Reporting Tool</p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>Developing advanced internal reporting tool for stakeholders to create reports and insights on PostFinance databases</li>
                <li>Working with Angular 18, Angular Material, and ECharts</li>
                <li>Leading end-to-end test implementation with Playwright</li>
                <li>Setting up and maintaining GitLab CI/CD pipelines</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-600 pl-6">
              <h3 className="text-xl font-semibold mb-1">Lead Angular Developer</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                <a href="https://www.suva.ch" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  SUVA
                </a> 🇨🇭 • <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded">Contract</span> • July 2024 - December 2024 (6 months)
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-3 italic">Internal Web Applications - Client Claims Processing</p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>Developed and maintained four internal web applications used by ~500 colleagues</li>
                <li>Built features using Angular 18, PrimeNG, and Redux</li>
                <li>Created and maintained end-to-end tests with Playwright</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-600 pl-6">
              <h3 className="text-xl font-semibold mb-1">Lead Angular / Java Developer</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                <a href="https://www.swissre.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Swiss Re
                </a> 🇨🇭 • <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded">Contract</span> • November 2019 - June 2024 (~4.5 years)
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-3 italic">Finance Department - Angular Modernization</p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>Led UI architecture across multiple teams (10 front-end developers across 6 scrum teams)</li>
                <li>Created a shared UI components library from scratch used by all teams (45+ components, based on Angular Material)</li>
                <li>Built numerous Angular [8-17] applications to modernize finance department processes</li>
                <li>Owned and maintained front-end Azure CI/CD pipelines</li>
                <li>Created and maintained backend APIs in Java</li>
                <li>Led Cypress end-to-end testing implementation with Docker</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-600 pl-6">
              <h3 className="text-xl font-semibold mb-1">Senior JS / React Developer</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                <a href="https://www.marksandspencer.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Marks and Spencer
                </a> 🇬🇧 • <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded">Contract</span> • February 2019 - November 2019 (9 months)
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-3 italic">Sofa Configurator Project</p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>Led development of store locator map integration using Vanilla JS and Bing Maps V8</li>
                <li>Built interactive sofa configurator application using React.js</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-600 pl-6">
              <h3 className="text-xl font-semibold mb-1">Lead Angular / Node Developer</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                <a href="https://managed.co.uk/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Managed 24/7
                </a> 🇬🇧 • <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-0.5 rounded">Permanent</span> • April 2017 - January 2019 (~2 years)
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-3 italic">Cloud-based Real-time Analytics System</p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>Architected full-stack application from scratch using Angular 6, Node.js, Express, and MongoDB</li>
                <li>Built custom real-time data visualization using d3.js, Socket.io, and SignalR</li>
                <li>Developed highly customizable dashboards using Gridster.js, RxJS, and Redux</li>
                <li>Researched and implemented CI/CD pipeline using Docker, Codeship, and Quay.io</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-600 pl-6">
              <h3 className="text-xl font-semibold mb-1">Angular Developer / Scrum Master</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                <a href="https://www.workforcesoftware.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  WorkForce Software
                </a> 🇬🇧 • <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-0.5 rounded">Permanent</span> • March 2016 - February 2017 (~1 year)
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-3 italic">Scheduling and Forecasting SaaS Solution</p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>Facilitated scrum ceremonies including grooming, sprint planning, and retrospectives</li>
                <li>Drove continuous improvement initiatives that increased team productivity</li>
                <li>Increased Angular.js unit test coverage from 60% to 90%</li>
                <li>Led automated end-to-end testing implementation</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-600 pl-6">
              <h3 className="text-xl font-semibold mb-1">Startup Co-founder</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">Unisphere 🇫🇷 • September 2014 - March 2016 (~1.5 years)</p>
              <p className="text-slate-600 dark:text-slate-400 mb-3 italic">Cloud-based Virtual Learning Environment</p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>Built Angular.js / Ruby on Rails MVP in 5 months, deployed to 5 universities</li>
                <li>Selected to join both Strasbourg and Oxford incubators</li>
                <li>Gained extensive experience in SaaS product lifecycle, UX/UI development, customer success, and investor pitching</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800 transition-colors">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-orange-500">Education</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-1">MSc in Distributed & Parallel Computing</h3>
              <p className="text-orange-500 mb-2">Cranfield University, UK • September 2013 - September 2014</p>
              <p className="text-slate-700 dark:text-slate-300">
                Focused on parallel computing and high-performance computing. 
                Gained hands-on experience in virtualization, containerization, and cloud computing 
                through the university's cutting-edge supercomputer facility ASTRAL.
              </p>
            </div>

            <div className="border-l-4 border-slate-600 pl-6">
              <h3 className="text-xl font-semibold mb-1">MSc in IT Management</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">Rouen Engineering School (ESIGELEC), France • September 2013 - September 2014</p>
              <p className="text-slate-700 dark:text-slate-300">
                Developed comprehensive understanding of computer science through hands-on experience 
                with multiple programming languages and technologies. Project-based curriculum built 
                strong communication and collaboration skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800 transition-colors">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-orange-500">Languages</h2>
          <div className="max-w-lg">
            <div className="space-y-3">
              {[
                { name: 'French', level: 5, label: 'Native' },
                { name: 'Alsatian', level: 5, label: 'Native' },
                { name: 'English', level: 4, label: 'Fluent' },
                { name: 'German', level: 3.5, label: 'C1' },
                { name: 'Polish', level: 1.5, label: 'Basic' }
              ].map((lang) => (
                <div key={lang.name} className="flex items-center gap-3">
                  <span className="text-slate-700 dark:text-slate-300 font-medium w-24 text-sm">{lang.name}</span>
                  <div className="flex gap-1.5 flex-1 max-w-xs">
                    {[1, 2, 3, 4, 5].map((dot) => {
                      const isFilled = dot <= lang.level;
                      const isHalfFilled = dot - 0.5 === lang.level;
                      return (
                        <div
                          key={dot}
                          className={`h-3 flex-1 rounded-full transition-colors ${
                            isFilled
                              ? 'bg-slate-800 dark:bg-slate-300'
                              : isHalfFilled
                              ? 'bg-slate-400 dark:bg-slate-400'
                              : 'bg-slate-300 dark:bg-slate-700'
                          }`}
                        />
                      );
                    })}
                  </div>
                    <span className="text-slate-600 dark:text-slate-400 text-xs w-14">{lang.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-orange-500">Interests & Hobbies</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-6 hover:border-primary transition-colors">
              <div className="text-4xl mb-3 text-center">⛰️</div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 text-center">Mountaineering</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Passionate about alpine adventures including summiting Mont Blanc, tour skiing the Haute Route, and trail running in the mountains.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-6 hover:border-primary transition-colors">
              <div className="text-4xl mb-3 text-center">🏀</div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 text-center">Basketball</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Played competitively for 12 years in regional teams, developing teamwork, discipline, and leadership skills on and off the court.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-6 hover:border-primary transition-colors">
              <div className="text-4xl mb-3 text-center">💻</div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 text-center">Technology</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Co-founded a tech startup, created mobile apps, contribute to open source projects, and maintain a development blog to share knowledge with the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-orange-500">Get In Touch</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <a
              href="/hoplaWeb/Gabriel_Muller_CV.pdf"
              download="Gabriel_Muller_CV.pdf"
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV
            </a>
            <a
              href="mailto:gabriel.muller.12@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg transition-colors border border-slate-300 dark:border-slate-700"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Me
            </a>
            <a
              href="https://github.com/HoplaGeiss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg transition-colors border border-slate-300 dark:border-slate-700"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View GitHub
            </a>
            <a
              href="https://uk.linkedin.com/in/mullergab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg transition-colors border border-slate-300 dark:border-slate-700"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a
              href="https://hoplageiss.github.io/CommitX/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg transition-colors border border-slate-300 dark:border-slate-700"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Portfolio App
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
