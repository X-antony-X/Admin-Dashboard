// import { supabase } from '../createClient.jsx';

// export async function deleteMember( id ) {
//     const { data , error } = await supabase.from("members").delete().eq("id", id)

//     if (error) throw new Error(error.message)

//     return data
// }

import { supabase } from "../createClient.jsx";

export async function deleteMember(id) {
  // 1️⃣ جلب بيانات العضو
  const { data: member, error: fetchError } = await supabase
    .from("members")
    .select("avatar")
    .eq("id", id)
    .single();

  if (fetchError) throw new Error("Fetch Error: " + fetchError.message);

  // 2️⃣ التعامل مع الـ avatar كمصفوفة (Array)
  // بما أن النوع text[]، فإن member.avatar سيكون Array
  if (member.avatar && member.avatar.length > 0) {
    const fullUrl = member.avatar[0]; // نأخذ أول عنصر في المصفوفة
    
    // استخراج اسم الملف فقط من الرابط
    const fileName = fullUrl.split('/').pop();
    
    // المسار داخل الـ storage
    const filePath = `avatars/${fileName}`;

    const { error: storageError } = await supabase
      .storage
      .from("images")
      .remove([filePath]);

    if (storageError) console.error("Storage Delete Warning:", storageError.message);
  }

  // 3️⃣ حذف الصف من الجدول
  const { error: deleteError } = await supabase
    .from("members")
    .delete()
    .eq("id", id);

  if (deleteError) throw new Error("Delete Row Error: " + deleteError.message);

  return true;
}

// export async function deleteMember(id) {

  // 1️⃣ هات بيانات العضو الأول
//   const { data: member, error: fetchError } = await supabase
//     .from("members")
//     .select("image_url")
//     .eq("id", id)
//     .single();

//   if (fetchError) throw new Error(fetchError.message);

//   // 2️⃣ امسح الصورة من storage لو موجودة
//   if (member.avatar) {
//     const { error: storageError } = await supabase
//       .storage
//       .from("images") // اسم الـ bucket
//       .remove([member.avatar]);

//     if (storageError) throw new Error(storageError.message);
//   }

//   // 3️⃣ امسح الصف من الجدول
//   const { error: deleteError } = await supabase
//     .from("members")
//     .delete()
//     .eq("id", id);

//   if (deleteError) throw new Error(deleteError.message);

//   return true;
// }
