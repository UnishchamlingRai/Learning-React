import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://sjfrrvwmnwlogoxbuvue.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqZnJydndtbndsb2dveGJ1dnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxMTE2NjgsImV4cCI6MjAyMTY4NzY2OH0.vV8xDG-Q_dZJljdQfFEoDsdPekF2unOSGVJXgOsf0rk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
