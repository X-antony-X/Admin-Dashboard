import { supabase } from "../createClient.jsx"

export async function getMembers() {
    const { data, error } = await supabase.from("members").select("*")

    if (error) throw new Error(error.message)

    return data
}