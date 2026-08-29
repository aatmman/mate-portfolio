export interface Course {
  id: string;
  title: string;
  category: "ATAL FDP" | "Coursera" | "STTP" | "FDP" | "Workshop" | "Online";
  institution?: string;
  date?: string;
  year?: number;
}

export const courses: Course[] = [
  // ATAL FDP
  { id: "a1", title: "Sustainability Engineering", category: "ATAL FDP", institution: "GMR Institute of Technology", date: "9–13 Sep 2020", year: 2020 },
  { id: "a2", title: "Cyber Security", category: "ATAL FDP", institution: "St. Joseph's College of Engineering", date: "24–28 Aug 2020", year: 2020 },
  { id: "a3", title: "Artificial Intelligence", category: "ATAL FDP", institution: "Jyothy Institute of Technology, Bengaluru", date: "21–25 Sep 2020", year: 2020 },
  { id: "a4", title: "Internet of Things (IoT)", category: "ATAL FDP", institution: "College of Engineering, Kallooppara", date: "14–18 Sep 2020", year: 2020 },

  // COURSERA
  { id: "c1", title: "Philosophy, Science and Religion: Science and Philosophy", category: "Coursera", institution: "University of Edinburgh", date: "08 Jan 2020", year: 2020 },
  { id: "c2", title: "Learning How to Learn: Powerful Mental Tools", category: "Coursera", institution: "McMaster University & UC San Diego", date: "07 Aug 2020", year: 2020 },
  { id: "c3", title: "Write Professional Emails in English", category: "Coursera", institution: "Georgia Institute of Technology", date: "22 Jul 2020", year: 2020 },
  { id: "c4", title: "Cyber Threats and Attack Vectors", category: "Coursera", institution: "University of Colorado System", date: "24 Jul 2020", year: 2020 },
  { id: "c5", title: "Positive Psychology", category: "Coursera", institution: "University of North Carolina at Chapel Hill", date: "24 Jul 2020", year: 2020 },
  { id: "c6", title: "COVID-19 Contact Tracing", category: "Coursera", institution: "Johns Hopkins University", date: "25 Jul 2020", year: 2020 },
  { id: "c7", title: "COVID-19: What You Need to Know (CME Eligible)", category: "Coursera", institution: "Osmosis", date: "29 Jul 2020", year: 2020 },
  { id: "c8", title: "Introduction to Cybersecurity Tools & Cyber Attacks", category: "Coursera", institution: "IBM", date: "30 Jul 2020", year: 2020 },
  { id: "c9", title: "Positive Psychiatry and Mental Health", category: "Coursera", institution: "University of Sydney", date: "30 Jul 2020", year: 2020 },
  { id: "c10", title: "Introduction to Philosophy", category: "Coursera", institution: "University of Edinburgh", date: "01 Aug 2020", year: 2020 },
  { id: "c11", title: "Philosophy, Science and Religion (Online)", category: "Coursera", institution: "University of Edinburgh", date: "01 Aug 2020", year: 2020 },
  { id: "c12", title: "Engineering Project Management: Initiating and Planning", category: "Coursera", institution: "Rice University", date: "05 Aug 2020", year: 2020 },
  { id: "c13", title: "A Life of Happiness and Fulfillment", category: "Coursera", institution: "Indian School of Business", date: "11 Aug 2020", year: 2020 },
  { id: "c14", title: "The Science of Well-Being", category: "Coursera", institution: "Yale University", date: "13 Aug 2020", year: 2020 },
  { id: "c15", title: "Project Management: The Basics for Success", category: "Coursera", institution: "UC Irvine", date: "15 Aug 2020", year: 2020 },

  // STTP
  { id: "s1", title: "Information Technology Orientation for Engineering Teachers", category: "STTP", institution: "D. J. Sanghvi College of Engineering, Mumbai", date: "2–13 Jun 2005", year: 2005 },
  { id: "s2", title: "Industry Applications of CAD/CAM & Faculty Awareness Camp on Entrepreneurship", category: "STTP", institution: "Priyadarshini College of Engineering, Nagpur", date: "30 Jun – 8 Jul 2008", year: 2008 },
  { id: "s3", title: "Manufacturing in 21st Century", category: "STTP", institution: "VNIT, Nagpur", date: "24–30 Aug", year: 2009 },
  { id: "s4", title: "Learn to Design Your Own Solar Home System", category: "STTP", institution: "Energy Swaraj Foundation / NITTR Kolkata", date: "14 Aug 2020", year: 2020 },
  { id: "s5", title: "Role of Smart Technology in Maritime Industries", category: "STTP", institution: "AMET Deemed to be University", date: "14–19 Dec 2020", year: 2020 },

  // FDP
  { id: "f1", title: "Use of ICT & Outcome Based Education", category: "FDP", institution: "JSPM's Rajarshi Shahu College of Engineering, Pune", date: "13–22 Nov 2017", year: 2017 },
  { id: "f2", title: "International FDP — Scilab (Spoken Tutorial IITB)", category: "FDP", institution: "Sinhagad School of Engineering", date: "23–28 Apr 2020", year: 2020 },
  { id: "f3", title: "Problem Based Learning", category: "FDP", institution: "JSPM's Rajarshi Shahu College of Engineering, Pune", date: "01–05 Jun 2020", year: 2020 },
  { id: "f4", title: "Futuristic Technologies in Mechanical Industries", category: "FDP", institution: "DYPIEMR, Akurdi, Pune", date: "05–09 Jun 2020", year: 2020 },
  { id: "f5", title: "Research Opportunities in Advanced Manufacturing Processes", category: "FDP", institution: "Bharati Vidyapeeth (Deemed), College of Engineering, Pune", date: "22–28 Jun 2020", year: 2020 },
  { id: "f6", title: "Research Technique and Sustainable Development in Mechanical Engineering", category: "FDP", institution: "St. John College of Engineering and Management, Palghar", date: "12–17 Jul 2020", year: 2020 },
  { id: "f7", title: "RUSA Organized FDP", category: "FDP", institution: "JSPM's RSCE, Pune", date: "27 Jul – 01 Aug 2020", year: 2020 },
  { id: "f8", title: "HVAC & R", category: "FDP", institution: "Vidhyavardhaka College of Engineering, Mysuru", date: "03–07 Aug 2020", year: 2020 },
  { id: "f9", title: "Mechanical and Manufacturing Engineering", category: "ATAL FDP", institution: "Vishwakarma Institute of Information Technology, Pune", date: "21–25 Dec 2020", year: 2020 },
  { id: "f10", title: "Secure and Intelligent IoT System Design", category: "ATAL FDP", institution: "College of Engineering, Kallooppara", date: "14–18 Sep 2020", year: 2020 },

  // Workshop
  { id: "w1", title: "Mission 10X: High Impact Teaching Skills", category: "Workshop", institution: "Wipro-India at YCCE, Nagpur", date: "15–19 Jun 2009", year: 2009 },
  { id: "w2", title: "Improving Teaching Competencies", category: "Workshop", institution: "LTJSS, Priyadarshini College of Engineering, Nagpur", date: "4–12 Jun 2010", year: 2010 },
  { id: "w3", title: "Quest 4 Best", category: "Workshop", institution: "Priyadarshini College of Engineering, Nagpur", date: "6–8 Sep 2012", year: 2012 },
  { id: "w4", title: "LaTeX", category: "Workshop", institution: "TGPCE & T, Nagpur", date: "20 Oct 2012", year: 2012 },
  { id: "w5", title: "ISTE Workshop on Aakash Tab for Education", category: "Workshop", institution: "IIT Bombay at PCE, Nagpur", date: "10–11 Nov 2012", year: 2012 },
  { id: "w6", title: "Two Day Workshop on Advanced I.C. Engine", category: "Workshop", institution: "IIT Delhi at PCE, Nagpur", date: "6–7 Sep 2013", year: 2013 },

  // Online
  { id: "o1", title: "ICT Mode STTP — Measurement and Control of Industrial Automation", category: "Online", institution: "NITTR Kolkata", date: "27 Apr – 01 May 2020", year: 2020 },
  { id: "o2", title: "MHRD's Innovation Cell — Innovation, Entrepreneurship, IPR and Startups", category: "Online", institution: "MHRD Innovation Cell", date: "04–22 May 2020", year: 2020 },
  { id: "o3", title: "NAAC Awareness Programme for Faculty", category: "Online", institution: "Marathwada Mitra Mandal Institute of Technology (MMIT), Pune", date: "08–14 May 2020", year: 2020 },
  { id: "o4", title: "Outcome Based Education: A Step Towards Excellence", category: "Online", institution: "Government College of Engineering, Karad (AICTE Margdarshan)", date: "11–15 May 2020", year: 2020 },
  { id: "o5", title: "Emerging Trends in Industry 4.0 (International)", category: "Online", institution: "JSPM's RSCE, Pune (ACM Sponsored)", date: "18–29 May 2020", year: 2020 },
  { id: "o6", title: "Advanced Trends in Engineering", category: "Online", institution: "Nagpur Institute of Technology & Institution of Engineers (India)", date: "19–23 May 2020", year: 2020 },
  { id: "o7", title: "Intellectual Property Rights — Patent Application and Filings", category: "Online", institution: "Sinhgad Institute of Technology / MHRD IIC", date: "25–30 Jun 2020", year: 2020 },
];
