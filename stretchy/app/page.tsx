import { redirect } from 'next/navigation';
import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
import { PricingMechanic } from '@/components/landing/PricingMechanic';
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
