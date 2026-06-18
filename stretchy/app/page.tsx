import { redirect } from 'next/navigation';
import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
import { PricingMechanic } from '@/components/landing/PricingMechanic';
import { PricingCalculator } from '@/app/PricingCalculator';
import { ForMovers } from '@/components/landing/ForMovers';
import { ForHosts } from '@/components/landing/ForHosts';
import { Story } from '@/components/landing/Story';
import { Waitlist } from '@/components/landing/Waitlist';
import { Footer } from '@/components/landing/Footer';

interface Props {
  searchParams: Promise<{ code?: string; token_hash?: string; type?: string }>;
}

export default async function LandingPage({ searchParams }: Props) {
  const params = await searchParams;
  if (params.code) redirect(`/auth/callback?code=${params.code}`);
  if (params.token_hash && params.type) redirect(`/auth/callback?token_hash=${params.token_hash}&type=${params.type}`);
  return (
    <div style={{ background: '#F5EDE3' }}>
      <Nav />
      <Hero />
      <section style={{ background: '#F5EDE3', padding: '80px 0 64px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase' as const,
                color: '#7A8330',
              }}
            >
              The pricing mechanic
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 48px)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              textAlign: 'center',
              margin: '0 auto 16px',
              maxWidth: 700,
              color: '#1A1A1A',
            }}
          >
            The more who join, the better value exchange for all.
          </h2>
          <p
            style={{
              textAlign: 'center',
              maxWidth: 560,
              margin: '0 auto 40px',
              fontSize: 16,
              lineHeight: 1.6,
              color: 'rgba(26,26,26,0.6)',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
            }}
          >
            The host sets their revenue target. Add the flat Stretchy fee of NZD $20 + GST. Split it across everyone who holds a spot.
          </p>
          <PricingCalculator />
        </div>
      </section>
      <PricingMechanic />
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <ForMovers />
      </div>
      <ForHosts />
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <Story />
      </div>
      <Waitlist />
      <Footer />
    </div>
  );
}
