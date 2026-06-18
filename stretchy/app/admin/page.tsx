import { AppMenuButton } from '@/components/app/AppMenuButton';
import { AdminContent } from './AdminContent';

export default function AdminPage() {
  return <AdminContent appMenuButton={<AppMenuButton />} />;
}
