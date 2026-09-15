import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vpfyfoosdlghdsunkjcy.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_x4aC-rISkgU0QnPcfd6MVg_uetjFSM8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);