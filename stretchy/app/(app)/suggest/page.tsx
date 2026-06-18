import { AppMenuButton } from '@/components/app/AppMenuButton';
import { SuggestForm } from './SuggestForm';

export default function SuggestPage() {
  return <SuggestForm appMenuButton={<AppMenuButton />} />;
}
