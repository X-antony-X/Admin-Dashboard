import { supabase } from "../createClient"

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}
