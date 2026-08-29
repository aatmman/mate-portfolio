# MASTER CODING AGENT PROMPT
# Dr. Dnyaneshwar M. Mate — Academic Portfolio Website

You are an expert frontend engineer, UI/UX designer, motion designer and creative developer.

Your task is to DESIGN AND BUILD a complete, production-quality academic portfolio website for:

Dr. Dnyaneshwar M. Mate
Associate Professor
Department of Mechanical Engineering
JSPM's Rajarshi Shahu College of Engineering, Pune

This is not a normal resume website.

The goal is to create a visually distinctive, premium and memorable academic portfolio that feels specifically designed for a Mechanical Engineering professor.

---

# 1. READ THE PROJECT MATERIAL FIRST

Before writing or changing code, inspect all available project files and assets.

You should expect to have:

- DESIGN.md
- Professor's CV/resume
- Professor's professional photograph
- Reference screenshots
- Engineering background video or video screenshots/frames
- Existing source code, if any

Read DESIGN.md completely before implementing anything.

The CV is the source of truth for factual information.

The reference screenshots are NOT the design to copy.

They only communicate:

- information hierarchy
- content placement
- approximate density
- section structure
- which information belongs where

Do not copy their:

- colors
- typography
- layout style
- dark theme
- cards
- gradients
- visual effects
- spacing
- UI components

Create a completely new visual system.

---

# 2. PRIMARY CREATIVE DIRECTION

The website should feel like:

"A physical engineering research notebook transformed into a living digital experience."

The visual language should combine:

PAPER
+
ENGINEERING
+
RESEARCH
+
MOTION

The website should feel tactile.

Imagine a beautifully designed physical engineering notebook containing:

- research papers
- technical drawings
- blueprints
- academic notes
- patents
- books
- project documents
- mechanical diagrams
- timelines
- photographs

Then imagine those physical materials becoming interactive.

That is the design direction.

---

# 3. VERY IMPORTANT — DO NOT MAKE IT LOOK AI-GENERATED

The biggest design requirement is authenticity.

Do NOT build another generic "AI portfolio".

Avoid:

- dark navy dashboards
- neon blue
- purple gradients
- cyberpunk
- futuristic HUD interfaces
- glowing borders
- excessive glassmorphism
- excessive rounded cards
- floating gradient blobs
- generic SaaS layouts
- excessive 3D
- excessive gradients
- huge animated typography
- random decorative shapes
- excessive animations

The site should feel:

- calm
- intelligent
- sophisticated
- tactile
- editorial
- academic
- engineering-focused
- human-designed

The visual quality should come from composition, typography, texture, spacing and motion — not from adding effects everywhere.

---

# 4. COLOR SYSTEM

The website must be predominantly LIGHT.

The main background should be based around:

- warm white
- paper white
- very light blue
- soft grey
- subtle blueprint blue

Suggested palette:

Paper:
#F8F7F3

Warm White:
#FFFDF8

Blueprint Blue:
#DCEBF0

Steel Blue:
#607984

Graphite:
#263238

Terracotta:
#C96A45

Muted Brass:
#B49A67

Use graphite for primary text.

Use steel blue for secondary/technical information.

Use terracotta sparingly for:

- CTA buttons
- active navigation
- important numbers
- section markers
- small highlights
- links

Do not use every color equally.

The website should visually read as:

LIGHT → PAPER → GRAPHITE → BLUEPRINT → SMALL WARM ACCENTS

---

# 5. PAPER TEXTURE

Introduce a subtle paper texture throughout the site.

It should resemble:

- premium stationery
- engineering drawing paper
- research notebook paper

Use extremely subtle:

- grain
- fibers
- noise
- paper variation

Do not make it look like old parchment.

Do not make the texture visually distracting.

If possible, implement it using CSS gradients/noise rather than loading unnecessarily large texture assets.

---

# 6. PAPER-CUT UI

The paper-cut effect is one of the main unique aspects of the website.

Use layered paper elements selectively.

Examples:

- section headers
- research cards
- publication cards
- timeline entries
- book cards
- patent documents
- academic certificates
- floating labels
- navigation tabs

Each layer should have:

- slightly different off-white tone
- realistic soft shadow
- subtle depth
- slight offset
- clean edges

Do not make every element look like a literal piece of paper.

The metaphor should be strongest in major sections and special content.

---

# 7. BACKGROUND ENGINEERING VIDEO

There is an engineering video intended to act as the ambient background.

The video contains visual elements such as:

- light blue technical grid
- blueprint-like surface
- grey mechanical gears
- white/light-grey mechanical components
- nuts
- bolts
- engineering objects
- slow mechanical movement

The video should act as an ENVIRONMENT.

It should never overpower the UI.

Implement it as a background layer.

Recommended structure:

VIDEO
↓
light translucent overlay
↓
paper texture
↓
technical line-art
↓
content
```

The video should remain light.

DO NOT:

* darken it into navy
* add neon overlays
* turn it into a futuristic background
* heavily blur it
* cover it completely with opaque sections

Where text readability is important, place a translucent warm-white/paper surface behind the content.

The background should remain visible around and between the content.

---

# 8. VIDEO IMPLEMENTATION

If the actual video file exists in the project:

Use it directly.

Implement:

```html
<video
  autoplay
  muted
  loop
  playsinline
>
```

Add:

* poster fallback
* responsive sizing
* lazy loading where appropriate
* mobile fallback if needed
* reduced-motion fallback

The video must NEVER prevent the website from loading.

If the actual video is unavailable, use the supplied screenshots/frames as temporary visual references and create the background system so the actual video can be dropped in later without redesigning the site.

Create a clean asset location such as:

/public/assets/video/

and reference the video through a configurable constant.

---

# 9. TYPOGRAPHY

Use a premium modern sans-serif.

Typography should feel:

* academic
* editorial
* professional
* modern
* highly readable

Avoid:

* sci-fi fonts
* gaming fonts
* overly futuristic fonts
* decorative display fonts everywhere

Use a clear hierarchy:

Small technical label

Large editorial heading

Readable body copy

Small metadata

Technical metadata can optionally use a monospace font.

---

# 10. NAVIGATION

Build a floating navigation bar.

It should look like a lightweight paper strip floating above the engineering environment.

Navigation:

HOME

ACADEMICS & EXPERIENCE

RESEARCH & PUBLICATIONS

ACHIEVEMENTS

CONTACT

Features:

* sticky
* translucent warm white
* subtle paper texture
* thin border
* soft shadow
* slight backdrop blur
* active state
* smooth scrolling/navigation

The active navigation item should have a subtle terracotta indicator.

On mobile:

Use a compact floating menu.

Do not use a giant traditional mobile navbar.

---

# 11. PAGE / INFORMATION ARCHITECTURE

Build the following structure:

HOME
│
├── Profile
├── Professional Snapshot
└── Current Position

ACADEMICS & EXPERIENCE
│
├── Education
├── Academic Career
├── Administrative Experience
├── Academic Contributions
└── Courses & FDPs

RESEARCH & PUBLICATIONS
│
├── Research Profile
├── Patents
├── Research Grants
├── Consultancy
├── Books
├── Publications
├── Conference Presentations
└── Students & Projects Guided

ACHIEVEMENTS
│
├── Awards & Recognition
├── Professional Memberships
├── Editorial & Reviewer Roles
├── Conferences & Events
└── Extra-Curricular Activities

CONTACT

```

Use sensible routing/anchors based on the existing project architecture.

Do not create unnecessary separate pages if a section can be handled cleanly as a subsection.

---

# 12. HOME PAGE

The home page should immediately communicate:

WHO HE IS
+
WHAT HE DOES
+
WHY HIS WORK MATTERS

---

## HERO

Use the supplied professional portrait.

The portrait should be a clean cutout.

Do not put it inside a generic card.

Create a layered paper composition:

- portrait
- paper backing
- subtle technical drawing
- soft shadow
- slight depth

Hero content:

ASSOCIATE PROFESSOR · MECHANICAL ENGINEERING

Hi, I'm

Dr. Dnyaneshwar M. Mate

Associate Professor in Mechanical Engineering at JSPM's Rajarshi Shahu College of Engineering, Pune.

With over 20 years of teaching and academic experience, my work spans engineering education, research, innovation and mentoring.

Buttons:

Explore Research

Academic Journey

Add a subtle scroll indicator.

---

# 13. PROFESSIONAL SNAPSHOT

Create an editorial statistics strip.

Display:

20+
Years of Experience

40+
Research Publications

4
Books Published

2
Patent / IP Entries

27
UG Batches Guided

23
PG Projects Guided

IMPORTANT:

The CV contains different publication totals in different sections.

Do not invent a final number.

If the source data conflicts, either:

1. avoid displaying the publication total, OR
2. display the value with appropriate contextual wording.

Do not silently "fix" the CV.

The statistics should look like printed research notes, not dashboard widgets.

---

# 14. CURRENT POSITION

Create a prominent academic identity block.

Associate Professor

Department of Mechanical Engineering

JSPM's Rajarshi Shahu College of Engineering

Tathawade, Pune

Use subtle engineering graphics.

---

# 15. ACADEMICS & EXPERIENCE

Create a visually rich section with:

Education

Academic Career

Administrative Experience

Academic Contributions

Courses & FDPs

---

## EDUCATION

Use a vertical paper timeline.

Include the exact education details from the CV.

Important:

Do not invent missing details.

Do not "correct" conflicting dates unless explicitly supported by the source.

Make the Ph.D. visually prominent.

---

# 16. ACADEMIC CAREER

Use a long vertical timeline.

Current position should be visually emphasized.

Previous positions should become smaller as the timeline moves backwards.

Use paper strips instead of generic timeline cards.

---

# 17. ADMINISTRATIVE EXPERIENCE

Use a grid of role cards.

Include the exact roles from the CV.

Each card should contain:

Role

Institution

Period where available

Short responsibility description where supported by the CV.

---

# 18. ACADEMIC CONTRIBUTIONS

Use a research-notebook/scrapbook visual style.

Include the academic contributions supported by the CV.

Keep this section visually lighter than Research.

---

# 19. COURSES & FDPs

Build an archive.

Use:

- search
- category filters
- year filters
- expandable items

Categories:

ATAL FDP

Coursera

STTP

FDP

Workshop

Online Courses

Do not dump dozens of entries into one page.

Use progressive disclosure.

---

# 20. RESEARCH & PUBLICATIONS

This is the MOST IMPORTANT section.

It should feel like opening a physical research archive.

Use stronger paper layering here.

---

## RESEARCH PROFILE

Heading:

Research at the Intersection of

Engineering & Innovation

Research themes derived from the CV can include:

- Manufacturing & Machining
- Surface Engineering
- Material Science
- Heat Transfer
- CFD & Simulation
- Mechanical Design
- Renewable Energy
- Thermal Engineering

Clearly treat these as themes derived from the research material rather than inventing an official research-interest list.

---

# 21. PATENTS

Create two large document-style cards.

Safety Warning System for Two Wheelers

Patent Reference:
202021005642

Application Type:
Ordinary Application

---

Battery Operated Harvesting Machine for Rice Crop

Diary Number:
2104/2022-CO/A

Status:
Approved

The approved status can have a subtle terracotta stamp/badge.

---

# 22. RESEARCH GRANTS

Create a certificate/document-inspired component.

AICTE Sponsored STTP

Grant:

₹5 Lakhs

Sponsored by:

AICTE

Use exact source details.

---

# 23. INDUSTRIAL CONSULTANCY

Create three technical project sheets.

Boiler Performance Evaluation

Optimized Layout for Sugar Industry

Planetary Gear Box & Rope Coupling Improvements

Show:

client

project

year

amount

Do not make this look like a financial dashboard.

It should look like engineering project documentation.

---

# 24. BOOKS

Create an editorial bookshelf.

Books:

Formulation of Database Model on Parametric Effects on Aluminum Alloy

Robotics

Mechatronics

Material Science

Display ISBN information where available.

Do not invent book covers.

---

# 25. PUBLICATIONS DATABASE

Create a real interactive publication archive.

Features:

Search

Year filter

Publication type

Research area

Journal / Conference

Cards should resemble research paper sheets.

Each publication should show:

Title

Authors

Journal / Conference

Year

Volume / Issue

Pages

ISSN / DOI where available

Use expandable details.

Do not create 40+ huge static cards with every field visible simultaneously.

---

# 26. CONFERENCE PRESENTATIONS

Use a conference archive.

Visual metaphor:

research papers pinned to a board.

Include exact information supported by the CV.

---

# 27. STUDENTS & PROJECTS GUIDED

Create:

27
UG Batches

23
PG Projects

Then create a searchable project archive.

Each item:

Student

Project / Thesis

Year

Level

Use the CV as the source.

---

# 28. ACHIEVEMENTS

Create:

Awards & Recognition

Professional Memberships

Editorial & Reviewer Roles

Conferences & Events

Extra-Curricular Activities

---

# 29. AWARDS & RECOGNITION

Use premium paper certificates / achievement cards.

Show:

Award

Organization

Year

Location

Role/contribution

Do not invent information.

---

# 30. PROFESSIONAL MEMBERSHIPS

Create a clean organization grid.

Use logos only when actual verified logos are available.

Do not invent logos.

---

# 31. EDITORIAL & REVIEWER ROLES

Create a journal/archive visual.

Show exact roles from the CV.

Do not call someone an "Editor" if the CV only says "Reviewer" or "Editorial Board Member".

---

# 32. CONFERENCES & EVENTS

Use chronological event cards/timeline.

Keep it concise.

---

# 33. EXTRA-CURRICULAR

Keep this section visually smaller.

Use a compact scrapbook section.

---

# 34. CONTACT

Create a final paper sheet.

Heading:

Let's Connect

Show the professional contact information from the CV.

Do not expose sensitive/unnecessary personal address information unless explicitly requested.

---

# 35. FOOTER

Use a calm footer.

It may use graphite as a contrasting surface, but the overall website must remain predominantly light.

---

# 36. ANIMATION SYSTEM

Use motion throughout the website, but keep it sophisticated.

### Page load

- paper layers gently enter
- portrait reveals
- typography fades/slides in
- engineering background continues moving

### Scroll

- paper layers reveal
- timelines animate
- statistics count up once
- technical drawings subtly move

### Hover

- paper lifts
- shadow increases slightly
- tiny rotation/offset
- border changes subtly

### Navigation

- active paper tab changes
- smooth section transition

### Publication interaction

- paper expands
- details reveal
- other papers subtly move aside

---

# 37. MOTION RULE

The website should feel alive, NOT busy.

Every animation must have a purpose.

If an animation does not improve:

- hierarchy
- storytelling
- navigation
- physicality
- feedback

remove it.

Support:

prefers-reduced-motion

---

# 38. RESPONSIVE DESIGN

Desktop:

Use the full paper-cut composition.

Tablet:

Reduce layers and columns.

Mobile:

Use a simplified paper composition.

Do not simply scale desktop down.

On mobile:

- stack content
- preserve hierarchy
- keep portrait prominent
- make filters horizontally scrollable
- use compact navigation
- reduce background-video intensity
- simplify animations

---

# 39. ACCESSIBILITY

Implement:

- semantic HTML
- keyboard navigation
- focus states
- sufficient contrast
- accessible buttons
- alt text
- reduced-motion support

Do not sacrifice accessibility for visual effects.

---

# 40. PERFORMANCE

Optimize everything.

Especially the background video.

Use:

- lazy loading
- poster image
- compressed assets
- responsive images
- code splitting where useful
- CSS rather than large image assets when possible

The background video must not delay meaningful content.

---

# 41. ENGINEERING BACKGROUND

Do not use the engineering background as a decorative image placed behind a giant opaque container.

The background should integrate with the page.

Content should appear to sit ON TOP OF the engineering environment.

Think:

physical desk / blueprint / research table

rather than:

website background image.

---

# 42. IMPLEMENTATION QUALITY

Write clean production-quality code.

Use:

- reusable components
- data-driven publication lists
- reusable timeline components
- reusable paper/card components
- centralized color tokens
- centralized typography
- centralized motion settings
- responsive breakpoints
- accessible interactions

Do not duplicate markup unnecessarily.

Do not hard-code 40 publication cards individually if they can be generated from structured data.

---

# 43. IMPORTANT DEVELOPMENT RULE

Do NOT immediately start coding the entire site blindly.

First:

1. inspect the existing project
2. inspect DESIGN.md
3. inspect all available assets
4. identify framework/build system
5. understand routing
6. understand current components
7. identify where the background video will live
8. identify the professor image
9. identify the CV data

Then create an implementation plan.

After that, implement the site section by section.

---

# 44. DESIGN VALIDATION

After implementation, inspect the result critically.

Ask:

Does this look like a generic AI-generated portfolio?

If YES:
- remove unnecessary effects
- simplify cards
- reduce gradients
- reduce glassmorphism
- improve typography
- improve spacing
- strengthen paper/engineering identity

Ask:

Does this look like a real academic's professional website?

If NO:
- improve content hierarchy
- reduce decorative UI
- make research content more prominent
- make typography more authoritative
- use more editorial composition

Ask:

Does the engineering background feel integrated?

If NO:
- adjust opacity
- adjust content surfaces
- expose more of the background
- improve layering

---

# 45. FINAL QUALITY BAR

The final website should feel like a custom-designed digital identity for ONE specific professor.

It should not be possible to replace his name with another professor's name and have the design feel exactly the same.

The mechanical engineering theme, research archive, paper-cut interaction, technical drawings, publications and academic timeline should make the website feel specifically designed for Dr. Dnyaneshwar M. Mate.

The final emotional impression should be:

"An experienced engineer and academic researcher has turned his research notebook into a living digital portfolio."

NOT:

"Another AI-generated portfolio website."

---

# 46. USE DESIGN.MD

Treat DESIGN.md as the detailed design specification.

This prompt defines the creative intent and implementation rules.

DESIGN.md defines the detailed:

- visual system
- information architecture
- colors
- sections
- interactions
- content organization
- responsive behavior

Read it before implementation and keep it consistent with this prompt.

If there is a conflict:

1. factual CV information wins for content
2. this prompt wins for creative intent
3. DESIGN.md wins for detailed implementation decisions
4. reference screenshots are only structural references

Do not invent information to fill gaps.

---

# 47. FINAL DELIVERABLE

Build the complete website, not just a landing page.

It must include:

HOME

ACADEMICS & EXPERIENCE

RESEARCH & PUBLICATIONS

ACHIEVEMENTS

CONTACT

with all specified subsections.

Make it responsive.

Make it accessible.

Make it performant.

Make the background video integration ready.

Make the UI interactive.

Make the animations subtle.

Make the design distinctive.

Most importantly:

Make it feel like a **beautiful interactive engineering research notebook**, not a template.
```

### And one important thing

For your coding agent, I would actually use **both**:

```text
PROMPT.md
DESIGN.md
```

**`PROMPT.md`** → tells the agent *how to think and build the website.*

**`DESIGN.md`** → gives it the *detailed design specification and information architecture.*

Then your project could look like:

```text
project/
│
├── PROMPT.md
├── DESIGN.md
│
├── public/
│   ├── images/
│   │   └── dr-mate.png
│   │
│   └── video/
│       └── engineering-background.mp4
│
├── src/
│   ├── components/
│   ├── sections/
│   ├── data/
│   ├── pages/
│   └── styles/
│
└── ...
```
# 48. ADMIN DASHBOARD / CONTENT MANAGEMENT SYSTEM

This website must include a secure, fully functional ADMIN DASHBOARD.

This is extremely important.

The public website is an academic portfolio that will continue to grow over time.

Dr. Dnyaneshwar M. Mate should be able to update the website content without needing to modify the source code.

The website therefore must NOT hard-code the portfolio content directly into UI components.

All editable portfolio information should be stored in a structured content/data layer and managed through the admin dashboard.

The public website should consume this content dynamically.

---

# 49. ADMIN DASHBOARD GOAL

Create a separate protected `/admin` area.

Example:

/admin/login
/admin/dashboard

The admin dashboard should allow the portfolio owner to:

- add
- edit
- delete
- reorder
- publish
- unpublish

content throughout the website.

The admin should NOT need programming knowledge.

The dashboard should feel like a clean, simple academic CMS.

Do NOT make the dashboard visually identical to the public portfolio.

The public site can be artistic and tactile.

The admin dashboard should prioritize:

- clarity
- efficiency
- usability
- forms
- tables
- search
- filtering
- validation

---

# 50. ADMIN AUTHENTICATION

The admin area must be protected.

Implement proper authentication.

Required:

- Login
- Logout
- Protected admin routes
- Session handling
- Password/security best practices

Do NOT expose admin functionality through the public website.

Do not rely on hiding `/admin` as a security mechanism.

If the project already has an authentication/database solution, use it rather than introducing an unnecessary second system.

If no backend/authentication system exists yet, structure the application so a production authentication provider/database can be integrated cleanly.

Never hard-code passwords or secrets into frontend code.

Use environment variables for secrets.

---

# 51. ADMIN DASHBOARD HOME

Create a dashboard overview.

Show useful summary information such as:

- Total Publications
- Total Books
- Total Patents
- Total Projects
- Education Entries
- Experience Entries
- Awards
- Professional Memberships
- Draft Content
- Published Content

Also show:

Recent Updates

Quick Actions:

+ Add Publication
+ Add Experience
+ Add Achievement
+ Add Book
+ Add Project

The dashboard should immediately tell the administrator what is currently on the website.

---

# 52. ADMIN SIDEBAR

Create a clean admin sidebar.

Suggested structure:

Dashboard

Profile

Academics & Experience
  ├── Education
  ├── Academic Career
  ├── Administrative Experience
  ├── Academic Contributions
  └── Courses & FDPs

Research & Publications
  ├── Research Profile
  ├── Patents
  ├── Research Grants
  ├── Consultancy
  ├── Books
  ├── Publications
  ├── Conference Presentations
  └── Students & Projects

Achievements
  ├── Awards & Recognition
  ├── Professional Memberships
  ├── Editorial & Reviewer Roles
  ├── Conferences & Events
  └── Extra-Curricular

Media

Site Settings

Logout
```

---

# 53. PROFILE MANAGEMENT

Create an admin editor for the professor's profile.

Editable fields:

* Name
* Professional title
* Department
* Institution
* Short introduction
* Biography
* Profile photograph
* Email
* Phone
* Location
* Hero heading
* Hero description
* CTA labels

The admin should be able to replace the profile photograph without modifying code.

---

# 54. PROFESSIONAL SNAPSHOT MANAGEMENT

Allow the admin to edit the statistics displayed on the homepage.

Example:

20+
Years of Experience

40+
Publications

4
Books

2
Patents

27
UG Batches

23
PG Projects

Each statistic should have:

* value
* label
* optional description
* display order
* active/inactive status

This is important because these numbers may change in the future.

---

# 55. EDUCATION CMS

Create CRUD functionality for education entries.

CRUD means:

Create
Read
Update
Delete

Fields:

* Degree
* Discipline
* Institution
* University
* Year
* Percentage/Grade
* Class/Result
* Thesis title
* Advisor
* Description
* Display order
* Published status

The admin should be able to reorder education entries.

---

# 56. EXPERIENCE CMS

Create a professional experience manager.

Fields:

* Organization
* Position
* Start date
* End date
* Current position toggle
* Location
* Description
* Responsibilities
* Display order
* Published status

The current position should automatically be visually emphasized on the public website.

---

# 57. ADMINISTRATIVE EXPERIENCE CMS

Allow the administrator to manage:

* Role
* Institution
* Period
* Responsibilities
* Description
* Display order
* Published status

---

# 58. COURSES / FDP / WORKSHOPS CMS

Create an archive manager.

Fields:

* Title
* Category
* Institution
* Organizer
* Date/year
* Duration
* Description
* Certificate/document
* External link
* Tags
* Published status

Categories:

* ATAL FDP
* FDP
* STTP
* Workshop
* Coursera
* Online Course

The public website should automatically generate the filters from the stored categories.

---

# 59. RESEARCH PROFILE CMS

Allow the administrator to manage research themes.

Fields:

* Research area
* Short description
* Icon/illustration
* Display order
* Published status

Example:

Manufacturing & Machining

Surface Engineering

Material Science

Heat Transfer

CFD & Simulation

Mechanical Design

Renewable Energy

Thermal Engineering

---

# 60. PATENTS CMS

Create a patent manager.

Fields:

* Patent title
* Patent/reference number
* Application type
* Diary number
* Status
* Filing year
* Approval year
* Description
* Document/file
* External link
* Display order
* Published status

Status examples:

* Filed
* Published
* Approved
* Granted

Do not hard-code patent cards into the frontend.

---

# 61. RESEARCH GRANTS CMS

Fields:

* Grant title
* Funding organization
* Amount
* File/reference number
* Date
* Description
* Document
* Status
* Display order

---

# 62. CONSULTANCY CMS

Fields:

* Project title
* Client
* Description
* Year
* Amount
* Industry/category
* Outcome
* Supporting document
* Published status

The admin should be able to add future consultancy projects without code changes.

---

# 63. BOOKS CMS

Create a book manager.

Fields:

* Book title
* Authors
* ISBN
* Publisher
* Publication year
* Description
* Cover image
* External link
* Display order
* Published status

The public website should automatically generate the bookshelf from these records.

---

# 64. PUBLICATIONS CMS

This is one of the most important admin modules.

Create a full publication management system.

The admin should be able to:

* add publication
* edit publication
* delete publication
* duplicate publication
* search publications
* filter publications
* sort publications
* publish/unpublish publications

Fields:

* Title
* Authors
* Journal
* Conference
* Publication type
* Year
* Volume
* Issue
* Pages
* ISSN
* DOI
* URL
* Abstract
* Research area
* Keywords
* Indexing information
* Featured publication toggle
* Published status

Publication types can include:

* Journal
* International Conference
* National Conference
* Book Chapter
* Other

The public publication database should be generated entirely from this data.

---

# 65. BULK PUBLICATION IMPORT

If practical for the chosen stack, provide a CSV import/export function.

Allow the administrator to:

* export publications to CSV
* import publications from CSV
* validate rows before importing
* show errors before committing

This will be extremely useful because the professor has a large publication history.

Do not make CSV import mandatory if it compromises reliability, but structure the publication data so bulk import can be added cleanly.

---

# 66. CONFERENCE PRESENTATIONS CMS

Fields:

* Title
* Authors
* Conference
* Location
* Date/year
* Pages
* Description
* Presentation file
* External link
* Published status

---

# 67. STUDENTS & PROJECTS CMS

Create a project supervision manager.

Fields:

* Student name
* Project title
* Level
* Department
* Year
* Guide/supervisor information where relevant
* Description
* Research area
* Project document
* Published status

Levels:

* UG
* PG

The public site should automatically calculate/display:

UG project count

PG project count

if those values are derived from the stored records.

Do not maintain duplicate manually-entered counts if they can safely be calculated from the database.

---

# 68. AWARDS CMS

Fields:

* Award title
* Organization
* Year
* Location
* Description
* Certificate/image
* External link
* Featured toggle
* Published status

---

# 69. PROFESSIONAL MEMBERSHIPS CMS

Fields:

* Organization
* Membership type
* Membership number if the administrator explicitly wants it displayed
* Description
* Logo
* Website
* Display order
* Published status

Important:

Membership IDs should not automatically be displayed publicly.

Provide a separate "Display membership number" option.

---

# 70. EDITORIAL / REVIEWER ROLES CMS

Fields:

* Journal/organization
* Role
* Year/period
* Description
* Website
* Display order
* Published status

Roles should be stored exactly as provided by the CV.

Do not automatically convert:

"Reviewer"

into:

"Editor"

---

# 71. EVENTS CMS

Fields:

* Event name
* Event type
* Organization
* Role
* Date/year
* Description
* Location
* Image
* Document
* Published status

---

# 72. EXTRA-CURRICULAR CMS

Fields:

* Activity
* Organization
* Year/period
* Description
* Image/document
* Published status

---

# 73. MEDIA LIBRARY

Create a basic media management section.

Allow admin to manage:

* profile photos
* book covers
* certificates
* patent documents
* publication documents
* event images
* research images

Features:

* upload
* preview
* delete
* search
* copy/reference media
* file type validation

Images should be optimized where possible.

Do not store large media files directly in the database.

Use an appropriate storage layer.

---

# 74. SITE SETTINGS

Create a settings page.

Allow editing:

* Site title
* Site description
* Hero heading
* Hero subtitle
* Contact email
* Contact phone
* Social links
* Footer text
* CTA labels
* Background video
* Favicon
* SEO title
* SEO description

Also allow enabling/disabling selected homepage sections.

---

# 75. DRAFT / PUBLISH SYSTEM

Every major content record should support:

Draft

Published

Archived

The admin should be able to edit content without immediately changing the public website.

Recommended workflow:

Create/Edit
↓
Save Draft
↓
Preview
↓
Publish

Provide a clear Publish button.

---

# 76. PREVIEW MODE

Whenever possible, allow the administrator to preview a content change before publishing it.

Example:

Edit publication

↓

Preview

↓

Publish

This is especially useful for:

* publications
* books
* achievements
* profile content
* research content

---

# 77. CONTENT VALIDATION

Admin forms must validate data.

Examples:

Publication:

* title required
* year valid
* URL valid if provided

Education:

* degree required
* institution required

Experience:

* organization required
* position required

Do not allow malformed data to break the public website.

---

# 78. PUBLIC SITE / ADMIN SEPARATION

Keep the architecture clean:

PUBLIC WEBSITE
↓
CONTENT/API/DATABASE
↑
ADMIN DASHBOARD

The public website should never directly depend on hard-coded content inside UI components.

The admin dashboard should modify the content layer.

The public website should automatically reflect published changes.

---

# 79. DATA ARCHITECTURE

Use structured data models.

At minimum, consider entities such as:

User/Admin

Profile

Statistic

Education

Experience

AdministrativeRole

AcademicContribution

Course

ResearchArea

Patent

ResearchGrant

Consultancy

Book

Publication

ConferencePresentation

StudentProject

Award

Membership

EditorialRole

Event

ExtraCurricularActivity

Media

SiteSettings

Do not create unnecessary duplicated fields.

Use relationships where appropriate.

---

# 80. DATABASE / BACKEND

Choose the database/backend based on the existing project stack.

Do not introduce unnecessary technologies.

If the project already uses a backend/database:

* reuse it
* extend it cleanly
* preserve existing architecture

If no backend exists:

recommend and implement a sensible production-ready architecture rather than building a fake localStorage-only CMS.

The admin dashboard must be capable of becoming a real deployed system.

Do NOT use localStorage as the primary production database.

---

# 81. SECURITY

The admin system must:

* protect routes
* authenticate users
* protect API endpoints
* validate input server-side
* sanitize user-generated content
* protect file uploads
* avoid exposing secrets
* use environment variables
* prevent unauthorized CRUD operations

Do not rely only on frontend authorization.

---

# 82. ADMIN UI DESIGN

The admin dashboard does NOT need the paper-cut aesthetic of the public website.

Prioritize usability.

Use:

* clean sidebar
* simple tables
* searchable data
* filters
* forms
* clear buttons
* modal confirmations
* breadcrumbs
* pagination where necessary
* clear success/error messages

The admin dashboard should feel similar to a professional CMS.

---

# 83. CONTENT COUNTS

Avoid maintaining duplicate statistics manually when the value can be derived.

For example:

If there are 31 publication records,
the dashboard should know there are 31 publications.

If there are 18 UG project records,
the dashboard should know there are 18 UG projects.

Where the CV contains manually stated historical totals that do not equal the number of currently entered records, allow the administrator to distinguish:

"CV stated total"

from

"Website records"

Do not silently change historical claims.

---

# 84. ADMIN DASHBOARD SEARCH

Provide global or module-specific search.

Examples:

Search publications by:

* title
* author
* year
* journal
* keyword

Search projects by:

* student
* title
* year

Search experience by:

* organization
* position

---

# 85. ADMIN CONTENT ORDERING

For content types where order matters, provide:

* drag-and-drop ordering
* numeric ordering fallback

Examples:

* homepage statistics
* research areas
* education
* experience
* books
* featured publications
* achievements

---

# 86. ADMIN AUDIT / UPDATE INFORMATION

Where practical, store:

* created date
* updated date
* published date
* last updated by

This helps maintain the portfolio over many years.

---

# 87. FUTURE-PROOFING

The website should be designed so that the professor can continue adding content for years.

For example:

Today:
40 publications

Later:
60 publications

The UI should automatically handle this.

Today:
4 books

Later:
5 books

The bookshelf should automatically update.

Today:
2 patents

Later:
5 patents

The patent section should automatically update.

Do not design the site around fixed counts or fixed cards.

---

# 88. FINAL IMPLEMENTATION PRINCIPLE

The final architecture should be:

CONTENT
→ DATABASE / CONTENT LAYER
→ PUBLIC WEBSITE

and

ADMIN DASHBOARD
→ DATABASE / CONTENT LAYER
→ PUBLIC WEBSITE

The public website is the presentation layer.

The admin dashboard is the content management layer.

The database/content layer is the source of truth.

This separation is mandatory for the long-term maintainability of the portfolio.

---

# 89. IMPORTANT

Do not build a beautiful static website and then "add an admin panel later."

Design the content architecture FIRST.

The public UI should be generated from structured content from the beginning.

The admin dashboard and public website must use the same underlying content models.

---

# 90. FINAL GOAL

When the project is finished, the professor should be able to log into:

/admin

and independently:

* change his introduction
* change his photograph
* update his current position
* add a new publication
* edit an existing publication
* add a new book
* add a new patent
* add research work
* update consultancy
* add a conference
* add an award
* update memberships
* add student projects
* update statistics
* upload documents/images
* publish/unpublish content

without opening VS Code or editing source code.

That is a core requirement of this project.

````

### I'd also change your project architecture

Instead of:

```text
React components
   ↓
Hardcoded CV data
   ↓
Website
````

build it as:

```text
                 ┌─────────────────┐
                 │  ADMIN DASHBOARD │
                 └────────┬────────┘
                          │
                    Create / Edit
                          │
                          ▼
                 ┌─────────────────┐
                 │ DATABASE / CMS  │
                 └────────┬────────┘
                          │
                     Published
                       content
                          │
                          ▼
                 ┌─────────────────┐
                 │ PUBLIC WEBSITE  │
                 └─────────────────┘
```

