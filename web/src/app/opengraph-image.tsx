import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';
export const alt = 'Ansvisor — Open-source Answer Engine Optimization platform';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadLogoDataUrl() {
  // logo_dark.svg has white glyphs — visible on the dark gradient backdrop.
  const filePath = path.join(process.cwd(), 'public', 'logo_dark.svg');
  const buffer = await readFile(filePath);
  return `data:image/svg+xml;base64,${buffer.toString('base64')}`;
}

export default async function OpengraphImage() {
  const logoSrc = await loadLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'radial-gradient(ellipse at top right, #312e81 0%, #1e1b4b 35%, #0b0a2b 70%, #050516 100%)',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Soft glow accent */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -160,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, rgba(139, 92, 246, 0) 70%)',
            display: 'flex',
          }}
        />

        {/* Top: brand mark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt=""
            width={96}
            height={96}
            style={{ width: 96, height: 96 }}
          />
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              display: 'flex',
            }}
          >
            Ansvisor
          </div>
        </div>

        {/* Bottom: tagline + meta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: '-0.035em',
              maxWidth: 980,
              display: 'flex',
            }}
          >
            Track how AI search engines mention your brand.
          </div>
          <div
            style={{
              fontSize: 30,
              color: 'rgba(255, 255, 255, 0.72)',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <span style={{ display: 'flex' }}>ChatGPT</span>
            <span style={{ display: 'flex', opacity: 0.5 }}>·</span>
            <span style={{ display: 'flex' }}>Gemini</span>
            <span style={{ display: 'flex', opacity: 0.5 }}>·</span>
            <span style={{ display: 'flex' }}>Perplexity</span>
            <span style={{ display: 'flex', opacity: 0.5 }}>·</span>
            <span style={{ display: 'flex' }}>Claude</span>
            <span style={{ display: 'flex', opacity: 0.5 }}>·</span>
            <span style={{ display: 'flex' }}>Copilot</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
