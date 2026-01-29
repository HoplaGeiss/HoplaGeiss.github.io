import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    frontend: false,
    backend: false,
    cicd: false,
    design: false
  });

  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});
  const containerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const skillsData = {
    frontend: {
      skills: ['Angular', 'React', 'TypeScript', 'Micro Frontends', 'JavaScript','Sass', 'RxJS', 'Redux', 'd3.js', 'PrimeNG', 'Angular Material', 'Echarts', 'AG Grid', 'npm Library Creation']
    },
    mobile: {
      skills: ['React Native', 'Expo Go']
    },
    backend: {
      skills: ['Node.js', 'NestJS', 'Java', '.NET', 'Express', 'MongoDB', 'Ruby on Rails', 'PostgreSQL']
    },
    cicd: {
      skills: ['Docker', 'Azure Pipelines', 'GitLab Pipelines', 'Argo CD', 'OpenShift']
    },
    testing: {
      skills: ['Cypress', 'Playwright', 'Vitest', 'Jest']
    },
    other: {
      skills: ['Figma', 'Storybook', 'OAuth2']
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  useEffect(() => {
    const calculateVisibleSkills = () => {
      const newVisibleCounts: Record<string, number> = {};
      
      Object.keys(skillsData).forEach((key) => {
        const container = containerRefs.current[key];
        if (!container) return;
        
        // Create a temporary container to measure
        const tempContainer = document.createElement('div');
        tempContainer.style.cssText = 'position: absolute; visibility: hidden; display: flex; gap: 0.5rem; flex-wrap: nowrap;';
        container.appendChild(tempContainer);
        
        const containerWidth = container.offsetWidth;
        let totalWidth = 0;
        let count = 0;
        
        const skills = skillsData[key as keyof typeof skillsData].skills;
        
        for (let i = 0; i < skills.length; i++) {
          const span = document.createElement('span');
          span.className = 'bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 rounded px-3 py-2 text-sm whitespace-nowrap';
          span.textContent = skills[i];
          tempContainer.appendChild(span);
          
          const spanWidth = span.offsetWidth + 8; // 8px for gap
          
          if (totalWidth + spanWidth <= containerWidth) {
            totalWidth += spanWidth;
            count++;
          } else {
            break;
          }
        }
        
        container.removeChild(tempContainer);
        newVisibleCounts[key] = Math.max(1, count); // Always show at least 1
      });
      
      setVisibleCounts(newVisibleCounts);
    };

    // Initial calculation with a small delay to ensure layout is ready
    const initialTimeout = setTimeout(calculateVisibleSkills, 100);
    
    // Use ResizeObserver to watch for container size changes
    const resizeObserver = new ResizeObserver(() => {
      calculateVisibleSkills();
    });
    
    // Observe all containers
    Object.values(containerRefs.current).forEach(container => {
      if (container) {
        resizeObserver.observe(container);
      }
    });
    
    // Also listen to window resize as fallback
    window.addEventListener('resize', calculateVisibleSkills);
    
    return () => {
      clearTimeout(initialTimeout);
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateVisibleSkills);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Profile Picture */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              <img
                srcSet="/images/profile-200w.jpg 200w, /images/profile-300w.jpg 300w, /images/profile-400w.jpg 400w"
                sizes="(max-width: 768px) 200px, (max-width: 1024px) 300px, 400px"
                src="/images/profile-300w.jpg"
                alt="Gabriel Muller"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-primary shadow-lg shadow-primary/20"
                loading="eager"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/Gabriel_Muller_CV.pdf"
                  download="Gabriel_Muller_CV.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm">{t('contact.downloadCV')}</span>
                </a>
                <a
                  href="https://hoplageiss.github.io/CommitX/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg transition-colors border border-slate-300 dark:border-slate-700 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="text-sm">{t('contact.portfolioApp')}</span>
                </a>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {t('hero.greeting')}
                <br />
                <span className="text-orange-500">Gabriel Muller</span>
              </h1>
              <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 mb-6">
                {t('hero.title')}
              </p>
              <div className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed space-y-2">
                <p>{t('hero.intro1')}</p>
                <p>{t('hero.intro2')}</p>
                <p>{t('hero.intro3')}</p>
                <p>{t('hero.intro4')}</p>
                <p>{t('hero.intro5')}</p>
                <p>{t('hero.intro6')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 px-4 bg-white dark:bg-slate-800 transition-colors">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-orange-500">{t('skills.title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skillsData).map(([key, category]) => {
              const isExpanded = expandedCategories[key];
              const visibleCount = visibleCounts[key] || 5;
              const visibleSkills = isExpanded ? category.skills : category.skills.slice(0, visibleCount);
              const hasMore = category.skills.length > visibleCount;
              
              return (
                <div key={key} className="bg-gray-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-5">
                  <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">{t(`skills.categories.${key}`)}</h3>
                  <div 
                    ref={(el) => { containerRefs.current[key] = el; }}
                    className={`flex gap-2 mb-3 ${isExpanded ? 'flex-wrap' : 'overflow-hidden'}`}
                  >
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
                      {isExpanded ? t('skills.showLess') : `+ ${category.skills.length - visibleCount} ${t('skills.more')}`}
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
          <h2 className="text-3xl font-bold mb-8 text-orange-500">{t('experience.title')}</h2>
          <div className="space-y-8">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-1">{t('experience.jobs.postfinance.title')}</h3>
              <p className="text-orange-500 mb-2">
                <a href="https://www.postfinance.ch" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  PostFinance
                </a> 🇨🇭 • <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded">{t('experience.contract')}</span> • {t('experience.jobs.postfinance.period')}
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-3 italic">{t('experience.jobs.postfinance.subtitle')}</p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>{t('experience.jobs.postfinance.responsibilities.0')}</li>
                <li>{t('experience.jobs.postfinance.responsibilities.1')}</li>
                <li>{t('experience.jobs.postfinance.responsibilities.2')}</li>
                <li>{t('experience.jobs.postfinance.responsibilities.3')}</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-600 pl-6">
              <h3 className="text-xl font-semibold mb-1">{t('experience.jobs.suva.title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                <a href="https://www.suva.ch" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  SUVA
                </a> 🇨🇭 • <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded">{t('experience.contract')}</span> • {t('experience.jobs.suva.period')}
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-3 italic">{t('experience.jobs.suva.subtitle')}</p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>{t('experience.jobs.suva.responsibilities.0')}</li>
                <li>{t('experience.jobs.suva.responsibilities.1')}</li>
                <li>{t('experience.jobs.suva.responsibilities.2')}</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-600 pl-6">
              <h3 className="text-xl font-semibold mb-1">{t('experience.jobs.swissre.title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                <a href="https://www.swissre.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Swiss Re
                </a> 🇨🇭 • <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded">{t('experience.contract')}</span> • {t('experience.jobs.swissre.period')}
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-3 italic">{t('experience.jobs.swissre.subtitle')}</p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>{t('experience.jobs.swissre.responsibilities.0')}</li>
                <li>{t('experience.jobs.swissre.responsibilities.1')}</li>
                <li>{t('experience.jobs.swissre.responsibilities.2')}</li>
                <li>{t('experience.jobs.swissre.responsibilities.3')}</li>
                <li>{t('experience.jobs.swissre.responsibilities.4')}</li>
                <li>{t('experience.jobs.swissre.responsibilities.5')}</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-600 pl-6">
              <h3 className="text-xl font-semibold mb-1">{t('experience.jobs.marksandspencer.title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                <a href="https://www.marksandspencer.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Marks and Spencer
                </a> 🇬🇧 • <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded">{t('experience.contract')}</span> • {t('experience.jobs.marksandspencer.period')}
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-3 italic">{t('experience.jobs.marksandspencer.subtitle')}</p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>{t('experience.jobs.marksandspencer.responsibilities.0')}</li>
                <li>{t('experience.jobs.marksandspencer.responsibilities.1')}</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-600 pl-6">
              <h3 className="text-xl font-semibold mb-1">{t('experience.jobs.managed247.title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                <a href="https://managed.co.uk/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Managed 24/7
                </a> 🇬🇧 • <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-0.5 rounded">{t('experience.permanent')}</span> • {t('experience.jobs.managed247.period')}
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-3 italic">{t('experience.jobs.managed247.subtitle')}</p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>{t('experience.jobs.managed247.responsibilities.0')}</li>
                <li>{t('experience.jobs.managed247.responsibilities.1')}</li>
                <li>{t('experience.jobs.managed247.responsibilities.2')}</li>
                <li>{t('experience.jobs.managed247.responsibilities.3')}</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-600 pl-6">
              <h3 className="text-xl font-semibold mb-1">{t('experience.jobs.workforce.title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                <a href="https://www.workforcesoftware.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  WorkForce Software
                </a> 🇬🇧 • <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-0.5 rounded">{t('experience.permanent')}</span> • {t('experience.jobs.workforce.period')}
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-3 italic">{t('experience.jobs.workforce.subtitle')}</p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>{t('experience.jobs.workforce.responsibilities.0')}</li>
                <li>{t('experience.jobs.workforce.responsibilities.1')}</li>
                <li>{t('experience.jobs.workforce.responsibilities.2')}</li>
                <li>{t('experience.jobs.workforce.responsibilities.3')}</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-600 pl-6">
              <h3 className="text-xl font-semibold mb-1">{t('experience.jobs.unisphere.title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">{t('experience.jobs.unisphere.company')} 🇫🇷 • {t('experience.jobs.unisphere.period')}</p>
              <p className="text-slate-600 dark:text-slate-400 mb-3 italic">{t('experience.jobs.unisphere.subtitle')}</p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>{t('experience.jobs.unisphere.responsibilities.0')}</li>
                <li>{t('experience.jobs.unisphere.responsibilities.1')}</li>
                <li>{t('experience.jobs.unisphere.responsibilities.2')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800 transition-colors">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-orange-500">{t('education.title')}</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-1">{t('education.degrees.cranfield.title')}</h3>
              <p className="text-orange-500 mb-2">{t('education.degrees.cranfield.school')} • {t('education.degrees.cranfield.period')}</p>
              <p className="text-slate-700 dark:text-slate-300">
                {t('education.degrees.cranfield.description')}
              </p>
            </div>

            <div className="border-l-4 border-slate-600 pl-6">
              <h3 className="text-xl font-semibold mb-1">{t('education.degrees.esigelec.title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">{t('education.degrees.esigelec.school')} • {t('education.degrees.esigelec.period')}</p>
              <p className="text-slate-700 dark:text-slate-300">
                {t('education.degrees.esigelec.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800 transition-colors">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-orange-500">{t('languages.title')}</h2>
          <div className="max-w-lg">
            <div className="space-y-3">
              {[
                { key: 'french', level: 5, labelKey: 'native' },
                { key: 'alsatian', level: 5, labelKey: 'native' },
                { key: 'english', level: 5, labelKey: 'fluent' },
                { key: 'german', level: 3.5, labelKey: 'c1' },
                { key: 'polish', level: 1.5, labelKey: 'basic' }
              ].map((lang) => (
                <div key={lang.key} className="flex items-center gap-3">
                  <span className="text-slate-700 dark:text-slate-300 font-medium w-24 text-sm">{t(`languages.list.${lang.key}`)}</span>
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
                    <span className="text-slate-600 dark:text-slate-400 text-xs w-14">{t(`languages.levels.${lang.labelKey}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-orange-500">{t('hobbies.title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-6 hover:border-primary transition-colors">
              <div className="text-4xl mb-3 text-center">⛰️</div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 text-center">{t('hobbies.items.mountaineering.title')}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t('hobbies.items.mountaineering.description')}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-6 hover:border-primary transition-colors">
              <div className="text-4xl mb-3 text-center">🏀</div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 text-center">{t('hobbies.items.basketball.title')}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t('hobbies.items.basketball.description')}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-6 hover:border-primary transition-colors">
              <div className="text-4xl mb-3 text-center">💻</div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 text-center">{t('hobbies.items.technology.title')}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t('hobbies.items.technology.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-orange-500">{t('contact.title')}</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
            {t('contact.intro')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <a
              href="/Gabriel_Muller_CV.pdf"
              download="Gabriel_Muller_CV.pdf"
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t('contact.downloadCV')}
            </a>
            <a
              href="mailto:gabriel.muller.12@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg transition-colors border border-slate-300 dark:border-slate-700"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t('contact.emailMe')}
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
              {t('contact.viewGithub')}
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
              {t('contact.linkedin')}
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
              {t('contact.portfolioApp')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
