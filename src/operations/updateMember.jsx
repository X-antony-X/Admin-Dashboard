// import { supabase } from "../createClient.jsx"
// import { uploadAvatar } from "./uploadAvatar.jsx"

// export async function updateMember({id , name , age , oldFile , file}) {
//     let avatar = oldFile

//     if (file) {
//         avatar = await uploadAvatar(file)
//     }

//     const { data , error } = await supabase.from("members").update({name , age , avatar}).eq("id",id)

//     if (error) throw new Error(error.message)

//     return data
// }

import { supabase } from "../createClient.jsx"
import { uploadAvatar } from "./uploadAvatar.jsx"

export async function updateMember({ id, name, age, oldFile, file }) {
    let finalAvatar = oldFile; // القيمة القديمة (المصفوفة الحالية)

    // 1. لو المستخدم اختار صورة جديدة
    if (file) {
        const newUrl = await uploadAvatar(file);
        // بنحط الرابط الجديد جوه مصفوفة لأن نوع العمود text[]
        finalAvatar = [newUrl]; 
    }

    // 2. تحديث البيانات في الجدول
    // ملاحظة: غيرنا اسم الحقل لـ avatar عشان يطابق الجدول عندك
    const { data, error } = await supabase
        .from("members")
        .update({ 
            name: name, 
            age: age, 
            avatar: finalAvatar // لازم الاسم يكون avatar
        })
        .eq("id", id)
        .select(); // إضافة select عشان يرجعلك البيانات اللي اتعدلت

    if (error) {
        console.error("Update Error:", error.message);
        throw new Error(error.message);
    }

    return data;
}