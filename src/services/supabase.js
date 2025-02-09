import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sfbrbwpfxwkrahpkmzsq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmYnJid3BmeHdrcmFocGttenNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyOTcyMTAsImV4cCI6MjA1Mzg3MzIxMH0.BguGdmO4mYs4Es-0eGqacSkRCAYxzo1cF_WpKYdlHVI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
