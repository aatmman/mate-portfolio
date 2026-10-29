'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Copy, Check, ExternalLink, Database } from '@/components/ui/Icons';

interface MediaAsset {
  name: string;
  path: string;
  type: string;
  size: string;
  description: string;
}

const assets: MediaAsset[] = [
  {
    name: 'Dr. Dnyaneshwar M. Mate — Official Portrait',
    path: '/assets/images/dr-mate.png',
    type: 'PNG Image',
    size: '183 KB',
    description: 'High-resolution official faculty portrait displayed across Hero and portfolio headers',
  },
  {
    name: 'Dr. Mate — Alternative Faculty Photo',
    path: '/mate_sir.png',
    type: 'PNG Image',
    size: '1.2 MB',
    description: 'Original high-resolution academic portrait asset',
  },
  {
    name: 'Curriculum Vitae (Reference Document)',
    path: '/mate_sir_resume.md',
    type: 'Markdown / Document',
    size: '15 Pages Equivalent',
    description: 'Comprehensive academic CV with credentials, awards, patents, and complete bibliography',
  },
];

export default function MediaLibraryPage() {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2500);
  };

  return (
    <div className="admin-content-page">
      <div className="page-header">
        <div>
          <h1>Media &amp; Document Assets</h1>
          <p>Inspect and reference images, documents, and academic media</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {assets.map((asset, i) => (
          <div key={i} style={{ background: 'var(--warm-white)', borderRadius: 12, border: '1px solid rgba(96,121,132,0.15)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: 180, background: 'var(--blueprint)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {asset.path.endsWith('.png') ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image src={asset.path} alt={asset.name} fill unoptimized style={{ objectFit: 'contain' }} />
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--steel)' }}>
                  <Database className="w-12 h-12" style={{ margin: '0 auto 0.5rem', color: 'var(--terracotta)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>PDF DOCUMENT</span>
                </div>
              )}
            </div>
            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.1rem', color: 'var(--graphite)', marginBottom: '0.35rem' }}>
                  {asset.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--steel)', marginBottom: '0.75rem' }}>
                  {asset.type} · {asset.size}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--graphite)', lineHeight: 1.4, marginBottom: '1rem' }}>
                  {asset.description}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => handleCopy(asset.path)} style={{ flex: 1 }}>
                  {copiedPath === asset.path ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedPath === asset.path ? 'Copied URL!' : 'Copy Relative URL'}
                </button>
                <a href={asset.path} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
