/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  MapPin,
  Moon,
  Sun
} from 'lucide-react';
import {
  SITE_CONTENT,
  ARTICLE_CATEGORIES,
  CvData,
  CvSection
} from './contentData';
import { getInitialQuote } from './quotesData';

function GithubIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

type PageRoute = 'home' | 'cv';
type CvTab = 'professional' | 'academic';

function resolveInitialRoute(): { page: PageRoute; cvTab?: CvTab } {
  if (typeof window === 'undefined') return { page: 'home' };
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();

  if (hash === 'cv/academic') {
    return { page: 'cv', cvTab: 'academic' };
  }
  if (hash.startsWith('cv')) {
    return { page: 'cv', cvTab: 'professional' };
  }
  return { page: 'home' };
}

export default function App() {
  const initialRoute = resolveInitialRoute();
  const [activePage, setActivePage] = useState<PageRoute>(initialRoute.page);
  const [activeCvTab, setActiveCvTab] = useState<CvTab>(
    initialRoute.cvTab || 'professional'
  );
  const [portraitFailed, setPortraitFailed] = useState(false);
  const [currentQuote] = useState(() => getInitialQuote());

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('julio-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('julio-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  useEffect(() => {
    const handleHashOrPop = () => {
      const route = resolveInitialRoute();
      setActivePage(route.page);
      if (route.cvTab) {
        setActiveCvTab(route.cvTab);
      }
    };
    window.addEventListener('hashchange', handleHashOrPop);
    window.addEventListener('popstate', handleHashOrPop);
    return () => {
      window.removeEventListener('hashchange', handleHashOrPop);
      window.removeEventListener('popstate', handleHashOrPop);
    };
  }, []);

  const navigateTo = (page: PageRoute, cvTab?: CvTab) => {
    setActivePage(page);
    if (cvTab) {
      setActiveCvTab(cvTab);
    }

    if (page === 'home') {
      window.history.pushState(null, '', './');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'cv') {
      const targetTab = cvTab || activeCvTab;
      window.history.pushState(
        null,
        '',
        targetTab === 'academic' ? '#cv/academic' : '#cv'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const { profile, articles, cvs } = SITE_CONTENT;
  const currentCv: CvData =
    activeCvTab === 'professional' ? cvs.professional : cvs.academic;

  const renderCvSection = (section: CvSection) => {
    switch (section.type) {
      case 'paragraph':
        return (
          <section key={section.title} className="space-y-2">
            <h3 className="text-xs font-mono font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-1.5">
              {section.title}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {section.content}
            </p>
          </section>
        );

      case 'key-value-list':
        return (
          <section key={section.title} className="space-y-2.5">
            <h3 className="text-xs font-mono font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-1.5">
              {section.title}
            </h3>
            <div className="space-y-2 text-sm">
              {section.items.map((item) => (
                <div key={item.label} className="leading-relaxed">
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {item.label}:{' '}
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'entries':
        return (
          <section key={section.title} className="space-y-4">
            <h3 className="text-xs font-mono font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-1.5">
              {section.title}
            </h3>
            <div className="space-y-5">
              {section.entries.map((entry) => (
                <div
                  key={`${entry.organization}-${entry.period}`}
                  className="space-y-1.5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {entry.organization}
                    </h4>
                    <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 tabular-nums">
                      {entry.period}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span>{entry.role}</span>
                    <span>{entry.location}</span>
                  </div>
                  {entry.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed pt-0.5">
                      {entry.bullets.map((bullet, idx) => (
                        <li key={idx}>
                          {bullet.label && (
                            <span className="font-medium text-neutral-900 dark:text-neutral-100">
                              {bullet.label}:{' '}
                            </span>
                          )}
                          <span>{bullet.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case 'bullet-list':
        return (
          <section key={section.title} className="space-y-2.5">
            <h3 className="text-xs font-mono font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-1.5">
              {section.title}
            </h3>
            <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {section.items.map((item, idx) => (
                <li key={idx}>
                  {item.label && (
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {item.label}{' '}
                    </span>
                  )}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0A0A0A] text-neutral-900 dark:text-neutral-100 transition-colors duration-150">
      {/* Minimal Top Bar — 3-Zone Contract */}
      <header className="w-full border-b border-neutral-200/70 dark:border-neutral-800/70 bg-[#FAFAFA]/90 dark:bg-[#0A0A0A]/90 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="./"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('home');
            }}
            className="text-sm font-medium tracking-tight text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors whitespace-nowrap shrink-0"
          >
            {profile.name}
          </a>

          {/* Zone 2: Minimal navigation links */}
          <nav
            aria-label="Primary navigation"
            className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400"
          >
            <a
              href="./"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home');
              }}
              className={`hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 ${
                activePage === 'home'
                  ? 'text-neutral-900 dark:text-neutral-100'
                  : ''
              }`}
            >
              Home
            </a>
            <a
              href="#cv"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('cv');
              }}
              className={`hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 ${
                activePage === 'cv'
                  ? 'text-neutral-900 dark:text-neutral-100'
                  : ''
              }`}
            >
              CV
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0"
            >
              GitHub
            </a>
          </nav>

          {/* Zone 3: 1 primary action (Light/Dark Theme Switch) */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 sm:py-16">
        {activePage === 'home' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
            {/* Left Column: Minimal Bio + Minimal Articles List (leerob style) */}
            <div className="md:col-span-7 space-y-12">
              {/* Bio Section */}
              <section aria-labelledby="bio-heading" className="space-y-5">
                <div className="space-y-1">
                  <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{profile.location}</span>
                  </p>
                  <h1
                    id="bio-heading"
                    className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
                  >
                    {profile.name}
                  </h1>
                </div>

                <div className="space-y-4 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                  <p>
                    I am a PhD Mathematician at the University of Regensburg transitioning into applied cryptography. My work bridges rigorous theoretical foundations in number theory, arithmetic geometry, elliptic curves, and lattices with practical, executable implementations in Python and SageMath.
                  </p>
                  <p>
                    Recently, I completed my doctoral dissertation on the Shintani cocycle decomposition of topological polylogarithms (magna cum laude), ranked in the top 1% globally on CryptoHack CTF, and serve as an elliptic curve cryptanalysis judge for the{' '}
                    <a
                      href={profile.curveSmashUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-900 dark:text-neutral-100 underline decoration-neutral-400 dark:decoration-neutral-600 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 underline-offset-4 transition-colors"
                    >
                      Yukon CurveSmash project
                    </a>
                    .
                  </p>
                </div>

                {/* Minimal Links Row */}
                <div className="pt-1 flex flex-wrap items-center gap-5 text-sm text-neutral-600 dark:text-neutral-400">
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100 underline decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 underline-offset-4 transition-colors whitespace-nowrap shrink-0"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </section>

              {/* Articles Section — Grouped by Cryptography, Math, and General (only non-empty categories shown) */}
              <section aria-labelledby="articles-heading" className="space-y-5">
                <h2
                  id="articles-heading"
                  className="text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
                >
                  Articles
                </h2>

                <div className="space-y-6">
                  {ARTICLE_CATEGORIES.map((cat) => {
                    const groupArticles = articles.filter(
                      (a) => a.category === cat.id
                    );
                    if (groupArticles.length === 0) return null;

                    return (
                      <div key={cat.id} className="space-y-2">
                        <h3 className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                          {cat.label}
                        </h3>
                        <ul className="space-y-2 text-[15px]">
                          {groupArticles.map((article) => (
                            <li key={article.slug}>
                              {article.external ? (
                                <a
                                  href={article.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 underline decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 underline-offset-4 transition-colors"
                                >
                                  <span>{article.title}</span>
                                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
                                </a>
                              ) : (
                                <a
                                  href={article.href}
                                  className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 underline decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 underline-offset-4 transition-colors"
                                >
                                  {article.title}
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Right Column: Bigger Picture that scrolls down with the page (sticky) + Quote */}
            <div className="md:col-span-5 md:sticky md:top-24 flex flex-col items-start md:items-end">
              <div className="w-full max-w-sm md:max-w-none overflow-hidden rounded-lg border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100 dark:bg-neutral-900">
                {!portraitFailed ? (
                  <img
                    src={profile.portraitPath}
                    alt={profile.portraitAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setPortraitFailed(true)}
                    className="w-full aspect-[3/4] object-cover object-center"
                  />
                ) : (
                  <div className="w-full aspect-[3/4] flex flex-col items-center justify-center p-4 text-center bg-neutral-100 dark:bg-neutral-900 text-neutral-500">
                    <span className="font-mono text-lg font-semibold text-neutral-700 dark:text-neutral-300">
                      JMB
                    </span>
                    <span className="text-xs mt-1">{profile.name}</span>
                  </div>
                )}
              </div>
              <span className="mt-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                {profile.portraitCaption}
              </span>

              {currentQuote && (
                <figure className="mt-6 pt-5 border-t border-neutral-200/70 dark:border-neutral-800/70 w-full max-w-sm md:max-w-none text-left md:text-right">
                  <blockquote className="font-serif italic text-[18px] leading-relaxed text-neutral-700 dark:text-neutral-300 whitespace-pre-line">
                    “{currentQuote.text}”
                  </blockquote>
                  {currentQuote.attribution && (
                    <figcaption className="mt-1.5 font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
                      — {currentQuote.attribution}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          </div>
        )}

        {/* Dedicated CV Page — HTML Only + Intentional Download Button */}
        {activePage === 'cv' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                  Curriculum Vitae
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Segmented Switcher: Professional CV vs Academic CV */}
                <div
                  role="tablist"
                  aria-label="CV Type Selection"
                  className="inline-flex items-center p-1 bg-neutral-200/60 dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-neutral-800"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeCvTab === 'professional'}
                    onClick={() => {
                      setActiveCvTab('professional');
                      window.history.replaceState(null, '', '#cv');
                    }}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeCvTab === 'professional'
                        ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-2xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                    }`}
                  >
                    Professional CV
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeCvTab === 'academic'}
                    onClick={() => {
                      setActiveCvTab('academic');
                      window.history.replaceState(null, '', '#cv/academic');
                    }}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeCvTab === 'academic'
                        ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-2xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                    }`}
                  >
                    Academic CV
                  </button>
                </div>

                {/* Intentional PDF Download Link */}
                <a
                  href={currentCv.pdfPath}
                  download={currentCv.downloadFilename}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            <div className="space-y-8">
              {/* CV Document Header (No email or phone number rendered in HTML) */}
              <div className="pb-6 border-b border-neutral-200 dark:border-neutral-800 space-y-1.5">
                <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                  {currentCv.header.name}
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {currentCv.header.title}
                </p>
                <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 pt-1">
                  {currentCv.header.location}
                </p>
              </div>

              {/* Render All Sections of the Active CV */}
              {currentCv.sections.map((section) => renderCvSection(section))}

              {currentCv.footerNote && (
                <p className="pt-4 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                  {currentCv.footerNote}
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Clean Minimal Footer */}
      <footer className="w-full border-t border-neutral-200/70 dark:border-neutral-800/70 mt-auto">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <span>{profile.name}</span>
          <div className="flex items-center gap-5">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              GitHub
            </a>
            <a
              href="#cv"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('cv', 'professional');
              }}
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              CV
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
