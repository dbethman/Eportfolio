import React, {useEffect} from 'react';
import {ChevronLeft, ChevronRight, ExternalLink, Github, X} from 'lucide-react';
import {ASRL_UPDATE_PDF, ResearchFigure} from '../data/portfolioData';

interface ResearchFigureModalProps {
  figures: ResearchFigure[];
  activeIndex: number | null;
  onSelectIndex: (idx: number | null) => void;
}

export const ResearchFigureModal: React.FC<ResearchFigureModalProps> = ({
  figures,
  activeIndex,
  onSelectIndex,
}) => {
  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onSelectIndex(null);
      if (e.key === 'ArrowRight') onSelectIndex((activeIndex + 1) % figures.length);
      if (e.key === 'ArrowLeft') onSelectIndex((activeIndex - 1 + figures.length) % figures.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, figures.length, onSelectIndex]);

  if (activeIndex === null) return null;
  const fig = figures[activeIndex];
  if (!fig) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="research-figure-title"
      onClick={() => onSelectIndex(null)}
    >
      <div
        className="w-full max-w-5xl max-h-[92vh] flex flex-col bg-surface border border-line rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-line">
          <div className="min-w-0">
            <p className="text-xs font-mono text-accent-text mb-0.5 truncate">
              {fig.figureNumber} · ASRL Update (Nov 2026)
              {fig.repoName ? ` · ${fig.repoName}` : ''}
            </p>
            <h3 id="research-figure-title" className="text-lg sm:text-xl font-bold text-ink">
              {fig.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {fig.repoUrl && (
              <a
                href={fig.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-ink bg-canvas border border-line hover:border-line-strong hover:bg-subtle rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Github className="w-3.5 h-3.5 text-accent-text" />
                <span>GitHub Code</span>
              </a>
            )}
            <a
              href={ASRL_UPDATE_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-ink-secondary border border-line hover:bg-subtle rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full Slide Deck PDF</span>
            </a>
            <button
              type="button"
              onClick={() => onSelectIndex(null)}
              aria-label="Close figure viewer"
              className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-subtle transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* High-res figure frame */}
        <div className="flex-1 overflow-auto bg-canvas/55 p-4 sm:p-6 flex items-center justify-center">
          <img
            src={fig.imagePath}
            alt={`${fig.title} — ${fig.subtitle}`}
            referrerPolicy="no-referrer"
            className="max-h-[58vh] w-auto object-contain rounded-lg border border-line bg-white p-1"
          />
        </div>

        {/* Footer Caption & Prev/Next */}
        <div className="px-6 py-4 border-t border-line bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-sm text-ink-secondary leading-relaxed">{fig.description}</p>
            <p className="text-xs font-mono text-ink-muted">{fig.metrics.join(' · ')}</p>
            <div className="flex sm:hidden flex-wrap items-center gap-3 pt-1 text-xs">
              {fig.repoUrl && (
                <a
                  href={fig.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-accent-text hover:underline"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Code ↗</span>
                </a>
              )}
              <a
                href={ASRL_UPDATE_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-ink-secondary hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Slide Deck PDF ↗</span>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onSelectIndex((activeIndex - 1 + figures.length) % figures.length)}
              aria-label="Previous figure"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-ink-secondary border border-line hover:bg-subtle rounded-lg cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>
            <span className="text-xs font-mono tabular-nums text-ink-muted px-1">
              {activeIndex + 1} / {figures.length}
            </span>
            <button
              type="button"
              onClick={() => onSelectIndex((activeIndex + 1) % figures.length)}
              aria-label="Next figure"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-ink-secondary border border-line hover:bg-subtle rounded-lg cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
