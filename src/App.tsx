import React, {useMemo, useState} from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  Menu,
  Phone,
  X,
} from 'lucide-react';
import {
  ASRL_FIGURES,
  ASRL_UPDATE_PDF,
  CAMPUS_INVOLVEMENT,
  COURSEWORK_ITEMS,
  COURSEWORK_SUMMARY,
  CourseworkItem,
  EXPERIENCES,
  HERO_METRICS,
  HONORS_AWARDS,
  PROFILE,
  PROJECTS,
  ProjectCategory,
  ProjectItem,
  RESEARCH_MODULES,
  RESEARCH_REPOS,
  SKILL_GROUPS,
} from './data/portfolioData';
import {ProjectSchematic} from './components/ProjectSchematics';
import {ProjectModal} from './components/ProjectModal';
import {ResumeModal} from './components/ResumeModal';
import {ResearchFigureModal} from './components/ResearchFigureModal';

const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All',
  'Aerospace & Structures',
  'Astrodynamics & Simulation',
  'Mechanical & Hardware',
];

type CourseworkTab = 'All' | CourseworkItem['group'];

const COURSEWORK_TABS: {id: CourseworkTab; label: string}[] = [
  {id: 'All', label: 'All Coursework'},
  {id: 'Fall 2026 & Spring 2027', label: 'Fall 2026 & Spring 2027'},
  {id: 'Completed Core', label: 'Completed (B- & Above)'},
  {id: 'Senior Sequence', label: 'Senior Sequence'},
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [originFilter, setOriginFilter] = useState<'All' | 'School Project' | 'Personal Project'>('All');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeModuleId, setActiveModuleId] = useState<string>(RESEARCH_MODULES[0].id);
  const [activeCourseTab, setActiveCourseTab] = useState<CourseworkTab>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeFigureIndex, setActiveFigureIndex] = useState<number | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const schoolCount = PROJECTS.filter((p) => p.origin === 'School Project').length;
  const personalCount = PROJECTS.filter((p) => p.origin === 'Personal Project').length;
  const heroFigure = ASRL_FIGURES[3];

  const activeModule = useMemo(
    () => RESEARCH_MODULES.find((m) => m.id === activeModuleId) ?? RESEARCH_MODULES[0],
    [activeModuleId],
  );

  const filteredCoursework = useMemo(() => {
    if (activeCourseTab === 'All') return COURSEWORK_ITEMS;
    return COURSEWORK_ITEMS.filter((item) => item.group === activeCourseTab);
  }, [activeCourseTab]);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCat = activeCategory === 'All' || project.category === activeCategory;
      const matchesOrigin = originFilter === 'All' || project.origin === originFilter;
      const matchesSkill =
        !selectedSkill ||
        project.tools.some((t) => t.toLowerCase().includes(selectedSkill.toLowerCase())) ||
        project.highlights.some((h) => h.toLowerCase().includes(selectedSkill.toLowerCase())) ||
        project.summary.toLowerCase().includes(selectedSkill.toLowerCase());
      return matchesCat && matchesOrigin && matchesSkill;
    });
  }, [activeCategory, originFilter, selectedSkill]);

  const handleSelectSkill = (skillName: string) => {
    const normalized = skillName.split(' / ')[0];
    if (selectedSkill === normalized) {
      setSelectedSkill(null);
      return;
    }
    setSelectedSkill(normalized);
    setActiveCategory('All');
    setOriginFilter('All');
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const isUnfilteredAll =
    activeCategory === 'All' && originFilter === 'All' && !selectedSkill;

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink transition-colors duration-200">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-canvas/92 backdrop-blur-sm border-b border-line">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Wordmark */}
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-ink whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {PROFILE.name}
          </a>

          {/* Zone 2: 5 Concise Single-Line Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-ink-muted"
          >
            <a
              href="#research"
              className="hover:text-ink hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Research
            </a>
            <a
              href="#projects"
              className="hover:text-ink hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="hover:text-ink hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Skills
            </a>
            <a
              href="#coursework"
              className="hover:text-ink hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Coursework
            </a>
            <a
              href="#experience"
              className="hover:text-ink hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Experience
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-accent-fg bg-accent hover:bg-accent-hover rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Resume PDF
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-lg text-ink-secondary hover:bg-subtle transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Nav */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="md:hidden border-t border-line bg-surface px-4 py-3 flex flex-col gap-1"
          >
            {[
              {href: '#research', label: 'Research'},
              {href: '#projects', label: 'Projects'},
              {href: '#skills', label: 'Skills'},
              {href: '#coursework', label: 'Coursework'},
              {href: '#experience', label: 'Experience'},
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-2 text-sm font-medium text-ink-secondary hover:text-ink hover:bg-subtle rounded-md"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* SECTION 1: Split-Screen Hero & 4-Column Engineering Strip */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-14 sm:pt-14 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Hero Left: Typography & Primary Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between py-2">
              <div className="space-y-5">
                <p className="text-xs sm:text-sm font-medium text-ink-muted">
                  {PROFILE.university} <span aria-hidden="true">·</span> {PROFILE.degree}{' '}
                  <span aria-hidden="true">·</span> Class of {PROFILE.graduation}
                </p>

                <h1 className="text-[clamp(2.1rem,3.6vw,3.25rem)] font-bold tracking-tight leading-[1.1] text-ink text-balance">
                  {PROFILE.heroHeadline}
                </h1>

                <p className="text-[15px] sm:text-base text-ink-secondary leading-relaxed max-w-xl">
                  {PROFILE.heroLead}
                </p>
              </div>

              <div className="pt-8 space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-accent-fg bg-accent hover:bg-accent-hover rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Explore Projects</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setResumeOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-ink bg-surface border border-line hover:border-line-strong hover:bg-subtle rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-ink-muted" />
                    <span>View Resume PDF</span>
                  </button>
                </div>

                {/* Direct Contact Links */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-muted">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-accent-text transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>github.com/dbethman</span>
                  </a>
                  <span aria-hidden="true" className="text-line-strong">
                    ·
                  </span>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-accent-text transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>linkedin.com/in/dbethman</span>
                  </a>
                  <span aria-hidden="true" className="text-line-strong">
                    ·
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 hover:text-accent-text transition-colors cursor-pointer"
                  >
                    {emailCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-success" />
                        <span className="text-success font-medium">Copied {PROFILE.email}</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-3.5 h-3.5" />
                        <span>{PROFILE.email}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Right: Featured ASRL Research Output */}
            <div className="lg:col-span-6 flex flex-col">
              <button
                type="button"
                onClick={() => setActiveFigureIndex(3)}
                className="group flex flex-col justify-between h-full text-left bg-surface border border-line hover:border-line-strong rounded-2xl overflow-hidden transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <div className="px-5 py-3.5 border-b border-line flex items-center justify-between gap-3 bg-surface">
                  <span className="text-xs font-medium text-ink-secondary">
                    ASRL Computational Research
                  </span>
                  <span className="text-xs font-mono text-ink-muted">
                    Earth–Moon CR3BP · ASSET
                  </span>
                </div>

                <div className="flex-1 min-h-[260px] bg-white p-4 sm:p-5 flex items-center justify-center overflow-hidden">
                  <img
                    src={heroFigure.imagePath}
                    alt={`${heroFigure.title} — ${heroFigure.subtitle}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full max-h-[320px] object-contain transition-transform duration-200 group-hover:scale-[1.015]"
                  />
                </div>

                <div className="px-5 py-4 border-t border-line bg-surface flex items-end justify-between gap-4">
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-sm font-bold text-ink group-hover:text-accent-text transition-colors truncate">
                      {heroFigure.title}
                    </p>
                    <p className="text-xs text-ink-muted truncate">
                      {heroFigure.subtitle}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-text whitespace-nowrap shrink-0">
                    <span>Zoom Plot</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* 4-Column Summary Strip Below Hero Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-8 border-t border-line">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label} className="space-y-1">
                <p className="text-xs font-medium text-ink-muted">{metric.label}</p>
                <p className="text-lg font-bold tracking-tight text-ink tabular-nums">
                  {metric.value}
                </p>
                <p className="text-xs text-ink-secondary leading-relaxed">{metric.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Featured Research — Astrodynamics & Space Research Laboratory */}
        <section id="research" className="bg-surface border-y border-line py-14 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-line">
              <div className="max-w-2xl space-y-2">
                <p className="text-xs font-medium text-accent-text">
                  Undergraduate Research · Spring 2026 – Present · Tuscaloosa, AL
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink text-balance">
                  Astrodynamics and Space Research Laboratory
                </h2>
              </div>
              <p className="text-sm text-ink-muted md:text-right">
                Advised by Dr. Rohan Sood <span aria-hidden="true">·</span> Weekly Research Reviews
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
              {/* Module Selector Column */}
              <div className="lg:col-span-5 flex flex-col divide-y divide-line border border-line rounded-xl overflow-hidden bg-canvas/55">
                {RESEARCH_MODULES.map((mod) => {
                  const isActive = mod.id === activeModule.id;
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => setActiveModuleId(mod.id)}
                      className={`text-left px-5 py-4 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent ${
                        isActive ? 'bg-surface' : 'hover:bg-surface/65'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span
                          className={`text-xs font-mono tabular-nums ${
                            isActive ? 'text-accent-text font-semibold' : 'text-ink-muted'
                          }`}
                        >
                          {mod.index}.
                        </span>
                        <span className="text-xs text-ink-muted truncate">
                          {mod.methods.slice(0, 2).join(' · ')}
                        </span>
                      </div>
                      <p
                        className={`text-sm font-semibold ${
                          isActive ? 'text-ink' : 'text-ink-secondary'
                        }`}
                      >
                        {mod.title}
                      </p>
                      <p className="text-xs text-ink-muted mt-1">{mod.focus}</p>
                    </button>
                  );
                })}
              </div>

              {/* Active Module Detail Stage */}
              <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 bg-canvas/40 border border-line rounded-xl">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-mono text-accent-text mb-1">
                      {activeModule.index}. {activeModule.focus}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
                      {activeModule.title}
                    </h3>
                  </div>

                  {/* Key Parameters Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-line">
                    {activeModule.parameters.map((param) => (
                      <div key={param.label}>
                        <p className="text-xs text-ink-muted mb-0.5">{param.label}</p>
                        <p className="text-sm font-semibold font-mono text-ink">
                          {param.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Bullet Details */}
                  <ol className="space-y-3">
                    {activeModule.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-ink-secondary leading-relaxed"
                      >
                        <span className="font-mono text-xs text-accent-text mt-1 tabular-nums shrink-0">
                          {idx + 1}.
                        </span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="pt-6 mt-6 border-t border-line flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
                  <div>
                    <span className="font-semibold text-ink mr-2">Methods &amp; Stack:</span>
                    {activeModule.methods.join(' · ')}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 shrink-0">
                    {activeModule.repoUrl && (
                      <a
                        href={activeModule.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-ink hover:text-accent-text hover:underline whitespace-nowrap"
                      >
                        <Github className="w-3.5 h-3.5 text-accent-text" />
                        <span>{activeModule.repoName ?? 'GitHub Repo'} ↗</span>
                      </a>
                    )}
                    <a
                      href="#asrl-figures"
                      className="font-medium text-accent-text hover:underline whitespace-nowrap shrink-0"
                    >
                      View Generated ASRL Plots Below ↓
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Open-Source ASRL Research Repositories */}
            <div id="asrl-repos" className="mt-14 pt-10 border-t border-line space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-accent-text">
                    Public Astrodynamics Codebases · Python &amp; ASSET
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
                    Open-Source Research Repositories (GitHub)
                  </h3>
                </div>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-ink-secondary bg-canvas border border-line hover:border-line-strong hover:bg-subtle rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Github className="w-3.5 h-3.5 text-accent-text" />
                  <span>github.com/dbethman</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted" />
                </a>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {RESEARCH_REPOS.map((repo) => (
                  <article
                    key={repo.id}
                    className="flex flex-col justify-between p-6 bg-canvas/55 border border-line hover:border-line-strong rounded-xl transition-colors space-y-5"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1 min-w-0">
                          <p className="text-xs font-mono text-accent-text truncate">
                            dbethman / {repo.repoName}
                          </p>
                          <h4 className="text-base sm:text-lg font-bold tracking-tight text-ink">
                            {repo.title}
                          </h4>
                        </div>
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${repo.repoName} on GitHub`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-accent-text bg-surface border border-line hover:border-line-strong hover:bg-subtle rounded-lg transition-colors whitespace-nowrap shrink-0"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>View Code</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <p className="text-sm text-ink-secondary leading-relaxed">
                        {repo.summary}
                      </p>

                      <ul className="space-y-2 pt-1">
                        {repo.highlights.map((bullet, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-secondary leading-relaxed"
                          >
                            <span className="font-mono text-xs text-accent-text mt-0.5 tabular-nums shrink-0">
                              {idx + 1}.
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-line space-y-1.5 text-xs">
                      <p className="font-mono text-ink-muted truncate">
                        <span className="text-ink-secondary font-sans font-semibold mr-2">
                          Key Scripts:
                        </span>
                        {repo.keyFiles.join(' · ')}
                      </p>
                      <p className="font-mono text-ink-muted truncate">
                        <span className="text-ink-secondary font-sans font-semibold mr-2">
                          Stack:
                        </span>
                        {repo.stack.join(' · ')}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* ASRL Generated Research Figures Gallery */}
            <div id="asrl-figures" className="mt-14 pt-10 border-t border-line space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-accent-text">
                    Generated Computational Output · ASRL Update (Nov 2026)
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
                    CR3BP Orbit Families, Manifolds &amp; Poincaré Transfer Plots
                  </h3>
                </div>
                <a
                  href={ASRL_UPDATE_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-ink-secondary bg-canvas border border-line hover:border-line-strong hover:bg-subtle rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-ink-muted" />
                  <span>View ASRL Slide Deck PDF</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ASRL_FIGURES.map((fig, idx) => (
                  <article
                    key={fig.id}
                    className="group flex flex-col bg-canvas/55 border border-line hover:border-line-strong rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFigureIndex(idx)}
                      className="flex flex-col h-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent"
                    >
                      <div className="aspect-[4/3] w-full bg-white border-b border-line p-3 flex items-center justify-center overflow-hidden">
                        <img
                          src={fig.imagePath}
                          alt={`${fig.title} — ${fig.subtitle}`}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 gap-3">
                        <div className="space-y-1">
                          <p className="text-xs font-mono text-accent-text">{fig.figureNumber}</p>
                          <h4 className="text-sm sm:text-base font-bold text-ink group-hover:text-accent-text transition-colors">
                            {fig.title}
                          </h4>
                          <p className="text-xs text-ink-muted leading-relaxed">{fig.subtitle}</p>
                        </div>
                        <div className="pt-2 border-t border-line flex items-center justify-between gap-2 text-[11px] font-mono text-ink-muted">
                          <span className="truncate">{fig.metrics.join(' · ')}</span>
                          <span className="text-accent-text font-semibold shrink-0">Zoom ↗</span>
                        </div>
                      </div>
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Engineering Projects Bento Grid */}
        <section id="projects" className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-medium text-accent-text">
                Selected Academic &amp; Independent Builds
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink text-balance">
                Engineering Projects &amp; Technical Systems
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                Select any project card to inspect interactive engineering diagrams, governing calculations, and deliverables.
              </p>
            </div>

            {/* Interactive Controls: Category Tabs + Origin Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              <div
                role="tablist"
                aria-label="Filter projects by discipline"
                className="flex flex-wrap items-center gap-1 p-1 bg-subtle border border-line rounded-lg"
              >
                {PROJECT_CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-surface text-ink shadow-xs'
                          : 'text-ink-muted hover:text-ink'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              <select
                aria-label="Filter by project origin"
                value={originFilter}
                onChange={(e) =>
                  setOriginFilter(e.target.value as 'All' | 'School Project' | 'Personal Project')
                }
                className="px-3 py-2 text-xs font-medium text-ink bg-surface border border-line rounded-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
              >
                <option value="All">All Origins ({PROJECTS.length})</option>
                <option value="School Project">School Projects ({schoolCount})</option>
                <option value="Personal Project">Personal Builds ({personalCount})</option>
              </select>
            </div>
          </div>

          {/* Active Skill Filter Notice (if triggered from Skills section) */}
          {selectedSkill && (
            <div className="mb-6 flex items-center justify-between gap-4 px-4 py-3 bg-surface border border-line rounded-xl text-xs">
              <span className="text-ink-secondary">
                Showing projects referencing{' '}
                <strong className="font-semibold text-ink">{selectedSkill}</strong> (
                {filteredProjects.length} match{filteredProjects.length === 1 ? '' : 'es'})
              </span>
              <button
                type="button"
                onClick={() => setSelectedSkill(null)}
                className="font-medium text-accent-text hover:underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                Clear Filter
              </button>
            </div>
          )}

          {/* Empty State if filters yield 0 */}
          {filteredProjects.length === 0 ? (
            <div className="py-16 px-6 text-center bg-surface border border-line rounded-2xl space-y-3">
              <p className="text-base font-semibold text-ink">
                No projects match the current filter combination.
              </p>
              <p className="text-sm text-ink-muted">
                Reset the discipline, origin, or skill filter to browse all {PROJECTS.length} builds.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setOriginFilter('All');
                  setSelectedSkill(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-accent-fg bg-accent rounded-lg hover:bg-accent-hover transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, idx) => {
                // Lead project spans 2 cols on lg (Row 1: 2+1, Row 2: 1+1+1 = 6 cells total); final card spans 2 cols on md for clean 2-col symmetry
                const spanClass = isUnfilteredAll
                  ? idx === 0
                    ? 'col-span-1 lg:col-span-2'
                    : idx === 4
                      ? 'col-span-1 md:col-span-2 lg:col-span-1'
                      : 'col-span-1'
                  : 'col-span-1';

                return (
                  <article
                    key={project.id}
                    className={`group flex flex-col bg-surface border border-line hover:border-line-strong rounded-2xl overflow-hidden transition-colors ${spanClass}`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="flex flex-col h-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent"
                    >
                      {/* Top Visual / Blueprint Stage */}
                      {project.comparisonPhotos ? (
                        <div className="w-full h-48 grid grid-cols-2 gap-px bg-line border-b border-line overflow-hidden">
                          {(
                            [
                              {key: 'before', data: project.comparisonPhotos.before},
                              {key: 'after', data: project.comparisonPhotos.after},
                            ] as const
                          ).map((item) => (
                            <div key={item.key} className="relative h-full w-full overflow-hidden bg-canvas">
                              <img
                                src={item.data.imagePath}
                                alt={`${project.title} — ${item.data.label}`}
                                referrerPolicy="no-referrer"
                                loading="lazy"
                                style={{objectPosition: item.data.objectPosition ?? '50% 50%'}}
                                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                              />
                              <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />
                              <span className="absolute bottom-2 left-2.5 right-2.5 text-[11px] font-medium text-white truncate">
                                {item.data.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : project.coverImagePath ? (
                        <div
                          className={`w-full h-48 border-b border-line overflow-hidden flex items-center justify-center ${
                            project.coverStyle === 'photo' ? 'bg-canvas' : 'bg-white'
                          }`}
                        >
                          <img
                            src={project.coverImagePath}
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className={
                              project.coverStyle === 'photo'
                                ? 'w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-[1.02]'
                                : 'w-full h-full object-contain p-2 transition-transform duration-200 group-hover:scale-[1.02]'
                            }
                          />
                        </div>
                      ) : project.schematic ? (
                        <div className="w-full h-48 bg-canvas/45 border-b border-line blueprint-grid p-2 overflow-hidden flex items-center justify-center">
                          <ProjectSchematic type={project.schematic} />
                        </div>
                      ) : null}

                      {/* Card Body */}
                      <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 gap-5">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
                            <span className="font-medium text-accent-text">{project.category}</span>
                            <span aria-hidden="true">·</span>
                            <span>{project.origin}</span>
                            <span aria-hidden="true">·</span>
                            <span>{project.term}</span>
                          </div>

                          <h3 className="text-lg font-bold tracking-tight text-ink group-hover:text-accent-text transition-colors">
                            {project.title}
                          </h3>

                          <p className="text-sm text-ink-secondary leading-relaxed line-clamp-2">
                            {project.summary}
                          </p>
                        </div>

                        <div className="space-y-4">
                          {/* Quantitative Metrics */}
                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-line">
                            <div>
                              <p className="text-[11px] text-ink-muted">{project.primaryMetricLabel}</p>
                              <p className="text-xs sm:text-sm font-semibold font-mono tabular-nums text-ink truncate">
                                {project.primaryMetricValue}
                              </p>
                            </div>
                            <div>
                              <p className="text-[11px] text-ink-muted">{project.secondaryMetricLabel}</p>
                              <p className="text-xs sm:text-sm font-semibold font-mono tabular-nums text-ink truncate">
                                {project.secondaryMetricValue}
                              </p>
                            </div>
                          </div>

                          {/* Tools + Action */}
                          <div className="flex items-center justify-between gap-3 pt-2 text-xs">
                            <span className="text-ink-muted truncate">
                              {project.tools.slice(0, 3).join(' · ')}
                            </span>
                            <span className="inline-flex items-center gap-1 font-semibold text-accent-text whitespace-nowrap shrink-0">
                              <span>Inspect</span>
                              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* SECTION 4: Technical Skills & Engineering Toolkit */}
        <section id="skills" className="bg-surface border-y border-line py-14 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-line">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-medium text-accent-text">
                  Software, Simulation &amp; Fabrication Stack
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink text-balance">
                  Technical Skills &amp; Certifications
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted">
                Select any tool below to filter related portfolio projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">
              {SKILL_GROUPS.map((group) => (
                <div key={group.id} className="space-y-4">
                  <div className="pb-3 border-b border-line">
                    <h3 className="text-base font-bold text-ink">{group.title}</h3>
                    <p className="text-xs text-ink-muted mt-1">{group.subtitle}</p>
                  </div>
                  <ul className="space-y-2.5">
                    {group.items.map((item) => {
                      const key = item.name.split(' / ')[0];
                      const isSelected = selectedSkill === key;
                      return (
                        <li key={item.name}>
                          <button
                            type="button"
                            onClick={() => handleSelectSkill(item.name)}
                            className={`w-full text-left p-2.5 -mx-2.5 rounded-lg transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-accent/12 text-accent-text'
                                : 'hover:bg-subtle/60 text-ink'
                            }`}
                          >
                            <p className="text-sm font-semibold">{item.name}</p>
                            <p className="text-xs text-ink-muted mt-0.5 leading-snug">
                              {item.context}
                            </p>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: Aerospace & STEM Coursework Tabbed Audit */}
        <section id="coursework" className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-line">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-medium text-accent-text">
                B.S. Aerospace Engineering · Degree Progress &amp; Curriculum
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink text-balance">
                Academic Coursework &amp; Technical Track
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                Completed coursework with grades B- or higher, active 2026–2027 aerodynamics and structures classes, and planned senior sequence.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Filter coursework by academic stage"
              className="flex flex-wrap items-center gap-1 p-1 bg-subtle border border-line rounded-lg shrink-0"
            >
              {COURSEWORK_TABS.map((tab) => {
                const isActive = activeCourseTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCourseTab(tab.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-surface text-ink shadow-xs'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Degree Progress Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-b border-line">
            {COURSEWORK_SUMMARY.map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="text-xs text-ink-muted">{item.label}</p>
                <p className="text-sm sm:text-base font-bold font-mono tabular-nums text-ink">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Coursework Ledger Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
            {filteredCoursework.map((course) => (
              <div
                key={course.code}
                className="flex flex-col justify-between p-4 bg-surface border border-line rounded-xl space-y-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono font-semibold text-accent-text tabular-nums">
                      {course.code}
                    </span>
                    <span className="font-mono text-ink-muted tabular-nums">
                      {course.credits} cr · {course.term}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-ink leading-snug">
                    {course.title}
                  </h3>
                </div>

                <div className="pt-2.5 border-t border-line flex items-center justify-between gap-2 text-xs">
                  <span className="text-ink-muted">{course.discipline}</span>
                  <span className="font-mono tabular-nums text-ink-secondary">
                    {course.highlight ? `${course.status} · ${course.highlight}` : course.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: Experience, Education, Involvement & Honors */}
        <section id="experience" className="bg-surface border-y border-line py-14 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left Column: Experience Ledger */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2 pb-4 border-b border-line">
                <p className="text-xs font-medium text-accent-text">
                  Research, Formula SAE &amp; Industry Operations
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                  Engineering &amp; Work Experience
                </h2>
              </div>

              <div className="divide-y divide-line">
                {EXPERIENCES.map((exp) => (
                  <div key={exp.id} className="py-6 first:pt-2 last:pb-0 space-y-2.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-base font-bold text-ink">{exp.role}</h3>
                      <span className="text-xs font-mono tabular-nums text-ink-muted">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-ink-muted">
                      {exp.organization} <span aria-hidden="true">·</span> {exp.location}{' '}
                      <span aria-hidden="true">·</span> {exp.type}
                    </p>
                    <ul className="space-y-1.5 pt-1">
                      {exp.highlights.map((bullet, idx) => (
                        <li key={idx} className="text-sm text-ink-secondary leading-relaxed">
                          — {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Education, Campus Involvement & Honors */}
            <div className="lg:col-span-5 space-y-8">
              {/* Education Block */}
              <div className="p-6 bg-canvas/55 border border-line rounded-2xl space-y-3">
                <p className="text-xs font-medium text-accent-text">Education</p>
                <h3 className="text-lg font-bold text-ink">{PROFILE.university}</h3>
                <p className="text-sm font-medium text-ink-secondary">{PROFILE.degree}</p>
                <div className="flex items-center gap-3 pt-2 border-t border-line text-xs font-mono tabular-nums text-ink-muted">
                  <span>Expected {PROFILE.graduation}</span>
                  <span aria-hidden="true">·</span>
                  <span>GPA {PROFILE.gpa}</span>
                  <span aria-hidden="true">·</span>
                  <span>{PROFILE.location}</span>
                </div>
              </div>

              {/* Honors & Scholarships */}
              <div className="p-6 bg-canvas/55 border border-line rounded-2xl space-y-4">
                <p className="text-xs font-medium text-accent-text">Honors &amp; Scholarships</p>
                <ul className="divide-y divide-line">
                  {HONORS_AWARDS.map((award) => (
                    <li key={award.title} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-semibold text-ink">{award.title}</span>
                        <span className="text-xs font-mono tabular-nums text-ink-muted shrink-0">
                          {award.period}
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted mt-0.5">{award.institution}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Campus Involvement */}
              <div className="p-6 bg-canvas/55 border border-line rounded-2xl space-y-4">
                <p className="text-xs font-medium text-accent-text">Campus Involvement</p>
                <ul className="divide-y divide-line">
                  {CAMPUS_INVOLVEMENT.map((club) => (
                    <li key={club.name} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-semibold text-ink">{club.name}</span>
                        <span className="text-xs font-mono tabular-nums text-ink-muted shrink-0">
                          {club.period}
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted mt-0.5">{club.role}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          </div>
        </section>
      </main>

      {/* Contact & Footer */}
      <footer className="bg-canvas">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-line">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-ink">
                Connect with {PROFILE.name}
              </h2>
              <p className="text-sm text-ink-secondary">
                Open to aerospace engineering internships, astrodynamics research, and propulsion/structures opportunities.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-accent-fg bg-accent hover:bg-accent-hover rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {emailCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{emailCopied ? 'Email Copied' : PROFILE.email}</span>
              </button>
              <a
                href={`tel:${PROFILE.phone.replace(/[^\d+]/g, '')}`}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-ink-secondary border border-line hover:bg-subtle rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-ink-muted" />
                <span className="font-mono tabular-nums">{PROFILE.phone}</span>
              </a>
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-ink-secondary border border-line hover:bg-subtle rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-ink-muted" />
                <span>Resume PDF</span>
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-ink-muted">
            <p>
              {PROFILE.name} <span aria-hidden="true">·</span> {PROFILE.degree} ({PROFILE.graduation})
            </p>
            <div className="flex items-center gap-5">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink transition-colors"
              >
                GitHub
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink transition-colors"
              >
                LinkedIn
              </a>
              <a href={`mailto:${PROFILE.email}`} className="hover:text-ink transition-colors">
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ResearchFigureModal
        figures={ASRL_FIGURES}
        activeIndex={activeFigureIndex}
        onSelectIndex={setActiveFigureIndex}
      />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
