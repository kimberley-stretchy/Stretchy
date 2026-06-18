import { AppMenuButton } from '@/components/app/AppMenuButton';
import { EditSessionForm } from './EditSessionForm';

export default function EditSessionPage() {
  return <EditSessionForm appMenuButton={<AppMenuButton />} />;
}
