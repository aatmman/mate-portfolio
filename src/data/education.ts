export interface Degree {
  id: string;
  degree: string;
  field: string;
  institution: string;
  university: string;
  year: string;
  percentage?: string;
  division?: string;
  thesis?: string;
  advisor?: string;
  notificationNo?: string;
  highlight?: boolean;
}

export const education: Degree[] = [
  {
    id: "phd",
    degree: "Doctor of Philosophy (Ph.D.)",
    field: "Mechanical Engineering",
    institution: "Priyadarshini College of Engineering, Nagpur",
    university: "Rashtrasant Tukdoji Maharaj Nagpur University (R.T.M.N.U.), Nagpur",
    year: "March 2015",
    thesis:
      "Experimental Investigation of Parametric Effects on the Surface Roughness of an Aluminum Alloy Produced by Burnished Spherical Surface Tool",
    advisor: "Dr. G. K. Awari, Head Govt. Poly. Nagpur, Ex-Principal TGPCOE, Nagpur",
    notificationNo: "RTMNU/Ph.D.(Cell)/2/220  Dated 7/4/2015",
    highlight: true,
  },
  {
    id: "mba",
    degree: "Master of Business Administration (MBA)",
    field: "Human Resource",
    institution: "Dharmpeth College, Nagpur",
    university: "Y.C.M.O. Nashik (M.S.)",
    year: "Summer 2010",
    percentage: "59.68",
    division: "Second Class",
    advisor: "Dr. Nitin Vighne Lakshya, Ex. Prof. YCCE Nagpur",
  },
  {
    id: "me",
    degree: "Master of Engineering (M.E.)",
    field: "Mechanical Engineering",
    institution: "Samrat Ashok Technological Institute, Vidisha (M.P.)",
    university: "Rajiv Gandhi Technological University, Bhopal (M.P.)",
    year: "Summer 2001",
    percentage: "72.50",
    division: "First Class",
    thesis:
      "Analysis and Applications of Material Requirement Planning in Small and Large Scale Industries in Industrial area of Bhopal",
    advisor: "Dr. K. C. Jain, Rtd. Head & Prof., Samrat Ashok Technological Institute, Vidisha",
  },
  {
    id: "be",
    degree: "Bachelor in Production Engineering (B.E.)",
    field: "Production Engineering",
    institution: "College of Engineering & Technology, Akola (M.S.)",
    university: "Amravati University (S.G.B.), Amravati",
    year: "Summer 1997",
    percentage: "66.65",
    division: "First Class",
  },
  {
    id: "hssc",
    degree: "H.S.S.C.",
    field: "General Science",
    institution: "RLT Science College, Akola (M.S.)",
    university: "Maharashtra State Board, Amravati",
    year: "March 1993",
    percentage: "56.76",
    division: "Second Class",
  },
  {
    id: "ssc",
    degree: "S.S.C.",
    field: "Science & Maths, Marathi, Sanskrit, Social Science",
    institution: "Swawalambi Vidyalaya, Akola (M.S.)",
    university: "Maharashtra State Board, Nagpur",
    year: "March 1991",
    percentage: "71.14",
    division: "First Class",
  },
];
