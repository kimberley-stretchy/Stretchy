export type MovementType = 'yoga' | 'pilates' | 'breath' | 'sound' | 'flow' | 'run' | 'hiit';

export type SessionState = 'open' | 'filling' | 'almostFull' | 'confirmed' | 'cancelled';

export interface Session {
  id: string;
  name: string;
  type: MovementType;
  host_id: string;
  host_name: string;
  neighbourhood: string;
  venue: string;
  address: string;
  access_notes?: string;
  starts_at: string;
  duration_minutes: number;
  host_target: number;
  min_spots: number;
  max_capacity: number;
  social_stretch_venue?: string;
  state: SessionState;
  held_count: number;
  confirmed_count: number;
  current_price: number;
  start_price: number;
  floor_price: number;
}

export interface Hold {
  id: string;
  session_id: string;
  user_id: string;
  status: 'holding' | 'confirmed' | 'cancelled' | 'charged';
  price_at_charge?: number;
  stripe_payment_intent_id?: string;
  created_at: string;
}

export interface Host {
  id: string;
  user_id: string;
  display_name: string;
  neighbourhoods: string[];
  movement_types: MovementType[];
  bio?: string;
  credentials?: string[];
  instagram?: string;
  vetted_at?: string;
  vetting_expires_at?: string;
  rating?: number;
  sessions_hosted: number;
}

export interface Profile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  neighbourhoods: string[];
  movement_types: MovementType[];
  notification_push: boolean;
  notification_sms: boolean;
  notification_email: boolean;
  stripe_customer_id?: string;
  is_host: boolean;
  sessions_attended: number;
}
