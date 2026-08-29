'use client';
import { useState, useMemo } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { courses } from '@/data/courses';

const CATEGORIES = ['All', 'ATAL FDP', 'Coursera', 'STTP', 'FDP', 'Workshop', 'Online'] as const;
const CAT_COLORS: Record<string, string> = {
  'ATAL FDP': 'var(--terracotta)',
  'Coursera':  '#4285F4',
  'STTP':      'var(--steel)',
  'FDP':       'var(--brass)',
  'Workshop':  '#5C6BC0',
  'Online':    '#26A69A',
};

export default function CoursesArchive() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchCat = activeCategory === 'All' || c.category === activeCategory;
      const matchQ = !query || c.title.toLowerCase().includes(query.toLowerCase()) || c.institution?.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [activeCategory, query]);

  const displayed = showAll ? filtered : filtered.slice(0, 12);

  return (
    <div style={{ marginTop: '4rem' }}>
      <ScrollReveal>
        <p className="t-label" style={{ marginBottom: '0.5rem' }}>Professional Development</p>
        <h3 className="t-subsection" style={{ marginBottom: '0.75rem' }}>Courses & FDPs</h3>
        <div className="divider" />
        <p className="t-small" style={{ marginTop: '0.75rem' }}>
          4 ATAL FDPs · 15 Coursera Courses · 32 STTP / FDP / Workshop Activities
        </p>
      </ScrollReveal>

      <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Search */}
        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            placeholder="Search courses, institutions…"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }} className="no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`chip ${activeCategory === cat ? 'chip-active' : 'chip-default'}`}
              onClick={() => setActiveCategory(cat)}
              style={activeCategory === cat && cat !== 'All' ? { borderColor: CAT_COLORS[cat], color: CAT_COLORS[cat], background: `${CAT_COLORS[cat]}12` } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {displayed.length === 0 ? (
            <p className="t-small" style={{ padding: '1.5rem', textAlign: 'center' }}>No courses match your search.</p>
          ) : displayed.map((c, i) => (
            <ScrollReveal key={c.id} delay={(Math.min(i % 4, 3) as 0|1|2|3)}>
              <div
                className="paper"
                style={{
                  padding: '0.85rem 1.25rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  transition: 'box-shadow 0.2s',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'white',
                  background: CAT_COLORS[c.category] || 'var(--steel)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '0.2rem',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  marginTop: '0.15rem',
                }}>
                  {c.category}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--graphite)', lineHeight: 1.4 }}>{c.title}</p>
                  {c.institution && <p className="t-meta" style={{ marginTop: '0.25rem' }}>{c.institution}</p>}
                </div>
                {c.date && (
                  <p className="t-meta" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>{c.date}</p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {filtered.length > 12 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn btn-secondary"
            style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
          >
            {showAll ? 'Show Less' : `Show All ${filtered.length} Entries`}
          </button>
        )}
      </div>
    </div>
  );
}
