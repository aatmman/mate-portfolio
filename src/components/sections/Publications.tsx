'use client';
import { useState, useMemo } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { publications, conferencePapers } from '@/data/publications';

const TYPES = ['All', 'Scopus', 'International Journal', 'Conference'];
const AREAS = ['All', 'Manufacturing & Machining', 'Surface Engineering', 'Heat Transfer', 'CFD & Simulation', 'Material Science', 'Mechanical Design', 'Renewable Energy', 'Thermal Engineering'];

export default function Publications() {
  const [typeFilter, setTypeFilter] = useState('All');
  const [areaFilter, setAreaFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filteredPubs = useMemo(() => {
    return publications.filter((p) => {
      const matchType =
        typeFilter === 'All' ||
        (typeFilter === 'Scopus' && p.type === 'scopus') ||
        (typeFilter === 'International Journal' && (p.type === 'journal-international' || p.type === 'scopus')) ||
        (typeFilter === 'Conference' && p.type.includes('conference'));
      const matchArea = areaFilter === 'All' || p.area === areaFilter;
      const matchQ = !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.authors.toLowerCase().includes(query.toLowerCase()) || p.journal.toLowerCase().includes(query.toLowerCase());
      return matchType && matchArea && matchQ;
    });
  }, [typeFilter, areaFilter, query]);

  const displayedPubs = showAll ? filteredPubs : filteredPubs.slice(0, 10);

  return (
    <div style={{ marginTop: '4rem' }}>
      <ScrollReveal>
        <p className="t-label" style={{ marginBottom: '0.5rem' }}>Publication Archive</p>
        <h3 className="t-subsection" style={{ marginBottom: '0.75rem' }}>Research Publications</h3>
        <div className="divider" />
        <p className="t-small" style={{ marginTop: '0.75rem' }}>
          5 Scopus · 40+ International Journals · 6 International Conferences · 5 National Conferences
        </p>
      </ScrollReveal>

      <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {/* Search */}
        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            placeholder="Search by title, author, journal…"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Type filter */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {TYPES.map((t) => (
            <button key={t} className={`chip ${typeFilter === t ? 'chip-active' : 'chip-default'}`} onClick={() => setTypeFilter(t)}>{t}</button>
          ))}
        </div>

        {/* Area filter */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }} className="no-scrollbar">
          {AREAS.map((a) => (
            <button key={a} className={`chip ${areaFilter === a ? 'chip-active' : 'chip-default'}`} onClick={() => setAreaFilter(a)} style={{ fontSize: '0.62rem' }}>{a}</button>
          ))}
        </div>

        {/* Publication cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {displayedPubs.length === 0 ? (
            <p className="t-small" style={{ padding: '2rem', textAlign: 'center' }}>No publications match your search.</p>
          ) : displayedPubs.map((pub, i) => (
            <div key={pub.id}>
              <div
                className="pub-card"
                onClick={() => setExpanded(expanded === pub.id ? null : pub.id)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.58rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: pub.type === 'scopus' ? 'white' : 'var(--steel)',
                    background: pub.type === 'scopus' ? 'var(--terracotta)' : 'var(--blueprint)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '0.15rem',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    textTransform: 'uppercase',
                    marginTop: '0.1rem',
                  }}>
                    {pub.type === 'scopus' ? 'Scopus' : pub.type.includes('journal') ? 'Journal' : 'Conf.'}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.9rem', color: 'var(--graphite)', lineHeight: 1.45, marginBottom: '0.25rem' }}>
                      {pub.title}
                    </p>
                    <p className="t-meta">{pub.authors}</p>
                  </div>
                  <span style={{ color: 'var(--steel)', fontSize: '0.8rem', flexShrink: 0, marginTop: '0.15rem' }}>
                    {expanded === pub.id ? '▲' : '▼'}
                  </span>
                </div>

                {/* Expanded details */}
                <div className={`pub-card__expand ${expanded === pub.id ? 'open' : ''}`}>
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(96,121,132,0.12)', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
                    <div>
                      <p className="t-meta" style={{ color: 'var(--brass)' }}>Journal / Conference</p>
                      <p className="t-small" style={{ fontStyle: 'italic' }}>{pub.journal}</p>
                    </div>
                    <div>
                      <p className="t-meta" style={{ color: 'var(--brass)' }}>Year</p>
                      <p className="t-small">{pub.year}</p>
                    </div>
                    {(pub.volume || pub.issue) && (
                      <div>
                        <p className="t-meta" style={{ color: 'var(--brass)' }}>Volume / Issue</p>
                        <p className="t-small">{[pub.volume && `Vol. ${pub.volume}`, pub.issue && `Issue ${pub.issue}`].filter(Boolean).join(' · ')}</p>
                      </div>
                    )}
                    {pub.pages && (
                      <div>
                        <p className="t-meta" style={{ color: 'var(--brass)' }}>Pages</p>
                        <p className="t-small">{pub.pages}</p>
                      </div>
                    )}
                    {pub.issn && (
                      <div>
                        <p className="t-meta" style={{ color: 'var(--brass)' }}>ISSN</p>
                        <p className="t-small" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{pub.issn}</p>
                      </div>
                    )}
                    {pub.doi && (
                      <div>
                        <p className="t-meta" style={{ color: 'var(--brass)' }}>DOI</p>
                        <p className="t-small" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', wordBreak: 'break-all' }}>{pub.doi}</p>
                      </div>
                    )}
                    {pub.area && (
                      <div>
                        <p className="t-meta" style={{ color: 'var(--brass)' }}>Research Area</p>
                        <span className="chip chip-default" style={{ marginTop: '0.25rem', display: 'inline-flex' }}>{pub.area}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPubs.length > 10 && (
          <button onClick={() => setShowAll(!showAll)} className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
            {showAll ? 'Show Less' : `Show All ${filteredPubs.length} Publications`}
          </button>
        )}

        {/* Conference Papers */}
        <div style={{ marginTop: '3rem' }}>
          <ScrollReveal>
            <p className="t-label" style={{ marginBottom: '0.5rem' }}>Conference Archive</p>
            <h4 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.3rem', marginBottom: '0.75rem' }}>Conference Presentations</h4>
            <div className="divider" />
          </ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '1.5rem' }}>
            {conferencePapers.map((p, i) => (
              <ScrollReveal key={p.id} delay={(Math.min(i % 4, 3) as 0|1|2|3)}>
                <div className="paper" style={{ padding: '1.1rem 1.35rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                      color: p.type === 'international' ? 'white' : 'var(--graphite)',
                      background: p.type === 'international' ? 'var(--steel)' : 'var(--blueprint)',
                      padding: '0.2rem 0.5rem', borderRadius: '0.15rem', whiteSpace: 'nowrap', flexShrink: 0, marginTop: '0.1rem', textTransform: 'uppercase',
                    }}>
                      {p.type === 'international' ? 'Intl.' : 'Natl.'}
                    </span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.88rem', color: 'var(--graphite)', lineHeight: 1.45 }}>{p.title}</p>
                      <p className="t-meta" style={{ marginTop: '0.25rem' }}>{p.conference}</p>
                      {p.location && <p className="t-meta">{p.location} · {p.year}</p>}
                    </div>
                    <p className="t-meta" style={{ flexShrink: 0, color: 'var(--terracotta)' }}>{p.year}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
