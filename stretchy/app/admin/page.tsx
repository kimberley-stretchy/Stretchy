import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { ApproveButton } from './ApproveButton';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase());

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  if (!ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? '')) {
    return (
      <div style={{ padding: 48, fontFamily: "'Space Grotesk', sans-serif", color: '#1A1A1A' }}>
        <h1>Access denied.</h1>
      </div>
    );
  }

  const { data: applications } = await supabase
    .from('host_applications')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: hosts } = await supabase.from('hosts').select('auth_user_id');
  const approvedUserIds = new Set((hosts ?? []).map((h) => h.auth_user_id));

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#A535C7', marginBottom: 8 }}>
          ADMIN
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 32, letterSpacing: '-0.025em', margin: '0 0 32px', color: '#1A1A1A' }}>
          Host applications
        </h1>

        {!applications?.length ? (
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#666' }}>No applications yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {applications.map((app) => {
              const isApproved = approvedUserIds.has(app.user_id);
              return (
                <div
                  key={app.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 20,
                    padding: 20,
                    border: `1.5px solid ${isApproved ? '#7A8330' : 'rgba(26,26,26,0.08)'}`,
                    borderLeft: isApproved ? '4px solid #7A8330' : undefined,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: '#1A1A1A', marginBottom: 4 }}>
                        {app.full_name}
                      </div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888', letterSpacing: '0.06em', marginBottom: 8 }}>
                        {app.email} · {app.specialty ?? 'no specialty'} · {new Date(app.created_at).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      {app.bio && (
                        <p style={{ margin: '0 0 8px', fontSize: 14, color: '#555', lineHeight: 1.5 }}>{app.bio}</p>
                      )}
                      {app.instagram && (
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#A535C7', letterSpacing: '0.06em' }}>
                          @{app.instagram}
                        </div>
                      )}
                    </div>
                    <div style={{ flexShrink: 0 }}>
                      {isApproved ? (
                        <div style={{ background: '#7A8330', color: '#F5EDE3', borderRadius: 9999, padding: '8px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>
                          ✓ APPROVED
                        </div>
                      ) : (
                        <ApproveButton applicationId={app.id} userId={app.user_id} name={app.full_name} specialty={app.specialty} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
