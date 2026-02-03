import { supabase } from "../createClient.jsx"

export async function uploadAvatar(file) {
  const fileExt = file.name.split(".").pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `avatars/${fileName}`

  const { error } = await supabase
    .storage
    .from("images")
    .upload(filePath, file)

  if (error) throw error

  const { data } = supabase
    .storage
    .from("images")
    .getPublicUrl(filePath)

  return data.publicUrl
}
