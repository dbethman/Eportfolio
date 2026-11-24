import React, {useEffect, useState} from 'react';
import {ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, X} from 'lucide-react';
import {ProjectItem} from '../data/portfolioData';
import {ProjectSchematic} from './ProjectSchematics';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({project, onClose}) => {
  const [stageMode, setStageMode] = useState<'gallery' | 'comparison' | 'interactive'>('gallery');
  const [figureIdx, setFigureIdx] = useState(0);
  const [comparisonView, setComparisonView] = useState<'split' | 'before' | 'after'>('split');

  useEffect(() => {
    if (project) {
      if (project.comparisonPhotos) {
        setStageMode('comparison');
        setComparisonView('split');
      } else if (project.galleryFigures && project.galleryFigures.length > 0) {
        setStageMode('gallery');
      } else {
        setStageMode('interactive');
      }
      setFigureIdx(0);
    }
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const hasGallery = Boolean(project.galleryFigures && project.galleryFigures.length > 0);
  const hasComparison = Boolean(project.comparisonPhotos);
  const hasSchematic = Boolean(project.schematic);
  const figures = project.galleryFigures ?? [];
  const activeFigure = figures[figureIdx];
  const comparison = project.comparisonPhotos;

  const showStageToolbar =
    hasComparison || (hasGallery && hasSchematic) || (hasGallery && figures.length > 1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface border border-line rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-line sticky top-0 bg-surface z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted mb-1.5">
              <span className="font-medium text-accent-text">{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.origin}</span>
              <span aria-hidden="true">·</span>
              <span>{project.term}</span>
              <span aria-hidden="true">·</span>
              <span>{project.location}</span>
            </div>
            <h3 id="project-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {project.reportPdfPath && (
              <a
                href={project.reportPdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-ink-secondary border border-line hover:bg-subtle rounded-lg transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Full Report PDF</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-subtle transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Visual Stage Switcher */}
        {showStageToolbar && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-2.5 border-b border-line bg-canvas/60">
            <div className="inline-flex items-center gap-1 p-0.5 bg-subtle rounded-lg border border-line">
              {hasComparison && (
                <button
                  type="button"
                  onClick={() => setStageMode('comparison')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    stageMode === 'comparison' ? 'bg-surface text-ink shadow-xs' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  Before &amp; After Photos (2)
                </button>
              )}
              {hasGallery && (
                <button
                  type="button"
                  onClick={() => setStageMode('gallery')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    stageMode === 'gallery' ? 'bg-surface text-ink shadow-xs' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {project.galleryTabLabel ?? 'Report Figures'} ({figures.length})
                </button>
              )}
              {hasSchematic && (
                <button
                  type="button"
                  onClick={() => setStageMode('interactive')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    stageMode === 'interactive' ? 'bg-surface text-ink shadow-xs' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  Interactive Schematic
                </button>
              )}
            </div>

            {hasComparison && stageMode === 'comparison' && (
              <div className="inline-flex items-center gap-1 p-0.5 bg-subtle rounded-lg border border-line text-xs">
                {(
                  [
                    {id: 'split', label: 'Side-by-Side'},
                    {id: 'before', label: 'Before'},
                    {id: 'after', label: 'After'},
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setComparisonView(opt.id)}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                      comparisonView === opt.id
                        ? 'bg-surface text-ink shadow-xs'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {hasGallery && stageMode === 'gallery' && (
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setFigureIdx((prev) => (prev - 1 + figures.length) % figures.length)}
                  aria-label="Previous figure"
                  className="p-1 border border-line bg-surface text-ink-secondary rounded hover:bg-subtle cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono tabular-nums text-ink-muted">
                  {figureIdx + 1} / {figures.length}
                </span>
                <button
                  type="button"
                  onClick={() => setFigureIdx((prev) => (prev + 1) % figures.length)}
                  aria-label="Next figure"
                  className="p-1 border border-line bg-surface text-ink-secondary rounded hover:bg-subtle cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Stage Content */}
        {hasComparison && stageMode === 'comparison' && comparison ? (
          <div className="bg-canvas/55 border-b border-line p-4 sm:p-6">
            {comparisonView === 'split' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(
                  [
                    {key: 'before', data: comparison.before},
                    {key: 'after', data: comparison.after},
                  ] as const
                ).map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setComparisonView(item.key)}
                    className="group text-left bg-surface border border-line hover:border-line-strong rounded-xl overflow-hidden transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-canvas">
                      <img
                        src={item.data.imagePath}
                        alt={`${item.data.label} — ${item.data.caption}`}
                        referrerPolicy="no-referrer"
                        style={{objectPosition: item.data.objectPosition ?? '50% 50%'}}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />
                      <span className="absolute bottom-2.5 left-3 text-xs font-semibold text-white">
                        {item.data.label}
                      </span>
                      <span className="absolute bottom-2.5 right-3 text-[11px] font-mono text-white/80 group-hover:text-accent-text transition-colors">
                        Expand ↗
                      </span>
                    </div>
                    <p className="px-3.5 py-2.5 text-xs text-ink-muted leading-snug">
                      {item.data.caption}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              (() => {
                const activePhoto =
                  comparisonView === 'before' ? comparison.before : comparison.after;
                return (
                  <div className="space-y-3">
                    <div className="w-full max-h-[420px] bg-canvas border border-line rounded-xl overflow-hidden flex items-center justify-center">
                      <img
                        src={activePhoto.imagePath}
                        alt={`${activePhoto.label} — ${activePhoto.caption}`}
                        referrerPolicy="no-referrer"
                        className="max-h-[420px] w-auto object-contain"
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-ink">{activePhoto.label}</p>
                        <p className="text-xs text-ink-muted">{activePhoto.caption}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setComparisonView('split')}
                        className="text-xs font-medium text-accent-text hover:underline cursor-pointer"
                      >
                        Compare Side-by-Side
                      </button>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        ) : hasGallery && stageMode === 'gallery' && activeFigure ? (
          <div className="bg-canvas/50 border-b border-line p-4 sm:p-6 space-y-3">
            <div
              className={`w-full h-[280px] sm:h-[360px] border border-line rounded-xl flex items-center justify-center overflow-hidden ${
                activeFigure.surface === 'dark' ? 'bg-canvas' : 'bg-white p-2'
              }`}
            >
              <img
                src={activeFigure.imagePath}
                alt={activeFigure.title}
                referrerPolicy="no-referrer"
                className={
                  activeFigure.surface === 'dark'
                    ? 'w-full h-full object-contain'
                    : 'max-h-full w-auto object-contain'
                }
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-ink">{activeFigure.title}</p>
                <p className="text-xs text-ink-muted">{activeFigure.caption}</p>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0">
                {figures.map((fig, idx) => (
                  <button
                    key={fig.title}
                    type="button"
                    onClick={() => setFigureIdx(idx)}
                    className={`px-2 py-1 text-[11px] font-mono rounded border transition-colors cursor-pointer whitespace-nowrap ${
                      idx === figureIdx
                        ? 'bg-accent text-accent-fg border-accent font-semibold'
                        : 'bg-surface text-ink-muted border-line hover:border-line-strong hover:text-ink'
                    }`}
                  >
                    Fig {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : project.schematic ? (
          <div className="bg-canvas/40 border-b border-line blueprint-grid">
            <div className="h-[260px] sm:h-[300px] w-full flex items-center justify-center">
              <ProjectSchematic type={project.schematic} interactive />
            </div>
          </div>
        ) : null}

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-base text-ink-secondary leading-relaxed">{project.summary}</p>

          {/* Key Quantitative Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-line">
            <div>
              <p className="text-xs text-ink-muted mb-0.5">{project.primaryMetricLabel}</p>
              <p className="text-base font-semibold font-mono tabular-nums text-ink">
                {project.primaryMetricValue}
              </p>
            </div>
            <div>
              <p className="text-xs text-ink-muted mb-0.5">{project.secondaryMetricLabel}</p>
              <p className="text-base font-semibold font-mono tabular-nums text-ink">
                {project.secondaryMetricValue}
              </p>
            </div>
            <div>
              <p className="text-xs text-ink-muted mb-0.5">Context</p>
              <p className="text-base font-semibold text-ink">{project.teamContext}</p>
            </div>
          </div>

          {/* Engineering Contributions */}
          <div>
            <h4 className="text-sm font-semibold text-ink mb-3">Engineering Scope &amp; Deliverables</h4>
            <ul className="space-y-2.5">
              {project.highlights.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-ink-secondary leading-relaxed">
                  <span className="font-mono text-xs text-accent-text mt-1 shrink-0 tabular-nums">
                    {idx + 1}.
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Used */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-line">
            <div className="text-xs text-ink-muted">
              <span className="font-semibold text-ink mr-2">Tools &amp; Methods:</span>
              {project.tools.join(' · ')}
            </div>
            <div className="flex items-center gap-4">
              {project.reportPdfPath && (
                <a
                  href={project.reportPdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden inline-flex items-center gap-1 text-xs font-medium text-accent-text hover:underline"
                >
                  <span>Report PDF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-text hover:underline cursor-pointer"
              >
                <span>Return to Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
