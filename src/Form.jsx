import { useState , useRef , useEffect } from "react";
import { useMutation } from "@tanstack/react-query"
import { addMember } from "./operations/addMember.jsx"
import { useQueryClient } from "@tanstack/react-query";
import { updateMember } from "./operations/updateMember.jsx";

function Form({ edit , setEdit }) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({ name: "", age: "", avatar: null });

  const fileRef = useRef(null)

  useEffect(() => {
    if (edit) {
      setFormData({
        name: edit.name,
        age: edit.age,
        avatar: null
      })
    }
  }, [edit]);

  const addMutation = useMutation({
    mutationFn: addMember,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["members"] });
        setFormData({ name: "", age: "", avatar: null });
        if (fileRef.current) {
          fileRef.current.value = "";
        }
    }
  })

  const updateMutation = useMutation({
    mutationFn: updateMember,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["members"]})
      setEdit(null)
      setFormData({ name: "", age: "", avatar: null });
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    if (edit) {
      updateMutation.mutate({
        id: edit.id,
        name: formData.name,
        age: formData.age,
        oldFile: edit.avatar, 
        file: formData.avatar, 
      });
      
    } else {
      addMutation.mutate(formData);
    }
  }

  return (
    <div className="form-wrapper">
      <form className="custom-form" onSubmit={handleSubmit}>
        <h2 className="form-title">إضافة بيانات جديدة</h2>
        
        <div className="input-group">
          <label>الاسم بالكامل</label>
          <input 
            type="text" 
            name="name" 
            placeholder="أدخل الاسم..."
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}  
          />
        </div>

        <div className="input-group">
          <label>العمر</label>
          <input 
            type="number" 
            name="age" 
            placeholder="أدخل العمر..." 
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})} 
          />
        </div>

        <div className="input-group">
          <label>صورة</label>
          <div className="file-upload">
            <input 
              type="file" 
              name="image"
              id="file-input" 
              accept="image/*"
              ref={fileRef}
              onChange={(e) => setFormData({...formData,avatar:e.target.files[0]})}
            />
            <label htmlFor="file-input" className="file-label">
              {formData.avatar ? "✅ تم اختيار صورة" : "📁 اختر صورة"}
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={addMutation.isPending || updateMutation.isPending}>{edit ? "تعديل البيانات" : "حفظ البيانات"}</button>
        { edit && (
          <button type="button" className="submit-btn"
          onClick={
            () =>  {
              setEdit(null)
              setFormData({ name: "", age: "", avatar: null })
            }
          }>إلغاء</button>
        )

        }
      </form>
    </div>
  );
}

export default Form;