import React, {useEffect} from 'react';
import {Download, ExternalLink, X} from 'lucide-react';
import {PROFILE} from '../data/portfolioData';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({open, onClose}) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl h-[86vh] flex flex-col bg-surface border border-line rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-line">
          <div>
            <p className="text-xs text-ink-muted">Curriculum Vitae</p>
            <h3 id="resume-modal-title" className="text-lg font-bold text-ink">
              {PROFILE.name} — Aerospace Engineering Resume
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={PROFILE.resumePath}
              download="Bethman_Dylan_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-accent-fg bg-accent hover:bg-accent-hover rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <a
              href={PROFILE.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-ink-secondary border border-line hover:bg-subtle rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Tab</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume viewer"
              className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-subtle transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-canvas">
          <iframe
            src={PROFILE.resumePath}
            title="Dylan Bethman Resume PDF"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
