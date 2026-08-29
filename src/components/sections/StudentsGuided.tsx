'use client';
import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { students } from '@/data/achievements';

export default function StudentsGuided() {
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filtered = students.filter((s) =>
    !query ||
    s.student.toLowerCase().includes(query.toLowerCase()) ||
    s.title.toLowerCase().includes(query.toLowerCase())
  );
  const displayed = showAll ? filtered : filtered.slice(0, 8);

  return (
    <div style={{ marginTop: '4rem' }}>
      <ScrollReveal>
        <p className="t-label" style={{ marginBottom: '0.5rem' }}>Mentorship</p>
        <h3 className="t-subsection" style={{ marginBottom: '0.75rem' }}>Students &amp; Projects Guided</h3>
        <div className="divider" />
      </ScrollReveal>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '2.5rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
        {[{ num: '27', label: 'UG Batches Guided' }, { num: '23', label: 'PG Projects Guided' }].map((s) => (
          <ScrollReveal key={s.label}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '3rem', color: 'var(--terracotta)', lineHeight: 1 }}>{s.num}</p>
              <p className="t-meta" style={{ marginTop: '0.35rem' }}>{s.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Search */}
      <div className="search-wrap" style={{ marginTop: '1.75rem', maxWidth: 480 }}>
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          placeholder="Search student name or thesis topic…"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Project table */}
      <div style={{ marginTop: '1.25rem', overflow: 'auto' }} className="no-scrollbar">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['#', 'Student', 'Thesis / Project Title', 'Year'].map((h) => (
                <th key={h} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--steel)',
                  padding: '0.65rem 0.75rem',
                  textAlign: 'left',
                  borderBottom: '1px solid rgba(96,121,132,0.15)',
                  background: 'rgba(220,235,240,0.3)',
                  whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayed.map((s, i) => (
              <tr key={s.id} style={{
                borderBottom: '1px solid rgba(96,121,132,0.08)',
                background: i % 2 === 0 ? 'var(--warm-white)' : 'rgba(248,247,243,0.6)',
                transition: 'background 0.15s',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(220,235,240,0.3)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? 'var(--warm-white)' : 'rgba(248,247,243,0.6)')}
              >
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--terracotta)', padding: '0.75rem', whiteSpace: 'nowrap' }}>{i + 1}</td>
                <td style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--graphite)', padding: '0.75rem', whiteSpace: 'nowrap' }}>{s.student}</td>
                <td style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--graphite)', padding: '0.75rem', lineHeight: 1.4 }}>{s.title}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--steel)', padding: '0.75rem', whiteSpace: 'nowrap' }}>{s.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length > 8 && (
        <button onClick={() => setShowAll(!showAll)} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
          {showAll ? 'Show Less' : `Show All ${filtered.length} Projects`}
        </button>
      )}
    </div>
  );
}
