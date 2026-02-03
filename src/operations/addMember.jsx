import {supabase} from '../createClient.jsx';
import { uploadAvatar } from './uploadAvatar.jsx';

export async function addMember({ name , age , avatar }) {
  const avatarPath = await uploadAvatar(avatar);

const { data, error } = await supabase
  .from('members')
  .insert([
    { 
      name: name, 
      age: Number(age),
      avatar: [avatarPath] 
    }
  ]);
    if (error) throw new Error(error.message)
      
    return data;
}

// export async function addMember(memberData) {
//   const imageUrl = await uploadAvatar(memberData.avatar);

//   const response = await supabase
//     .from("members")
//     .insert([
//       {
//         name: String(memberData.name),
//         age: parseInt(memberData.age),
//         avatar: [String(imageUrl)]
//       },
//     ])
//     .select();

//   console.log("Full Response from Supabase:", response); // اطبع الاستجابة كاملة هنا

//   if (response.error) {
//     throw response.error;
//   }

//   return response.data;
// }
// import { supabase } from "../createClient.jsx";
// import { uploadAvatar } from "./uploadAvatar.jsx";

// export async function addMember(memberData) {
//   // 1. رفع الصورة والحصول على الرابط
//   const imageUrl = await uploadAvatar(memberData.avatar);

//   // 2. إضافة البيانات للجدول
//   const { data, error } = await supabase
//     .from("members")
//     .insert([
//       {
//         name: memberData.name,
//         age: memberData.age, // سيكون رقماً الآن
//         avatar: imageUrl    // رابط الصورة النصي
//       },
//     ])
//     .select();

//   if (error) throw error;
//   return data;
// }