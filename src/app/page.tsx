import EngineeringBackground from '@/components/ui/EngineeringBackground';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import ProfessionalSnapshot from '@/components/sections/ProfessionalSnapshot';
import CurrentPosition from '@/components/sections/CurrentPosition';
import Education from '@/components/sections/Education';
import AcademicCareer from '@/components/sections/AcademicCareer';
import AdminExperience from '@/components/sections/AdminExperience';
import CoursesArchive from '@/components/sections/CoursesArchive';
import ResearchOverview from '@/components/sections/ResearchOverview';
import Publications from '@/components/sections/Publications';
import StudentsGuided from '@/components/sections/StudentsGuided';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <EngineeringBackground />
      <Navigation />

      <div className="content">
        {/* ── HOME ─────────────────────────────────────────── */}
        <Hero />
        <ProfessionalSnapshot />
        <CurrentPosition />

        {/* ── ACADEMICS & EXPERIENCE ───────────────────────── */}
        <section id="academics" className="section">
          <div className="section-inner">
            <div className="section-header">
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.4rem 1rem 0.4rem 0.75rem',
                background: 'var(--blueprint)',
                border: '1px solid rgba(96,121,132,0.15)',
                marginBottom: '0.75rem',
              }}>
                <span style={{ width: 6, height: 6, background: 'var(--terracotta)', borderRadius: '50%', display: 'inline-block' }} />
                <span className="t-eyebrow">Section 02</span>
              </div>
              <h2 className="t-section-heading">Academics &amp; Experience</h2>
            </div>

            <Education />
            <div className="divider--full" />
            <AcademicCareer />
            <div className="divider--full" />
            <AdminExperience />
            <CoursesArchive />
          </div>
        </section>

        {/* ── RESEARCH & PUBLICATIONS ──────────────────────── */}
        <section id="research" className="section section-paper">
          <div className="section-inner">
            <div className="section-header">
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.4rem 1rem 0.4rem 0.75rem',
                background: 'rgba(201,106,69,0.08)',
                border: '1px solid rgba(201,106,69,0.2)',
                marginBottom: '0.75rem',
              }}>
                <span style={{ width: 6, height: 6, background: 'var(--terracotta)', borderRadius: '50%', display: 'inline-block' }} />
                <span className="t-eyebrow" style={{ color: 'var(--terracotta)' }}>Section 03</span>
              </div>
              <h2 className="t-section-heading">Research &amp; Publications</h2>
            </div>

            <ResearchOverview />
            <div className="divider--full" />
            <Publications />
            <div className="divider--full" />
            <StudentsGuided />
          </div>
        </section>

        {/* ── ACHIEVEMENTS ─────────────────────────────────── */}
        <section id="achievements" className="section">
          <div className="section-inner">
            <div className="section-header">
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.4rem 1rem 0.4rem 0.75rem',
                background: 'var(--blueprint)',
                border: '1px solid rgba(96,121,132,0.15)',
                marginBottom: '0.75rem',
              }}>
                <span style={{ width: 6, height: 6, background: 'var(--terracotta)', borderRadius: '50%', display: 'inline-block' }} />
                <span className="t-eyebrow">Section 04</span>
              </div>
              <h2 className="t-section-heading">Achievements</h2>
            </div>
            <Achievements />
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────── */}
        <Contact />

        <Footer />
      </div>
    </>
  );
}
