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
import { getPortfolioData } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <>
      <EngineeringBackground />
      <Navigation />

      <div className="content">
        {/* ── HOME ─────────────────────────────────────────── */}
        <Hero profileData={data.profile} />
        <ProfessionalSnapshot profileData={data.profile} />
        <CurrentPosition profileData={data.profile} />

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

            <Education data={data.education} />
            <div className="divider--full" />
            <AcademicCareer data={data.experience} />
            <div className="divider--full" />
            <AdminExperience adminData={data.adminExperience} contribData={data.academicContributions} />
            <CoursesArchive data={data.courses} />
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

            <ResearchOverview 
              profileData={data.profile}
              patentsData={data.patents}
              grantData={data.researchGrant}
              consultancyData={data.consultancy}
              booksData={data.books}
            />
            <div className="divider--full" />
            <Publications data={data.publications} confData={data.conferencePapers} />
            <div className="divider--full" />
            <StudentsGuided data={data.students} />
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
            <Achievements 
              awardsData={data.awards}
              membershipsData={data.memberships}
              editorialData={data.editorialRoles}
              conferencesData={data.conferencesOrganized}
              extraData={data.extraCurricular}
            />
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────── */}
        <Contact profileData={data.profile} />

        <Footer />
      </div>
    </>
  );
}
