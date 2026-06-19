import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { AppMenuButton } from '@/components/app/AppMenuButton';
import { AdminContent } from './AdminContent';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const adminEmails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!adminEmails.includes(user.email?.toLowerCase() ?? '')) {
    return (
      <div style={{
        minHeight: '100dvh', background: '#1A1A1A', color: '#F5EDE3',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Space Grotesk', system-ui, sans-serif", padding: 32, textAlign: 'center',
      }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: '#FF6B35', marginBottom: 16 }}>
          NOT AUTHORIZED
        </div>
        <h1 style={{ fontWeight: 700, fontSize: 40, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
          Stretchy HQ
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(245,237,227,0.6)', maxWidth: 320, lineHeight: 1.5, margin: '0 0 32px' }}>
          This area is restricted to Stretchy administrators.<br />
          Logged in as: {user.email}
        </p>
        <a href="/home" style={{
          background: '#F5EDE3', color: '#1A1A1A', borderRadius: 9999,
          padding: '16px 32px', textDecoration: 'none',
          fontWeight: 700, fontSize: 15,
        }}>← Back to home</a>
      </div>
    );
  }

  return <AdminContent appMenuButton={<AppMenuButton />} isAdmin={true} />;
}
