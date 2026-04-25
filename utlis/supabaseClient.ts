import {createClient} from '@supabase/supabase-js';
import {SUPABASE_URL,SUPABASE_ANON_KEY} from "@env";

if(!SUPABASE_URL||!SUPABASE_ANON_KEY){
    throw new Error('supabase url or anon key is missing');
}

export const supabase=createClient(SUPABASE_URL,SUPABASE_ANON_KEY);