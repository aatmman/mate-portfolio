export interface Position {
  id: string;
  designation: string;
  organization: string;
  from: string;
  to: string;
  duration: string;
  current?: boolean;
}

export const experience: Position[] = [
  {
    id: "rsce",
    designation: "Associate Professor",
    organization: "JSPM's Rajarshi Shahu College of Engineering, Pune",
    from: "03 Oct 2017",
    to: "Present",
    duration: "Till Date — Current",
    current: true,
  },
  {
    id: "nmiet",
    designation: "Associate Professor",
    organization: "Nutan Maharashtra Institute of Engineering & Technology, Pune",
    from: "09 Feb 2017",
    to: "02 Oct 2017",
    duration: "8 Months",
  },
  {
    id: "dyp",
    designation: "Associate Professor",
    organization: "D.Y. Patil Institute of Engineering & Technology, Ambi, Pune",
    from: "21 Nov 2014",
    to: "08 Feb 2017",
    duration: "2.2 Years",
  },
  {
    id: "pce",
    designation: "Assistant Professor",
    organization: "Priyadarshini College of Engineering, Nagpur",
    from: "01 Aug 2005",
    to: "21 Nov 2014",
    duration: "8.5 Years",
  },
  {
    id: "ghrce",
    designation: "Lecturer",
    organization: "G. H. Raisoni College of Engineering, Nagpur",
    from: "24 Jun 2002",
    to: "01 Jul 2005",
    duration: "3.1 Years",
  },
  {
    id: "lamit",
    designation: "Lecturer",
    organization: "L.A.M.I.T. Polytechnic, Dhamangaon, Amravati",
    from: "07 Jul 2000",
    to: "25 May 2001",
    duration: "1 Year",
  },
];

export const adminExperience = [
  {
    id: "nba",
    role: "NBA, NAAC & Autonomy Coordinator",
    description: "Working as coordinator in Mechanical Department",
    institution: "JSPM's RSCE",
    period: "Current",
  },
  {
    id: "hod",
    role: "Head of Department & Dean Academics",
    description: "Worked as HoD & Dean Academics",
    institution: "Nutan Maharashtra Institute of Engineering & Technology, Pune",
    period: "2017",
  },
  {
    id: "dean",
    role: "Dean Academics",
    description: "Worked as Dean Academics",
    institution: "D.Y. Patil Institute of Engineering & Technology, Ambi, Pune",
    period: "2014–2017",
  },
  {
    id: "exam",
    role: "College Examination Officer",
    description: "College CEO (College code-40914) for SPPU Examination; Co-in-charge Winter Exam 2009, R.T.M. Nagpur University",
    institution: "Various",
    period: "Multiple",
  },
  {
    id: "gate",
    role: "GATE Presiding Officer",
    description: "Presiding Officer for GATE examinations for four years",
    institution: "",
    period: "2010–2013",
  },
];

export const academicContributions = [
  {
    id: "sttp",
    title: "Research Methodology STTP",
    description: "Member of STTP organized on Research Methodology, 26th December 2013",
  },
  {
    id: "mesa",
    title: "Student Forum MESA",
    description: "Faculty In-charge for Student Forum MESA, 2007–2014",
  },
  {
    id: "horizon",
    title: "Horizon 2010",
    description: "Joint Organizing Secretary for Horizon 2010, National Student Convention at PCE",
  },
  {
    id: "pegasus",
    title: "Pegasus — 2006",
    description: "Member of Pegasus Student Paper Presentation Competition",
  },
  {
    id: "pica",
    title: "PICA — 2006",
    description: "Committee member PICA-2006",
  },
  {
    id: "preconf",
    title: "Pre-Conference School",
    description: "Committee member of Pre-Conference School, IFToMM International Conference 2006",
  },
  {
    id: "expert",
    title: "Expert Lectures — Research Methodology",
    description: "Delivered Expert Lectures on Research Methodology at various colleges",
  },
  {
    id: "workshops",
    title: "Student Workshops & Programs",
    description: "Organized various workshops and programs for students under department forum",
  },
];
