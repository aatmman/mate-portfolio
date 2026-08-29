'use client';

import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

const svgProps = (props: IconProps) => ({
  ...props,
  width: props.size ?? 24,
  height: props.size ?? 24,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
});

export function LayoutDashboard(props: IconProps) {
  return <svg {...svgProps(props)}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
}

export function GraduationCap(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.92 3.24a1 1 0 0 0-1.823.02L2.58 10.92a1 1 0 0 0 0 1.832l8.5 5.93a1 1 0 0 0 1.823-.02l8.5-5.93z" /><path d="M22 10.92v-2.24" /><path d="M2 10.92v-2.24" /><path d="M12 3.24V20" /><path d="M6.5 15.5a2 2 0 1 1 0 4H19a2 2 0 0 1 0-4h-12.5z" /></svg>;
}

export function Briefcase(props: IconProps) {
  return <svg {...svgProps(props)}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
}

export function FlaskConical(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M10 2v7.31" /><path d="M14 2v7.31" /><path d="M10 9.31a6 6 0 0 0 4 0" /><path d="M14 9.31a6 6 0 0 1-4 0" /><path d="M4 20v-9.31a6 6 0 0 1 4-6.31" /><path d="M20 20v-9.31a6 6 0 0 0-4-6.31" /></svg>;
}

export function BookOpen(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
}

export function Award(props: IconProps) {
  return <svg {...svgProps(props)}><circle cx="12" cy="8" r="7" /><path d="M9 21l6-6 6 6" /></svg>;
}

export function Users(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}

export function Settings(props: IconProps) {
  return <svg {...svgProps(props)}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
}

export function FileText(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M14 2v6h6" /><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16" /><path d="M16 13a2 2 0 0 0 0-4h-2a2 2 0 0 0 0 4h2" /></svg>;
}

export function PenTool(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 3.5L12 18l5-5z" /></svg>;
}

export function TrendingUp(props: IconProps) {
  return <svg {...svgProps(props)}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
}

export function Download(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>;
}

export function Upload(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>;
}

export function Plus(props: IconProps) {
  return <svg {...svgProps(props)}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
}

export function Search(props: IconProps) {
  return <svg {...svgProps(props)}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
}

export function Filter(props: IconProps) {
  return <svg {...svgProps(props)}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>;
}

export function ChevronDown(props: IconProps) {
  return <svg {...svgProps(props)}><polyline points="6 9 12 15 18 9" /></svg>;
}

export function ChevronUp(props: IconProps) {
  return <svg {...svgProps(props)}><polyline points="18 15 12 9 6 15" /></svg>;
}

export function ChevronRight(props: IconProps) {
  return <svg {...svgProps(props)}><polyline points="9 18 15 12 9 6" /></svg>;
}

export function Eye(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>;
}

export function EyeOff(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>;
}

export function MoreVertical(props: IconProps) {
  return <svg {...svgProps(props)}><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>;
}

export function X(props: IconProps) {
  return <svg {...svgProps(props)}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
}

export function Check(props: IconProps) {
  return <svg {...svgProps(props)}><polyline points="20 6 9 17 4 12" /></svg>;
}

export function Trash2(props: IconProps) {
  return <svg {...svgProps(props)}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>;
}

export function Edit(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
}

export function ArrowUpDown(props: IconProps) {
  return <svg {...svgProps(props)}><path d="m21 16-4 4-4-4" /><path d="M17 20V4" /><path d="m3 8 4-4 4 4" /><path d="M7 4v16" /></svg>;
}

export function Save(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M15.2 3a6 6 0 0 0-1.1-.1l-2.9-.4a6 6 0 0 1-7.9 7.9l-1.4 3a6 6 0 0 0 1.1 3.9l.6 3a6 6 0 0 1 7.9-7.9l3-1.5a6 6 0 0 0 .4-1.1z" /><path d="M14.5 16.5 19 21" /></svg>;
}

export function Copy(props: IconProps) {
  return <svg {...svgProps(props)}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>;
}

export function LogOut(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>;
}

export function Shield(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
}

export function Key(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M15.5 7.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" /><path d="M12 15v7" /><path d="M9 18h6" /></svg>;
}

export function Bell(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
}

export function Moon(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>;
}

export function Sun(props: IconProps) {
  return <svg {...svgProps(props)}><circle cx="12" cy="12" r="4" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>;
}

export function HelpCircle(props: IconProps) {
  return <svg {...svgProps(props)}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
}

export function UserCog(props: IconProps) {
  return <svg {...svgProps(props)}><circle cx="12" cy="5" r="3" /><path d="M14 19a6 6 0 0 1-12 0" /><circle cx="18" cy="15" r="3" /><path d="m22 12-2.5 1.5L17 13l-1.5 1.5L13 14l-2 2 4 3 2.5-1.5" /></svg>;
}

export function Loader2(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>;
}

export function AlertCircle(props: IconProps) {
  return <svg {...svgProps(props)}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>;
}

export function Database(props: IconProps) {
  return <svg {...svgProps(props)}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>;
}

export function Clock(props: IconProps) {
  return <svg {...svgProps(props)}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
}

export function CheckCircle(props: IconProps) {
  return <svg {...svgProps(props)}><circle cx="12" cy="12" r="10" /><polyline points="16 8 12 12 8 16" /></svg>;
}

export function AlertTriangle(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L21.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
}

export function BarChart3(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>;
}

export function Menu(props: IconProps) {
  return <svg {...svgProps(props)}><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
}

export function User(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
}

export function FileTextIcon(props: IconProps) {
  return <svg {...svgProps(props)}><path d="M14 2v6h6" /><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16" /><path d="M16 13a2 2 0 0 0 0-4h-2a2 2 0 0 0 0 4h2" /></svg>;
}