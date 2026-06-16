import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
import { PricingMechanic } from '@/components/landing/PricingMechanic';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { ForMovers } from '@/components/landing/ForMovers';
import { ForHosts } from '@/components/landing/ForHosts';
import { Story } from '@/components/landing/Story';
import { Waitlist } from '@/components/landing/Waitlist';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div style={{ background: '#F5EDE3' }}>
      <Nav />
      <Hero />
      <PricingMechanic />
      <HowItWorks />
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
