import { createClient } from '@supabase/supabase-js'

// Lê as variáveis definidas no .env.local
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Verifica se o .env.local está configurado corretamente
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    '❌ Variáveis de ambiente do Supabase não encontradas.\n' +
    'Verifique se o arquivo .env.local contém:\n' +
    'VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY'
  )
}

// Cria o cliente Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
